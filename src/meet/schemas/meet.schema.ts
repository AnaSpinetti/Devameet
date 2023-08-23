import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/schemas/user.schema";

@Schema()
export class Meet{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    color: string;

    @Prop({required: true})
    link: string;
}