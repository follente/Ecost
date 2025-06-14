/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Result {
    _id?: string

    @Prop({ required: true })
    entryValues: number[] // Consumos proporcionados por el usuario

    @Prop({ required: true })
    result: number // Coste ambiental

    @Prop({ required: true })
    conversionPrice: number // Valor del precio de conversión de tCO2e a euros

    @Prop({required: true})
    conversionFactors: string[] //IDs factores de conveersión utilizados para el cálculo

    @Prop({required: true})
    user: string //ID usuario que ha realizado el cálculo

    @Prop({required: true})
    date: Date //Fecha del cálculo
}

export const ResultSchema = SchemaFactory.createForClass( Result )