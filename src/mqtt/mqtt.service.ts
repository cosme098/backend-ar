import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MqttService, Payload, Subscribe } from 'nest-mqtt';
@Injectable()
export class MqttServices implements OnModuleInit {

    private payload: any;

    constructor(@Inject(MqttService) private readonly mqttService: MqttService,) { }
    onModuleInit() {
    }

    async publishInTopic(topic: string, message: object) {
        await this.mqttService.publish(topic, message);
    }
}
