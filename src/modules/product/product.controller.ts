import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Header,
  HttpCode,
  Redirect,
  Req,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { Request, Response } from 'express';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/view/hello')
  viewHello (@Query('name') name: string, @Res() res: Response) {
    res.render('index.html',{
      title: "Template Engine",
      name: name
    })
  }

  @Get('/set-cookie')
  setCookies(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response
      .status(200)
      .send(
        "Cookie suscessfully set! Check your browser's cookie storage to see the result.",
      );
  }

  @Get('/get-cookie')
  getCookies(@Req() req: Request): string {
    return req.cookies['name'];
  }

  @Get('/hello')
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    return `Hello ${firstName} ${lastName}! Welcome to NestJS!`;
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'This is a sample response from the ProductController',
      message: 'This is a sample message',
      status: 'success',
    };
  }

  @Get('redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/product/sample-response',
      statusCode: 301,
    };
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    return `Product with id ${id}`;
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
