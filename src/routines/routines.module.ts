import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { routineSchema } from './routines.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Routines', schema: routineSchema },
        ]),
    ],
    controllers: [
        RoutinesController,],
    providers: [
        RoutinesService,],
})
export class RoutinesModule { }
