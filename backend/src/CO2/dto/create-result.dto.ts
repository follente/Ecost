/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsString } from "class-validator";

export class CreateResultDto {

    @IsArray()
    entryValues: number[] 

    @IsNumber()
    result: number 

    @IsNumber()
    conversionPrice: number 

    @IsArray()
    conversionFactors: string[] 

    @IsString()
    user: string 

    @Type(() => Date)
    @IsDate()
    date: Date 
}
