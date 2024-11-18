import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendMailModule } from './modules/sendMail/sendMail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SendMailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
