import { BadRequestException, Injectable }from '@nestjs/common'
import { LoginDTO } from "./dtos/login.dto";
import { MessageHelper } from "./helpers/messages.helper";

@Injectable()
export class AuthService {
    login(dto: LoginDTO){
        if(dto.login !== 'teste@teste' || dto.password !== '15455'){
            throw new BadRequestException(MessageHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND);
        }

        return dto;
    }
}