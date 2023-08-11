import { UsersService } from './users.service';
import { RoleGuard } from 'src/auth/role/role.guard';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ReponseUserDto } from './dto/response-user.dto';
import { UserGuard } from 'src/user-guard/user-guard.guard';
import { ReponseUserListDto } from './dto/response-user-list.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateStatusUserDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { currentUser } from 'src/current-user/current-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userSerive: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ type: ReponseUserDto })
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return await this.userSerive.createUser(dto);
  }

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Get info about user by id' })
  @ApiOkResponse({ type: ReponseUserDto })
  @Get('/:id')
  async getUserInfo(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userSerive.getUserInfo(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [ReponseUserListDto] })
  @Get()
  async getUserList(): Promise<UserEntity[]> {
    return await this.userSerive.getUserList();
  }

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete admin' })
  @ApiOkResponse({ type: ReponseUserDto })
  @Delete('/admin/:id')
  async deleteAdmin(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userSerive.getUserInfo(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (!user.active) {
      throw new NotFoundException('This admin is active');
    }

    return await this.userSerive.deleteAdmin(user);
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Update status user' })
  @ApiOkResponse({ type: ReponseUserDto })
  @Put('/status')
  async updateUserStatus(
    @currentUser() currentUser,
    @Body() dto: UpdateStatusUserDto,
  ): Promise<UserEntity> {
    return await this.userSerive.updateStatus(dto, currentUser.id);
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Update status user' })
  @ApiOkResponse({ type: ReponseUserDto })
  @Put('/:id?')
  async updateUserInfo(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userSerive.updateInfo(dto, id);
  }

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete all authors' })
  @ApiOkResponse({ type: [ReponseUserDto] })
  @Delete('/del-authors')
  async deleteAllAuthors(@currentUser() currentUser): Promise<UserEntity[]> {
    return await this.userSerive.deleteAllAuthors(currentUser.id);
  }
}
