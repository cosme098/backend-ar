import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { routines } from './routines.model';
import { RoutinesService } from './routines.service';

@Controller()
export class RoutinesController {

    constructor(private routine: RoutinesService) { }

    @UseGuards(JwtAuthGuard)
    @Get('api/routinesAll')
    findAll() {
        return this.routine.getRoutines();
    }

    @UseGuards(JwtAuthGuard)
    @Post('api/routines/new')
    create(@Body() routineNew: any) {
        return this.routine.createRoutine(routineNew)
    }

    @UseGuards(JwtAuthGuard)
    @Put('api/routines/update')
    update(@Body() routineUpdate: any) {
        return this.routine.updateRoutine(routineUpdate);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('api/routines/delete/:id/:name')
    remove(@Param() params: any) {
        return this.routine.deleteRoutine(params.id, params.name);
    }
}



