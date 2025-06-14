/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ConversionType, SupplyType } from "../enums/result.enums";

@Schema()
export class ConversionFactor {
    _id?: string

    @Prop({ required: true })
    supply: SupplyType

    @Prop({ required: true })
    conversionFactor: number

    @Prop({required: true})
    source: string // De que fuente proviene el factor de conversión

    @Prop({required: true})
    type: ConversionType

}

export const ConversionFactorSchema = SchemaFactory.createForClass( ConversionFactor )