import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getOne(id: string): object {
    return {};
  }
  newDevice(newDevice): void {
    console.log(newDevice);
  }
  delete(id: string): void {
    console.log(id);
  }
}
