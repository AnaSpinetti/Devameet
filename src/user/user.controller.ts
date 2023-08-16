import { Controller, Request, BadRequestException, Get }from '@nestjs/common'
import { RegisterDto } from "./dtos/register.dto";
import { UserService } from "./user.service";
import { UserMessagesHelper } from './helpers/message.helper';

@Controller("user")
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get()
    async getUser(@Request() req){
        const {userId} = req?.user;

        const user = await this.userService.getUserById(userId)
        
        if(!user){
            throw new BadRequestException(UserMessagesHelper.GET_USER_NOT_FOUND)
        }

        return {
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            id: user._id
        }
    }
}