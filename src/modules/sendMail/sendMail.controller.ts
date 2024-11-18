import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SendMailService } from './sendMail.service';
import { SendMailDto } from './sendMail.contract';

@Controller('sendMail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Post()
  async sendMail(
    @Body() sendMailDto: SendMailDto,
  ): Promise<{ message: string }> {
    try {
      const result = await this.sendMailService.sendMail(sendMailDto);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
