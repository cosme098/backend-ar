import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcModule } from './ac/ac.module';
@Module({
  imports: [
    UserModule,
    AcModule,
    MongooseModule.forRoot('mongodb+srv://cosme:xaruto123456@cluster0.n66yy.mongodb.net/ARCONDICIONADO'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
