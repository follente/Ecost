/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class UserService {

  constructor(
    @InjectModel( User.name )
    private userModel: Model<User>,
  ){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    try {
      const { password, ...userData} = createUserDto;
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      await newUser.save();
      const { password:_, ...user} = newUser.toJSON();
      return user;
      
    } catch (error) {
      if(error.code === 11000){
        if(Object.keys(error.keyPattern)[0] === 'userName'){
          throw new BadRequestException(`${createUserDto.userName} already exists!`)
        }
        else{
          throw new BadRequestException(`${createUserDto.email} already exists!`)
        }
      }
      throw new InternalServerErrorException('Something terrible happen!!!')
    }
  }

  async register(registerUserDto: RegisterUserDto):Promise<LoginResponse>{
    
    const user = await this.create( registerUserDto );
    return {
      user: user,
    }
    
  }

  async login(loginDto: LoginDto):Promise<LoginResponse>{
    
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    
    if(!user){
      throw new UnauthorizedException('Not valid credentials - email');
    }

    if( !bcryptjs.compareSync( password, user.password )) {
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const { password:_, ...rest } = user.toJSON();

    return {
      user: rest,
    }
  }

  findAll():Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string):Promise<User> {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<User>{
        // Verificar si la contraseña ha sido proporcionada
        if (updateUserDto.password) {
          // Hashear la nueva contraseña
          updateUserDto.password = bcryptjs.hashSync(updateUserDto.password, 10);
        }
    
        // Filtra los campos que están definidos en updateAuthDto
        const updatedFields = Object.keys(updateUserDto).reduce((acc, key) => {
          if (updateUserDto[key] !== undefined) {
            acc[key] = updateUserDto[key];
          }
          return acc;
        }, {});
    
        // Realiza la actualización con los campos filtrados
        const updatedUser = await this.userModel.findByIdAndUpdate(
          id,
          { $set: updatedFields }, // Solo actualiza los campos proporcionados
          { new: true, runValidators: true } // new: devuelve el documento actualizado, runValidators: aplica validaciones
        );
    
        // Verifica si el usuario fue encontrado y actualizado
        if (!updatedUser) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
    
        const { password:_, ...rest } = updatedUser.toJSON();
    
        return rest;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
