import { Controller, Post, HttpCode, HttpStatus, Body }from '@nestjs/common'
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDTO){
        return this.authService.login(dto)
    }
}