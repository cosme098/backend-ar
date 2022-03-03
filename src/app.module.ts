import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb+srv://cosme:8XyfAzeZF0oUGvWj@cluster0.n66yy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
