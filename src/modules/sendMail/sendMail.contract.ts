import { ApiProperty } from '@nestjs/swagger';

export class SendMailDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  message: string;
}
