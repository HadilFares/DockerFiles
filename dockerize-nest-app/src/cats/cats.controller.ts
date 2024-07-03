// src/cats/cats.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { Cat } from './cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('cats')
export class CatsController {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  @Post()
  async create(@Body() createCatDto: any) {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
