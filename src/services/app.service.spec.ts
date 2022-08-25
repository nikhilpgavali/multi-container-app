import { AppService } from './app.service';
import { StudentRepository } from '../repositories/repository';
import { mock } from '../tests/mock';

describe('Student Service', () => {
  let studentRepositoryMock;
  beforeEach(() => {
    studentRepositoryMock = mock<StudentRepository>({
      create: jest.fn(),
    });
  });
  describe('create', () => {
    it('should call service method correctly', async () => {
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

      studentRepositoryMock.create = jest.fn().mockResolvedValue(expectedData);
      const service = new AppService(studentRepositoryMock);
      const result = await service.create(studentDetailsMock);
      expect(result).toEqual(expectedData);
      expect(studentRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(studentRepositoryMock.create).toHaveBeenCalledWith(
        studentDetailsMock,
      );
    });
  });
});
