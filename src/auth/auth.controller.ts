import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseLogin } from './dto/response-login.dto';
import { Controller, Body, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ type: ResponseLogin })
  async loginUser(@Body() dto: LoginUserDto): Promise<ResponseLogin> {
    return await this.authService.login(dto);
  }
}
