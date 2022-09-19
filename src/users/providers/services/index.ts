import { CreateUserService } from './create-user.service';
import { FindUserByEmailOrNameService } from './find-user-by-email-or-name.service';
import { FindUserByEmailService } from './find-user-by-email.service';
import { FindUserByIdService } from './find-user-by-id.service';
import { FindUserByNameService } from './find-user-by-name.service';

export default [
  CreateUserService,
  FindUserByIdService,
  FindUserByEmailOrNameService,
  FindUserByEmailService,
  FindUserByNameService,
];
