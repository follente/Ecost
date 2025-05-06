/* eslint-disable prettier/prettier */
import { Optional } from "@nestjs/common";
import { IsArray, IsString } from "class-validator";

export class CreateTourneyDto {

    @IsString()
    name: string;

    @IsString()
    inscriptionDeadline: string;
   
    @IsString()
    year: string;

    @IsString()
    picture: string;
    
    @IsArray()
    @Optional()
    enrolledPlayers: string[];

    @IsArray()
    @Optional()
    selectedPlayers: string[];

    @IsArray()
    @Optional()
    games: string[];

    @IsArray()
    @Optional()
    classification: string[];
}
