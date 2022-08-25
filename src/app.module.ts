import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Student } from './repositories/entity';
import { StudentRepository } from './repositories/repository/student.repository';
import { EmailExists } from './validators/services/email-exists-validation.service';
import { EmailValidation } from './validators/services/email-validation.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres_password',
      database: 'schooldb',
      entities: [Student],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, StudentRepository, EmailValidation, EmailExists],
})
export class AppModule {}
