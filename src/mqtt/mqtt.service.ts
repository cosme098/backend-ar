import { Inject, Injectable } from '@nestjs/common';
import { MqttService } from 'nest-mqtt';

@Injectable()
export class MqttServices {
    constructor(@Inject(MqttService) private readonly mqttService: MqttService,) { }

    async publishInTopic(topic: string, message: object) {
        await this.mqttService.publish(topic, message);
    }
}
