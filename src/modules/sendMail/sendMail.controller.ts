import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendMailService } from './sendMail.service';
import { SendMailDto } from './sendMail.contract';

@ApiTags('Send Email')
@Controller('send-mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Post()
  @ApiOperation({ summary: 'Send an email using the contact form' })
  @ApiResponse({ status: 200, description: 'Email sent successfully.' })
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
