import { Controller, Post, HttpCode, HttpStatus, Body }from '@nestjs/common'
import { RegisterDto } from "./dtos/register.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController{
    constructor(private readonly userService: UserService){}


}