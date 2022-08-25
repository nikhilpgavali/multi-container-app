import { Student } from './student.entity';

describe('Entity', () => {
  describe('Student', () => {
    it('should populate the partial data of student entity', () => {
      const studentEntity = new Student({
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

    it('should be undefined when there is no data', () => {
      const studentEntity = new Student();
      expect(studentEntity).toBeDefined();
      expect(studentEntity.first_name).not.toBeDefined();
      expect(studentEntity.last_name).not.toBeDefined();
      expect(studentEntity.age).not.toBeDefined();
      expect(studentEntity.roll_number).not.toBeDefined();
      expect(studentEntity.email).not.toBeDefined();
    });
  });
});
