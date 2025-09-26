import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createProductDto: CreateProductDto) {
    return 'this action adds a new product';
  }

  async findAll() {
    return 'this action returns all products';
  }

  async findOne(id: number) {
    return `this action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `this action updates a #${id} product`;
  }

  async remove(id: number) {
    return `this action removes a #${id} product`;
  }
}
