import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getOne(@Param('id') id): object {
    return this.appService.getOne(id);
  }

  @Post()
  create(@Body() newDevice): void {
    return this.appService.newDevice(newDevice);
  }
  @Delete(':id')
  delete(@Param('id') id): void {
    return this.appService.delete(id);
  }
}
