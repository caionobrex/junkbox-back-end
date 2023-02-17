import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserService } from '../providers/services/validate-user.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUser: ValidateUserService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.validateUser.execute(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
