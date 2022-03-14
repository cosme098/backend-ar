import { AcController } from './ac.controller';
import { AcService } from './ac.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcSchema } from './ac.model';
import { MqttServices } from 'src/mqtt/mqtt.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Ac', schema: AcSchema },
        ])
    ],
    controllers: [
        AcController,],
    providers: [
        AcService,
        MqttServices
    ],
    exports: [AcService],
})
export class AcModule { }
