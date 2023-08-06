import { IsNumber, Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  bookId: number;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsNumber()
  quantity: number;

  @Column()
  @IsNumber()
  totalPrice: number;

  @Column()
  @IsNumber()
  @Min(1)
  @Max(99)
  discount_rate: number;
}
