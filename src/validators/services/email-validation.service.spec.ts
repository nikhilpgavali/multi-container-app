import { ValidationArguments } from 'class-validator';
import { EmailValidation } from './email-validation.service';

describe('EmailValidation', () => {
  const validEmail = 'abc@xyx.com';
  const invalidaEmail = 'ab.com';
  const validateOptionsMock: ValidationArguments = {
    value: invalidaEmail,
    targetName: '',
    constraints: [],
    object: {},
    property: '',
  };

  describe('validate', () => {
    it('should return true when the email id is valid', () => {
      const service = new EmailValidation();
      const result = service.validate(validEmail);
      expect(result).toBeTruthy();
    });

    it('should retun false when the email id is not valid', () => {
      const service = new EmailValidation();
      const result = service.validate(invalidaEmail);
      expect(result).toBeFalsy();
    });
  });

  describe('default', () => {
    it('should return default message when email id is invalid', () => {
      const service = new EmailValidation();
      const result = service.defaultMessage(validateOptionsMock);
      expect(result).toEqual('ab.com invalid email id');
    });
  });
});
