import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class UserController {
    constructor(private readonly service: UserService) {}

  //   @UseGuards(JwtAuthGuard)
  //   @Get('findByEmail/:email')
  //   get(@Param() params) {
  //   return this.service.findByEmail(params.email);
  // }

    @Post('login')
    login(@Body() user: User) {
         return this.service.login(user);
    }

//   @Post('create')
//   create(@Body() user: User) {
//     return this.service.create(user);
//   }

//   @Put('update')
//   update(@Body() user: User) {
//     return this.service.update(user);
//   }

//   @Delete('delete/:id')
//   remove(@Param() params) {
//     return this.service.remove(params.id);
//   }
 }
