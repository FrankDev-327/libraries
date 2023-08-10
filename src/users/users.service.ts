import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateStatusUserDto } from './dto/update-status.dto';

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
        delete user?.password;
        return user;
    }

    async getUserList(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            select:[
                'id',
                'name',
                'email',
                'active',
                'created',
                'updated'
            ],
            relations:['book']
        });
    }

    async updateInfo(dto: UserEntity): Promise<UserEntity> {
        const saved = this.userRepository.create(dto);
        return await this.userRepository.save(saved);
    }

    async updateStatus(dto: UpdateStatusUserDto, id: string): Promise<UserEntity>{
        await this.userRepository.update(id, { active:dto.active});
        return await this.getUserInfo(id);
    }

    async deleteInfo(dto: UserEntity): Promise<UserEntity> {
        return await this.userRepository.remove(dto);
    }
}
