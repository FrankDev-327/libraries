import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
import { UsersService } from './users.service';
import { RoleGuard } from '../auth/role/role.guard';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReponseUserDto } from './dto/response-user.dto';
import { UserGuard } from '../user-guard/user-guard.guard';
import { UpdateStatusUserDto } from './dto/update-status.dto';
import { ReponseUserListDto } from './dto/response-user-list.dto';
import { UserLogged } from '../current-user/user.logged.decorator';
import { CurrentUserDto } from 'src/current-user/dto/current.user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userSerive: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ type: ReponseUserDto })
  @ApiBearerAuth('JWT-auth')
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return await this.userSerive.createUser(dto);
  }

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Get info about user by id' })
  @ApiOkResponse({ type: ReponseUserDto })
  @ApiBearerAuth('JWT-auth')
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
  @ApiBearerAuth('JWT-auth')
  @Get()
  async getUserList(): Promise<UserEntity[]> {
    return await this.userSerive.getUserList();
  }

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete admin' })
  @ApiOkResponse({ type: ReponseUserDto })
  @ApiBearerAuth('JWT-auth')
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
  @ApiBearerAuth('JWT-auth')
  @Put('/status')
  async updateUserStatus(
    @UserLogged() currentUser: CurrentUserDto,
    @Body() dto: UpdateStatusUserDto,
  ): Promise<UserEntity> {
    return await this.userSerive.updateStatus(dto, currentUser.id);
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Update status user' })
  @ApiOkResponse({ type: ReponseUserDto })
  @ApiBearerAuth('JWT-auth')
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
  @ApiBearerAuth('JWT-auth')
  @Delete('/del-authors')
  async deleteAllAuthors(): Promise<UserEntity[]> {
    return await this.userSerive.deleteAllAuthors();
  }
}
