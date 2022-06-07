import { MqttServices } from './mqtt/mqtt.service';
import { RoutinesModule } from './routines/routines.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcModule } from './ac/ac.module';
import { connect } from 'mqtt';
import { AppService } from './app.service';
import { RoutinesService } from './routines/routines.service';
import { AcService } from './ac/ac.service';
import { MqttModule } from 'nest-mqtt';
@Module({
  imports: [
    MqttModule.forRootAsync({
      useFactory: () => ({
        port: 1883,
        host: 'broker.emqx.io',
        clientId: 'nestjs-mqtt-client',
        keepalive: 300,
        reconnectPeriod: 1000,
      }),
    }),
    RoutinesModule,
    UserModule,
    AcModule,
    MongooseModule.forRoot(''),
  ],
  controllers: [],
  providers: [
    MqttServices,
    AppService,
  ],
})
export class AppModule { }
