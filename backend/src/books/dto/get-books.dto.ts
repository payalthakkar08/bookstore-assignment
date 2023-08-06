import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetBooksDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit: number;
}
