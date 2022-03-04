import { UserController } from './ac.controller';
import { AcService } from './ac.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcSchema } from './ac.model';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Ac', schema: AcSchema },
        ])
    ],
    controllers: [
        UserController,],
    providers: [
        AcService,
    ],
    exports: [AcService],
})
export class AcModule { }
