import { BadRequestException, Injectable, Logger }from '@nestjs/common'
import { LoginDTO } from "./dtos/login.dto";
import { MessageHelper } from "./helpers/messages.helper";
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { UserMessagesHelper } from 'src/user/helpers/message.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ){}

    async login(dto: LoginDTO){
        this.logger.debug('Login started');
        const user = await this.userService.getUserByLoginPassword(dto.login, dto.password);
        
        if(user == null){
            throw new BadRequestException(MessageHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND);
        }

        const tokenPayload = {email: user.email, sub: user._id}

        return {
            email: user.email,
            name: user.name,
            token: this.jwtService.sign(tokenPayload, {secret: process.env.USER_JWT_SECRET_KEY})
        }

        return dto;
    }

    async register(dto: RegisterDto){
        this.logger.debug('Register started');

        if(await this.userService.existsByEmail(dto.email)){
            throw new BadRequestException(UserMessagesHelper.REGISTER_EXIST_EMAIL_ACCOUNT);
        }

        await this.userService.create(dto);
    }
}