import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { routineSchema } from './routines.model';
import { MqttServices } from 'src/mqtt/mqtt.service';
import { AcModule } from 'src/ac/ac.module';

@Module({
    imports: [
        AcModule,
        MongooseModule.forFeature([
            { name: 'Routines', schema: routineSchema },
        ]),
    ],
    controllers: [
        RoutinesController,],
    providers: [
        RoutinesService,
        MqttServices,
    ],
    exports: [
        RoutinesService,
    ],
})
export class RoutinesModule { }
