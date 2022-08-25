import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class StudentDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  roll_number: number;

  @IsNotEmpty()
  // @Validate(EmailValidation)
  // @Validate(EmailExists)
  email: string;
}
