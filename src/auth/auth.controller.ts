import { Controller, Post, HttpCode, HttpStatus, Body }from '@nestjs/common'
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { isPublic } from './decorators/ispublic.decorator';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @isPublic()
    login(@Body() dto: LoginDTO){
        return this.authService.login(dto)
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @isPublic()
    register(@Body() dto: RegisterDto){
        return this.authService.register(dto)
    }
}