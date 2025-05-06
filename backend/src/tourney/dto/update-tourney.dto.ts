/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTourneyDto } from './create-tourney.dto';
import { Optional } from '@nestjs/common';
import { IsArray } from 'class-validator';

export class UpdateTourneyDto extends PartialType(CreateTourneyDto) {
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
