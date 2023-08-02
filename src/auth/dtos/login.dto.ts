import { IsEmail, IsNotEmpty } from "class-validator";
import { MessageHelper } from "../helpers/messages.helper";

export class LoginDTO {
    @IsEmail({}, {message: MessageHelper.AUTH_LOGIN_NOT_FOUND})
    login: string;

    @IsNotEmpty({message: MessageHelper.AUTH_PASSWORD_NOT_FOUND})
    password: string;
}