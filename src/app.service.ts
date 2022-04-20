import { Injectable } from '@nestjs/common';
import { AcService } from './ac/ac.service';
import { MqttServices } from './mqtt/mqtt.service';
import { RoutinesService } from './routines/routines.service';
import { scheduleJob, cancelJob, rescheduleJob } from 'node-schedule';
import { Payload, Subscribe } from 'nest-mqtt';
@Injectable()
export class AppService {

	constructor(private readonly Ac: AcService,
		private readonly mqtt: MqttServices,
		private readonly routines: RoutinesService) {

		this.startSchedules();
	}

	//for get data from mqtt
	@Subscribe("mqtt/status/ac/#")
	onMessage(@Payload() payload) {
		this.Ac.findByMac("5002914f9902").then(async (findAc: any) => {
			console.log(findAc);
			// findAc.status = payload.status;
			// console.log("id do ar", findAc._id);
			// await this.Ac.update(findAc._id, findAc)
		}).catch(err => {
			console.log("erro", err);
		})
	}
	//start schedules
	async startSchedules() {
		const schedules: Array<any> = [];
		const ars: Array<any> = [];
		let currentArs: any;
		const arsAll: Array<any> = await this.Ac.findAll();
		await this.routines.getRoutines().then((routines: any) => {
			schedules.push(...routines);
		})

		// synchronization last routines on
		scheduleJob('*/29 * * * *', (values) => {
			console.log("Rotina de sinchronization da temperatura");
			arsAll.forEach(async ac => {
				ac.power = true;
				ac.updateAt = new Date();
				await this.Ac.onlyUpdate(ac._id, ac);
				await this.mqtt.publishInTopic('mqtt/brisanet/synchronized/' + ac.mac, ac);
			});
		});

		// synchronization last routines off
		scheduleJob('*/31 * * * *', (_values) => {
			schedules.forEach(async (element: any) => {
				this.routines.findRoutine(element._id).then((routine: any) => {
					if (_values.getHours() >= routine?.timer[0]?.hour && _values.getMinutes() >= routine?.timer[0]?.minute && _values.getHours() < 23) {
						routine.ars.forEach(async (element: any) => {
							currentArs = arsAll.find(x => x._id.toString() == element.toString())
							if (currentArs.status == false) {
								currentArs.degress = routine.action;
								currentArs.power = false;
								currentArs.updateAt = new Date();
								await this.Ac.update(currentArs._id, currentArs);
							}
						})
					}
				})
			})
		});

		// for start all routines 
		schedules.forEach(data => {
			scheduleJob(data.name, { hour: data.timer[0].hour, minute: data.timer[0].minute, dayOfWeek: data.days }, (timeSchedule) => {
				data.ars.forEach((element: any) => {
					ars.push(arsAll.find(x => x._id.toString() == element.toString()));
				})

				ars.forEach(async ac => {
					ac.degress = data.action;
					ac.power = data.state;
					ac.updateAt = new Date();
					console.log("rotina correndo normal", "mqtt/brisanet/" + ac.mac);
					await this.Ac.onlyUpdate(ac._id, ac);
					await this.mqtt.publishInTopic('mqtt/brisanet/' + ac.mac, ac);
				})

				scheduleJob('*/30 * * * *', (values) => {
					if (timeSchedule.getTime() > data.timer[0].hour && timeSchedule.getTime() < 23) {
						ars.forEach(async (element: any) => {
							currentArs = arsAll.find(x => x._id.toString() == element.toString())
							if (currentArs.state == true) {
								currentArs.degress = data.action;
								currentArs.power = false;
								currentArs.updateAt = new Date();
								await this.Ac.update(currentArs._id, currentArs);
							}
						})
					}
				});
				ars.splice(0, ars.length);
			})
		})
	}
}