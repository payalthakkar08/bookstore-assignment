import { BadRequestException, Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksDto } from './dto/get-books.dto';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks(
    @Query(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    query: GetBooksDto,
  ) {
    try {
      query.page = query.page || 1;
      query.limit = query.limit || 10;
      return this.bookService.getAllBooks(query);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    try {
      return this.bookService.createBook(createBookDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
