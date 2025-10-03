import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest();
		const token = req.headers['authorization'];

		if (!token) throw new UnauthorizedException('Невалидный токен');

		try {
			const user = await this.userService.getOneByToken(token);
			if (!user)
				throw new UnauthorizedException('Пользователь не найден');

			req.user = user;

			return true;
		} catch {
			throw new UnauthorizedException('Произошла неизвестная ошибка');
		}
	}
}
