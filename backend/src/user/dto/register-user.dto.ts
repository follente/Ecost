import { IsEmail, MinLength, IsString, MaxLength, IsPhoneNumber } from "class-validator";

export class RegisterUserDto {

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
