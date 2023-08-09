import { BadRequestException, Injectable, Logger }from '@nestjs/common'
import { LoginDTO } from "./dtos/login.dto";
import { MessageHelper } from "./helpers/messages.helper";
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { UserMessagesHelper } from 'src/user/helpers/message.helper';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(private readonly userService: UserService){}

    login(dto: LoginDTO){
        this.logger.debug('Login started');

        if(dto.login !== 'teste@teste' || dto.password !== '15455'){
            throw new BadRequestException(MessageHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND);
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