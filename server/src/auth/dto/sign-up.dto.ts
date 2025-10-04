import { IsString, MinLength } from 'class-validator';

export class SignUpDto {
	@IsString()
	@MinLength(2, {
		message: 'Имя пользователя должно быть не менее 2 символов',
	})
	username: string;

	@IsString()
	@MinLength(8, {
		message: 'Пароль должен быть не менее 8 символов',
	})
	password: string;
}
