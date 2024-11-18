import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './sendMail.contract';

@Injectable()
export class SendMailService {
  constructor() {}

  async sendMail(sendMailDto: SendMailDto): Promise<string> {
    const { fullName, subject, email, phoneNumber, message } = sendMailDto;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ramustudio2510@gmail.com',
      subject: `Contact Form Submission: ${subject}`,
      text: `You have received a new message from your contact form:\n\n
      Name: ${fullName}\n
      Email: ${email}\n
      Phone Number: ${phoneNumber}\n
      Message: ${message}\n`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return `Email sent: ${info.response}`;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
