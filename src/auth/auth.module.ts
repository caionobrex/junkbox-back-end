import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginService } from './providers/services/login.service';
import { RegisterService } from './providers/services/register.service';
import { ValidateUserService } from './providers/services/validate-user.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'testing',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ValidateUserService,
    LoginService,
    RegisterService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
