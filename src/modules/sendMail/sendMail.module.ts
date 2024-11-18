import { Module } from '@nestjs/common';
import { SendMailController } from './sendMail.controller';
import { SendMailService } from './sendMail.service';

@Module({
  controllers: [SendMailController],
  providers: [SendMailService],
})
export class SendMailModule {}
