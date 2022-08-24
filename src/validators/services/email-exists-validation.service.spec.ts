import { StudentRepository } from '../../repositories/repository/student.repository';
import { mock } from '../../tests/mock';
import { EmailExists } from './email-exists-validation.service';

describe('EmailExists', () => {
  let studentRepositoryMock;
  let emailId = 'abc@xyz.com';
  let studentDetailsMock = {
    first_name: 'abc',
    last_name: 'pqr',
    age: 25,
    roll_number: 25,
    email: 'abc@xyz.com',
  };
  beforeEach(() => {
    studentRepositoryMock = mock<StudentRepository>({
      findByEmail: jest.fn(),
    });
  });

  describe('validate', () => {
    it('should return false if the email id exists', async () => {
      studentRepositoryMock.findByEmail = jest
        .fn()
        .mockResolvedValue(studentDetailsMock);

      let service = new EmailExists(studentRepositoryMock);
      let result = await service.validate(emailId);
      expect(result).toBeFalsy();
    });

    it('should return true if the email id does not exists', async () => {
      studentRepositoryMock.findByEmail = jest.fn().mockResolvedValue({});

      let service = new EmailExists(studentRepositoryMock);
      let result = await service.validate(emailId);
      expect(result).toBeTruthy();
    });
  });
});
