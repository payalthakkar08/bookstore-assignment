import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(1)
  @Max(99)
  discount_rate: number;

  @ApiProperty({ required: false })
  cover_image: string;

  @ApiProperty({ required: false })
  @IsNumber()
  price: number;
}
