import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './sendMail.contract';

@Injectable()
export class SendMailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: parseInt(this.configService.get<string>('EMAIL_PORT'), 10) || 587,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendMail(sendMailDto: SendMailDto): Promise<string> {
    const { fullName, subject, email, phoneNumber, message } = sendMailDto;

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: 'daffadwi2003@gmail.com',
      subject: `Contact Form Submission: ${subject}`,
      text: `You have received a new message from your contact form:\n\n
        Name: ${fullName}\n
        Email: ${email}\n
        Phone Number: ${phoneNumber}\n
        Message: ${message}\n`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return `Email sent: ${info.response}`;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
