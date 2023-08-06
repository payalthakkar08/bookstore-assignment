import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksDto } from './dto/get-books.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(query: GetBooksDto) {
    try {
      const { page, limit } = query;
      const skip = (page - 1) * limit;

      const result = await this.bookRepository.findAndCount({
        skip,
        take: limit,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createBook(bookDto: CreateBookDto): Promise<Book> {
    try {
      const result = this.bookRepository.create(bookDto);
      return this.bookRepository.save(result);
    } catch (error) {
      throw error;
    }
  }

  async findOneBook(id: number): Promise<Book | undefined> {
    try {
      const result = await this.bookRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
