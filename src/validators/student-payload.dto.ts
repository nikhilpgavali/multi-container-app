import { IsNotEmpty, IsString, IsNumber, Validate } from 'class-validator';
import { EmailExists } from './services/email-exists-validation.service';
import { EmailValidation } from './services/email-validation.service';

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
  @Validate(EmailValidation)
  @Validate(EmailExists)
  email: string;
}
