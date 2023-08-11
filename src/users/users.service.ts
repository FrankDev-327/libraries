import { Repository } from 'typeorm';
import { Roles } from '../enum/role.enum';
import { hashing } from '../utils/helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateStatusUserDto } from './dto/update-status.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const userCreated = this.userRepository.create(dto);
    userCreated.password = await hashing(userCreated.password);
    const userSaved = await this.userRepository.save(userCreated);
    return await this.getUserInfo(userSaved.id);
  }

  async getUserInfo(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      select: ['id', 'role', 'name', 'email', 'active', 'created', 'updated'],
      where: { id: id },
      relations: ['book'],
    });
    return user;
  }

  async getUserList(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: ['id', 'role', 'name', 'email', 'active', 'created', 'updated'],
      relations: ['book'],
    });
  }

  async updateInfo(
    dto: UserEntity | UpdateUserDto,
    id: string = '',
  ): Promise<UserEntity> {
    let data;
    dto.password = await hashing(dto.password);
    if (dto instanceof UserEntity) {
      await this.userRepository.update(dto.id, { ...dto });
      data = await this.getUserInfo(id);
    } else {
      const user = await this.getUserInfo(id);
      const saved = this.userRepository.create({
        ...user,
        ...dto,
      });
      await this.userRepository.save(saved);
      data = await this.getUserInfo(user.id);
    }

    return data;
  }

  async updateStatus(
    dto: UpdateStatusUserDto,
    id: string,
  ): Promise<UserEntity> {
    await this.userRepository.update(id, { active: dto.active });
    return await this.getUserInfo(id);
  }

  async deleteAdmin(dto: UserEntity): Promise<UserEntity> {
    return await this.userRepository.remove(dto);
  }

  async deleteAllAuthors(id: string): Promise<UserEntity[]> {
    const allUsers = await this.getUserList();
    const userFilterIds = allUsers.filter(
      (item) => item.id !== id && item.role === Roles.AUTHOR,
    );
    return await this.userRepository.remove(userFilterIds);
  }
}
