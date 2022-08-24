import { Student } from './student.entity';

describe('Entity', () => {
  describe('Student', () => {
    it('should populate the partial data of student entity', () => {
      let studentEntity = new Student({
        first_name: 'nikhil',
        last_name: 'gavali',
        age: 18,
        roll_number: 7,
        email: 'nikhil@gmail.com',
      });
      expect(studentEntity.first_name).toBe('nikhil');
      expect(studentEntity.last_name).toBe('gavali');
      expect(studentEntity.age).toBe(18);
      expect(studentEntity.roll_number).toBe(7);
      expect(studentEntity.email).toBe('nikhil@gmail.com');
    });
  });
});
