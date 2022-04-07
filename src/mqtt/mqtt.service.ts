import { Inject, Injectable } from '@nestjs/common';
import { MqttService, Payload, Subscribe } from 'nest-mqtt';
import { MqttClient } from 'mqtt';
@Injectable()
export class MqttServices {
    constructor(@Inject(MqttService) private readonly mqttService: MqttService,) { }

    async publishInTopic(topic: string, message: object) {
        await this.mqttService.publish(topic, message);
    }
    async subscribeToTopic(topic: string) {
        await this.mqttService.subscribe(topic);
    }
}
