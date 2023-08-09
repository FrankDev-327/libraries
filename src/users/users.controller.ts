import { UsersService } from './users.service';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ReponseUserDto } from './dto/response-user.dto';
import { ReponseUserListDto } from './dto/response-user-list.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private userSerive : UsersService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiOkResponse({ type: ReponseUserDto })
    async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
        return await this.userSerive.createUser(dto);
    }

    @Get("/:id")
    @ApiOperation({ summary: 'Get info about user by id' })
    @ApiOkResponse({ type: ReponseUserDto })
    async getUserInfo(@Param('id') id: string): Promise<UserEntity> {
        return await this.userSerive.getUserInfo(id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({ type: [ReponseUserListDto] })
    async getUserList(): Promise<UserEntity[]> {
        return await this.userSerive.getUserList();
    }
}
