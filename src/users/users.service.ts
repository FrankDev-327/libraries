import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UsersService extends Repository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner 
        );
    }

    async createUser(dto:CreateUserDto): Promise<UserEntity> {
        const userCreated = this.userRepository.create(dto);
        const userSaved = await this.userRepository.save(userCreated);
        return await this.getUserInfo(userSaved.id);
    }

    async getUserInfo(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({id:id});
        delete user.password;
        return user;
    }

    async getUserList(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            select:[
                'id',
                'name',
                'email',
                'created',
                'updated'
            ],
            relations:['book']
        });
    }
}
