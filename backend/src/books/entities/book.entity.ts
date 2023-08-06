import { IsNumber, Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  cover_image: string;

  @Column()
  @IsNumber()
  @Min(1)
  @Max(99)
  discount_rate: number;

  @Column()
  @IsNumber()
  price: number;
}
