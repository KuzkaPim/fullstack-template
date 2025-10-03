import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
	) {}

	create(userData: Omit<UserEntity, 'id'>): Promise<UserEntity> {
		const user = this.userRepo.create({
			username: userData.username,
			password: userData.password,
			token: userData.token,
		});

		return this.userRepo.save(user);
	}

	async setTokenById(token: string, id: number): Promise<void> {
		await this.userRepo.update({ id }, { token });
	}

	getOneByUsername(username: string): Promise<UserEntity | null> {
		return this.userRepo.findOneBy({ username });
	}

	async removeTokenByToken(token: string): Promise<void> {
		await this.userRepo.update({ token }, { token: null });
	}
}
