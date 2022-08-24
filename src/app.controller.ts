import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { StudentDto } from './validators/student-payload.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/student.create')
  async create(@Body() studentPayload: StudentDto) {
    return await this.appService.create(studentPayload);
  }
}
