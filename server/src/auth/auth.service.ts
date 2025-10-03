import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async signUp(body: SignUpDto): Promise<UserEntity> {
		const exist = await this.userService.getOneByUsername(body.username);
		if (exist)
			throw new UnauthorizedException('Такой пользователь существует');

		const password = await bcrypt.hash(body.password, 10);
		const token = randomUUID();

		const user = await this.userService.create({
			...body,
			password,
			token,
		});
		if (!user)
			throw new UnauthorizedException('Ошибка при создании пользователя');

		return user;
	}

	async signIn(body: SignUpDto): Promise<UserEntity> {
		const user = await this.userService.getOneByUsername(body.username);
		if (!user)
			throw new UnauthorizedException(
				'Неверное имя пользователя или пароль',
			);

		const matched = await bcrypt.compare(body.password, user.password);
		if (!matched)
			throw new UnauthorizedException(
				'Неверное имя пользователя или пароль',
			);

		const token = randomUUID();
		user.token = token;
		await this.userService.setTokenById(token, user.id);

		return user;
	}

	async signOut(token: string): Promise<void> {
		await this.userService.removeTokenByToken(token);
	}
}
