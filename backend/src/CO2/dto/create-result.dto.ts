/* eslint-disable prettier/prettier */
import { IsArray, IsDate, IsNumber } from "class-validator";

export class CreateResultDto {

    @IsArray()
    entryValues: number[] 

    @IsNumber()
    result: number 

    @IsNumber()
    conversionPrice: number 

    @IsArray()
    conversionFactors: string[] 

    @IsArray()
    user: string[] 

    @IsDate()
    date: Date 
}
