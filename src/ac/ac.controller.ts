import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AcService } from './ac.service';
import { Ac } from './ac.model';

@Controller()
export class UserController {
    constructor(private readonly service: AcService) { }

    @UseGuards(JwtAuthGuard)
    @Get('AcGetAll')
    findAll(@Param() params) {
        return this.service.findAll(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('Ac/new')
    newAr(@Body() Ac: Ac) {
        return this.service.create(Ac);
    }

    @UseGuards(JwtAuthGuard)
    @Put('Ac/edit/:id')
    updateAr(@Param() params, @Body() Ac: Ac) {
        return this.service.update(params.id, Ac);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('Ac/delete/:id')
    deleteAr(@Param() params) {
        return this.service.delete(params.id);
    }
}
