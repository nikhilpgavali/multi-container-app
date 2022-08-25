import { ValidationArguments } from 'class-validator';
import { StudentRepository } from '../../repositories/repository/student.repository';
import { mock } from '../../tests/mock';
import { EmailExists } from './email-exists-validation.service';

describe('EmailExists', () => {
  let studentRepositoryMock;
  const emailId = 'abc@xyz.com';
  const studentDetailsMock = {
    first_name: 'abc',
    last_name: 'pqr',
    age: 25,
    roll_number: 25,
    email: 'abc@xyz.com',
  };
  const invalidaEmail = 'ab.com';
  const validateOptionsMock: ValidationArguments = {
    value: invalidaEmail,
    targetName: '',
    constraints: [],
    object: {},
    property: '',
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

      const service = new EmailExists(studentRepositoryMock);
      const result = await service.validate(emailId);
      expect(result).toBeFalsy();
    });

    it('should return true if the email id does not exists', async () => {
      studentRepositoryMock.findByEmail = jest.fn().mockResolvedValue({});

      const service = new EmailExists(studentRepositoryMock);
      const result = await service.validate(emailId);
      expect(result).toBeTruthy();
    });
  });

  describe('default', () => {
    it('should return default message when email id exists', () => {
      studentRepositoryMock.findByEmail = jest
        .fn()
        .mockResolvedValue(studentDetailsMock);

      const service = new EmailExists(studentRepositoryMock);
      const result = service.defaultMessage(validateOptionsMock);
      expect(result).toEqual('ab.com email already exists!');
    });
  });
});
