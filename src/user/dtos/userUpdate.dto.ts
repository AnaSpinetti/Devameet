import { MinLength, IsString } from "class-validator";
import { UserMessagesHelper } from "../helpers/message.helper";

export class UserUpdateDto {
    @MinLength(2, {message: UserMessagesHelper.REGISTER_NAME_NOT_VALID})
    name: string;

    @IsString()
    avatar: string;
} 