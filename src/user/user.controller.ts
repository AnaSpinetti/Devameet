import { Controller, Request, BadRequestException, Get, Put, HttpCode, Body, HttpStatus }from '@nestjs/common'
import { UserService } from "./user.service";
import { UserMessagesHelper } from './helpers/message.helper';
import { UserUpdateDto } from './dtos/userUpdate.dto';

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

    @Put()
    @HttpCode(HttpStatus.OK)
    async updateUser(@Request() req, @Body() dto: UserUpdateDto){
        const {userId} = req?.user;

        await this.userService.updateUser(userId, dto)
    }
}