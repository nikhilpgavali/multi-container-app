import { mock } from '../../tests/mock';
import { EntityManager } from 'typeorm';
import { StudentRepository } from './student.repository';

describe('Student Repository', () => {
  let readEntityManager;
  let writeEntityManager;
  const email = 'abc@gmail.com';
  beforeEach(() => {
    readEntityManager = mock<EntityManager>({});
    writeEntityManager = mock<EntityManager>({});
  });
  describe('findByEmail', () => {
    it('should call repository method correctly', async () => {
      const studentDetailsMock = {
        first_name: 'abc',
        last_name: 'pqr',
        age: 25,
        roll_number: 25,
        email: 'abc@xyz.com',
      };
      const queryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(studentDetailsMock),
      };
      readEntityManager = mock<EntityManager>({
        createQueryBuilder: jest
          .fn()
          .mockImplementation(() => queryBuilderMock),
      });
      const studentRepository = new StudentRepository(readEntityManager);
      const result = await studentRepository.findByEmail(email);
      expect(result).toEqual(studentDetailsMock);
      expect(queryBuilderMock.select).toHaveBeenCalledWith('student');
      expect(queryBuilderMock.select).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.where).toHaveBeenCalledWith('email = :email', {
        email: email,
      });
      expect(queryBuilderMock.where).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.getOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should call the repository method correctly', async () => {
      const studentDetailsMock = {
        first_name: 'abc',
        last_name: 'pqr',
        age: 25,
        roll_number: 25,
        email: 'abc@xyz.com',
      };

      const expectedData = {
        id: '1',
        first_name: 'abc',
        last_name: 'pqr',
        age: 25,
        roll_number: 25,
        email: 'abc@xyz.com',
      };

      writeEntityManager = mock<EntityManager>({
        save: jest.fn().mockResolvedValue(expectedData),
      });
      const studentRepository = new StudentRepository(writeEntityManager);
      const result = await studentRepository.create(studentDetailsMock);
      expect(result).toEqual(expectedData);
      expect(writeEntityManager.save).toHaveBeenCalledTimes(1);
      expect(writeEntityManager.save).toHaveBeenCalledWith(studentDetailsMock);
    });
  });
});
