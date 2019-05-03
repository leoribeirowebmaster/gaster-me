import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info && info.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Expired token');
    }
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
