import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'},
        }),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
        ])
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        JwtStrategy,
    ],
    exports: [UserService],
})
export class UserModule { }
