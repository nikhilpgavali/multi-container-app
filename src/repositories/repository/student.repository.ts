import { Injectable } from '@nestjs/common';
import { StudentDtoInterface } from '../../dtos';
import { EntityManager } from 'typeorm';
import { Student } from '../entity';

@Injectable()
export class StudentRepository {
  constructor(readonly entityManager: EntityManager) {}
  /**
   * Create student
   * @param {Object<Student>}   student       - Object of student entity
   * @return {Promise<Student>}   - returns created student
   */
  async create(studentDto: StudentDtoInterface): Promise<StudentDtoInterface> {
    const student = new Student({
      first_name: studentDto.first_name,
      last_name: studentDto.last_name,
      age: studentDto.age,
      roll_number: studentDto.roll_number,
      email: studentDto.email,
    });
    return await this.entityManager.save(student);
  }

  /**
   * Find By Email
   * @param  {string}   emailId     - email id of the student
   * @returns {Promise<StudentDtoInterface>}  - returns the student
   */
  async findByEmail(emailId: string): Promise<StudentDtoInterface> {
    return await this.entityManager
      .createQueryBuilder(Student, 'student')
      .select('student')
      .where('email = :email', { email: emailId })
      .getOne();
  }
}
