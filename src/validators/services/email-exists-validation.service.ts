import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { StudentRepository } from '../../repositories/repository/student.repository';
import { isEmpty } from 'lodash';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class EmailExists implements ValidatorConstraintInterface {
  constructor(private readonly studentRepository: StudentRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments | undefined,
  ): Promise<boolean> {
    try {
      let studentEmail = await this.studentRepository.findByEmail(value);
      if (!isEmpty(studentEmail)) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log('Error', e);
    }
  }
  defaultMessage?(
    validationArguments?: ValidationArguments | undefined,
  ): string {
    return `${validationArguments.value} email already exists!`;
  }
}
