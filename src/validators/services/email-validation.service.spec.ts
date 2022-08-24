import { ValidationArguments } from 'class-validator';
import { EmailValidation } from './email-validation.service';

describe('EmailValidation', () => {
  let validEmail = 'abc@xyx.com';
  let invalidaEmail = 'ab.com';
  let validateOptionsMock: ValidationArguments = {
    value: invalidaEmail,
    targetName: '',
    constraints: [],
    object: {},
    property: '',
  };

  describe('validate', () => {
    it('should return true when the email id is valid', () => {
      let service = new EmailValidation();
      let result = service.validate(validEmail);
      expect(result).toBeTruthy();
    });

    it('should retun false when the email id is not valid', () => {
      let service = new EmailValidation();
      let result = service.validate(invalidaEmail);
      expect(result).toBeFalsy();
    });
  });

  describe('default', () => {
    it('should return default message when email id is invalid', () => {
      let service = new EmailValidation();
      let result = service.defaultMessage(validateOptionsMock);
      expect(result).toEqual('ab.com invalid email id');
    });
  });
});
