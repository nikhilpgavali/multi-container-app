import { Injectable } from '@nestjs/common';
import { StudentDtoInterface } from '../dtos';
import { StudentRepository } from '../repositories/repository/student.repository';

@Injectable()
export class AppService {
  constructor(private readonly studentRepository: StudentRepository) {}
  /**
   *
   * @param {StudentDtoInterface} student     - Object of the student DTO
   * @returns {Promise<StudentDtoInterface>}    - returns the student
   */
  async create(student: StudentDtoInterface): Promise<StudentDtoInterface> {
    return await this.studentRepository.create(student);
  }
}
