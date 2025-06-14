/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from '../dto/create-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from '../entities/result.entity';

@Injectable()
export class ResultService {

  constructor(
    @InjectModel( Result.name )
    private resultModel: Model<Result>,
  ){}


  async create(createResultDto: CreateResultDto): Promise<Result> {
    try {
      const newResult = new this.resultModel( createResultDto );
      await newResult.save();
      return newResult.toJSON();
      
    } catch (error) {
      throw new InternalServerErrorException('Something terrible happen!!!', error)
    }
  }

  // findAll() {
  //   return this.tourneyModel.find();
  // }

  // async findOne(id: string) {
  //   return await this.tourneyModel.findById(id);
  // }

  // async update(id: string, updateTourneyDto: UpdateTourneyDto) {
  //   const updatedFields = Object.keys(updateTourneyDto).reduce((acc, key) => {
  //     if (updateTourneyDto[key] !== undefined) {
  //       acc[key] = updateTourneyDto[key];
  //     }
  //     return acc;
  //   }, {});

  //   // Realiza la actualización con los campos filtrados
  //   const updatedTourney = await this.tourneyModel.findByIdAndUpdate(
  //     id,
  //     { $set: updatedFields }, // Solo actualiza los campos proporcionados
  //     { new: true, runValidators: true } // new: devuelve el documento actualizado, runValidators: aplica validaciones
  //   );

  //   // Verifica si el usuario fue encontrado y actualizado
  //   if (!updatedTourney) {
  //     throw new NotFoundException(`Tourney with ID ${id} not found`);
  //   }

  //   return updatedTourney;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} tourney`;
  // }

  // async enroll(id: string, enrollTourneyDto: EnrollTourneyDto){

  //   const tourney = await this.findOne(id);
  //   const updateBody = new UpdateTourneyDto;
  //   if(tourney.enrolledPlayers.includes(enrollTourneyDto.userId)){
  //     return { alreadyEnrolled: true, tourney };
  //   }
  //   tourney.enrolledPlayers.push(enrollTourneyDto.userId);
  //   updateBody.enrolledPlayers = tourney.enrolledPlayers;
  //   this.update(id, updateBody);
  //   return { alreadyEnrolled: false, tourney: tourney}
  // }

  // async unenroll(id: string, enrollTourneyDto: EnrollTourneyDto) {
  //   const tourney = await this.findOne(id);
  
  //   // Si el usuario no está inscrito, no hace nada
  //   if (!tourney.enrolledPlayers.includes(enrollTourneyDto.userId)) {
  //     throw new BadRequestException('El usuario no está inscrito en este torneo.');
  //   }
  
  //   // Eliminar al usuario de la lista de inscritos
  //   tourney.enrolledPlayers = tourney.enrolledPlayers.filter(
  //     (playerId) => playerId !== enrollTourneyDto.userId
  //   );
  
  //   const updateBody = new UpdateTourneyDto();
  //   updateBody.enrolledPlayers = tourney.enrolledPlayers;
  
  //   return this.update(id, updateBody);
  // }
  
}
