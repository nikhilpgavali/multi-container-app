import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'first_name' })
  first_name: string;

  @Column('text', { name: 'last_name' })
  last_name: string;

  @Column('smallint', { name: 'age' })
  age: number;

  @Column('smallint', { name: 'roll_number' })
  roll_number: number;

  @Column('text', { name: 'email' })
  email: string;

  constructor(student: Partial<Student> = {}) {
    Object.assign(this, student);
  }
}
