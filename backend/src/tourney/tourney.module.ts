/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TourneyService } from './tourney.service';
import { TourneyController } from './tourney.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tourney, TourneySchema } from './entities/tourney.entity';

@Module({
  controllers: [TourneyController],
  providers: [TourneyService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Tourney.name,
        schema: TourneySchema
      }
    ])
  ],
})
export class TourneyModule {}
