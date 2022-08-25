import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { mock } from '../tests/mock';
import { AppService } from '../services/app.service';
import { setupApplication } from '../app-util';
import { AppController } from './app.controller';
import { useContainer } from 'class-validator';

describe('ChannelController (Integration)', () => {
  let app: INestApplication;
  const appServiceMock = mock<AppService>({
    create: jest.fn(),
  });

  const studentDetailsMock = {
    first_name: 'abc',
    last_name: 'pqr',
    age: 25,
    roll_number: 25,
    email: 'abc@xyz.com',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
      controllers: [AppController],
    }).compile();
    app = moduleFixture.createNestApplication();
    setupApplication(app);
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app, { fallbackOnErrors: true });
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    appServiceMock.create = jest.fn();
  });

  describe('student.create', () => {
    it('returns 400 when all the fields are missing', () => {
      return request(app.getHttpServer())
        .post(`/student.create`)
        .send({
          first_name: 'Nikhil',
        })
        .expect(400);
    });

    it('returns 200 when student record is created', () => {
      return request(app.getHttpServer())
        .post(`/student.create`)
        .send(studentDetailsMock)
        .expect(201)
        .then(() => {
          expect(appServiceMock.create).toHaveBeenCalledWith(
            studentDetailsMock,
          );
        });
    });
  });
});
