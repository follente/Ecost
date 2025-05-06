import { IsEmail, MinLength, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(20)
    userName: string;

    @MinLength(6)
    password: string;

    @IsString()
    name: string;

}
