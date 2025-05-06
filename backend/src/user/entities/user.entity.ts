import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
    _id?: string;

    @Prop({ unique: true, required: true })
    email: string;
   
    @Prop({ unique: true, required: true })
    userName: string;

    @Prop({ minlength: 6, required: true })
    password?:string;
    
    @Prop({ required: true })
    name: string;

    @Prop({ default: 0 })
    puntosTotales: number;
    
    @Prop({ default: true })
    isActive: boolean;
    
    @Prop({ enum: ['admin', 'player'], default: 'player'}) 
    role: string;
}

export const UserSchema = SchemaFactory.createForClass( User );