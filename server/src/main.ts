import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	app.enableCors({
		origin: `${process.env.BASE_CLIENT_URL ?? 'http://localhost:3000'}`,
		methods: 'GET, POST, PUT, PATCH, DELETE',
		allowedHeaders: 'Content-Type',
		credentials: true,
	});

	app.useGlobalPipes(
		new ValidationPipe({ transform: true, whitelist: true }),
	);

	await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
