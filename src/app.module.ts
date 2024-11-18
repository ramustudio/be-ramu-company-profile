import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendMailModule } from './modules/sendMail/sendMail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SendMailModule,
  ],
})
export class AppModule {}
