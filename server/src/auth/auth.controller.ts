import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { type Response, type Request } from 'express';
import lodash from 'lodash';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-up')
	async signUp(
		@Body() body: SignUpDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<Omit<UserEntity, 'password' | 'token'>> {
		const user = await this.authService.signUp(body);

		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax' as const,
			maxAge: 15 * 24 * 60 * 60 * 1000,
		};

		res.cookie('token', user.token, cookieOptions);

		return lodash.omit(user, ['password', 'token']);
	}

	@Post('sign-in')
	async signIn(
		@Body() body: SignInDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<Omit<UserEntity, 'password' | 'token'>> {
		const user = await this.authService.signIn(body);

		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax' as const,
			maxAge: 15 * 24 * 60 * 60 * 1000,
		};

		res.cookie('token', user.token, cookieOptions);

		return lodash.omit(user, ['password', 'token']);
	}

	@Get('sign-out')
	async signOut(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<void> {
		const token = req.cookies.token as string | undefined;

		if (token) {
			await this.authService.signOut(token);

			const cookieOptions = {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax' as const,
			};

			res.clearCookie('token', cookieOptions);
		}
	}
}
