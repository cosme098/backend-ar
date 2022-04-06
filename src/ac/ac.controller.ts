import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AcService } from './ac.service';
import { Ac } from './ac.model';

@Controller()
export class AcController {
    constructor(private readonly service: AcService) { }

    @UseGuards(JwtAuthGuard)
    @Get('api/AcGetAll')
    findAll(@Param() params) {
        return this.service.find(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('api/Ac/new')
    newAr(@Body() Ac: Ac) {
        return this.service.create(Ac);
    }

    @UseGuards(JwtAuthGuard)
    @Put('api/Ac/edit/:id')
    updateAr(@Param() params, @Body() Ac: Ac) {
        return this.service.update(params.id, Ac);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('api/Ac/delete/:id')
    deleteAr(@Param() params) {
        return this.service.delete(params.id);
    }
}
