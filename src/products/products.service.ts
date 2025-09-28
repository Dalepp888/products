import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    })
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    const pageTotal = await this.product.count({ where: { available: true } });  
    const lastPage = Math.ceil(pageTotal / (limit || 10));

    return {
      data: await this.product.findMany({
        skip: ((page || 1) - 1) * (limit || 10),
        take: limit || 10,
        where: { available: true }
      }),
      meta: {
        page,
        pageTotal,
        lastPage
      }
    }
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true }
    })

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product; 
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
    await this.findOne(id);

    const { id: _, ...rest } = updateProductDto;

    return this.product.update({
      where: { id },
      data: rest
    })
  }

  async remove(id: number) {
    
    await this.findOne(id);
    
    //return this.product.delete({
    //  where: { id }
    //})

    return this.product.update({
      where: { id },
      data: { available: false }
    });
  }
}
