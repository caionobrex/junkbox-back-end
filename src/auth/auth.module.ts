import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './local.strategy';
import { LoginService } from './providers/services/login.service';
import { ValidateUserService } from './providers/services/validate-user.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'testing',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [ValidateUserService, LoginService, LocalStrategy],
})
export class AuthModule {}
