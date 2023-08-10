import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { RegisterDto } from "./dtos/register.dto";
import * as CryptoJS from "crypto-js"

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly UserModel:Model<UserDocument>){}

    async create(dto: RegisterDto){
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString()
        const createdUser = new this.UserModel(dto);
        await createdUser.save();
    }

    async existsByEmail(email: string) : Promise<Boolean>{
        const result = await this.UserModel.findOne({email});

        if(result){
            return true;
        }

        return false;
    }

    async getUSerByLoginPassword(email: string, password: string) : Promise<UserDocument | null>{
        const user = await this.UserModel.findOne({email}) as UserDocument;

        if(user){
            const bytes = CryptoJS.AES.decrypt(password, process.env.USER_CYPHER_SECRET_KEY);
            const savedPassword = bytes.toString(CryptoJS.enc.Utf8);

            if(password == savedPassword){
                return user;
            }
        }

        return null
    }
}