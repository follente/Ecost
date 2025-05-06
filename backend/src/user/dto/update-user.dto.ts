import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { MinLength, IsOptional, IsString, MaxLength, IsPhoneNumber, IsInt } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @MinLength(6)
    @IsOptional()
    password: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    userName: string;
    
    @IsInt()
    @IsOptional()
    puntosTotales: number;
}
