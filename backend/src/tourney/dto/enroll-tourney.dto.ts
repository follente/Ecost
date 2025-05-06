/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class EnrollTourneyDto {
    @IsString()
    userId: string;
}
