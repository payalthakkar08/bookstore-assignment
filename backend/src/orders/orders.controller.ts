import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order | string> {
    try {
      return await this.ordersService.createOrder(createOrderDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
