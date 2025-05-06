/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Tourney {
    _id?: string;

    @Prop({ 
        enum: ['Torneo de Primavera', 
                'Torneo de Verano', 
                'Torneo de Otoño', 
                'Torneo de Invierno'], 
        required: true 
    })
    name: string;

    @Prop({ required: true })
    inscriptionDeadline: string;

    @Prop({ required: true })
    year: string;

    @Prop({ 
        enum: [ 'primavera', 
                'verano', 
                'otoño', 
                'invierno'], 
        required: true  })
    picture: string;

    @Prop({})
    enrolledPlayers: string[]; //IDs player

    @Prop({})
    selectedPlayers: string[]; //IDs player

    @Prop({})
    games: string[]; //IDs game

    @Prop({})
    classification: string[]; //IDs player ordered
}

export const TourneySchema = SchemaFactory.createForClass( Tourney );