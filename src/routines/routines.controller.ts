import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoutinesService } from './routines.service';

@Controller()
export class RoutinesController {

    constructor(private routine: RoutinesService) { }

    @UseGuards(JwtAuthGuard)
    @Get('routinesAll')
    findAll() { }

    @UseGuards(JwtAuthGuard)
    @Post('routines/new')
    create() {
        return this.routine.createRoutine()
    }

    @UseGuards(JwtAuthGuard)
    @Put('routines/update/:id')
    update() { }

    @UseGuards(JwtAuthGuard)
    @Delete('routines/delete/:id')
    remove() {
        return this.routine.deleteRoutine()
    }
}
