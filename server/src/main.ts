import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NextFunction, Response, Request } from 'express';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: `${process.env.BASE_CLIENT_URL ?? 'http://localhost:3000'}`,
		methods: 'GET, POST, PUT, PATCH, DELETE',
		allowedHeaders: 'Content-Type',
		credentials: true,
	});

	app.use(cookieParser());

	app.use((req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.token as string | undefined;

		if (token && !req.headers['authorization']) {
			req.headers['authorization'] = token;
		}

		next();
	});

	app.useGlobalPipes(
		new ValidationPipe({ transform: true, whitelist: true }),
	);

	await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
