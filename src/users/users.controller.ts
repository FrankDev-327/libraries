import { UsersService } from './users.service';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ReponseUserDto } from './dto/response-user.dto';
import { UserGuard } from 'src/user-guard/user-guard.guard';
import { ReponseUserListDto } from './dto/response-user-list.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UpdateStatusUserDto } from './dto/update-status.dto';

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
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get info about user by id' })
    @ApiOkResponse({ type: ReponseUserDto })
    async getUserInfo(@Param('id') id: string): Promise<UserEntity> {
        const user = await this.userSerive.getUserInfo(id);        
        if(!user) {
            throw new NotFoundException('User does not exist');
        }

        return user;
    }

    @Get()
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({ type: [ReponseUserListDto] })
    async getUserList(): Promise<UserEntity[]> {
        return await this.userSerive.getUserList();
    }

    @Delete("/:id")
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Delete users' })
    @ApiOkResponse({ type: ReponseUserDto })
    async deleteUserInfo(@Param('id') id: string): Promise<UserEntity> {
        const user = await this.userSerive.getUserInfo(id);
        if(!user) {
            throw new NotFoundException('User does not exist');
        }

        return await this.userSerive.deleteInfo(user);
    }

    @Put("/status/:id")
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Update status user' })
    @ApiOkResponse({ type: ReponseUserDto })
    async updateUserStatus(@Param('id') id: string, @Body() dto: UpdateStatusUserDto): Promise<UserEntity> {
        return await this.userSerive.updateStatus(dto, id);
    }
}
