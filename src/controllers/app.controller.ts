import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { StudentDto } from '../validators/student-payload.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/student.create')
  async create(@Body() studentPayload: StudentDto) {
    console.log('hello world');
    return await this.appService.create(studentPayload);
  }
}
