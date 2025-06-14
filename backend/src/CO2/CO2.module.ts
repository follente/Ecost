/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from './entities/result.entity';
import { ResultController } from './controllers/result.controller';
import { ResultService } from './services/result.service';
import { ConversionFactorController } from './controllers/conversionFactor.controller';
import { ConversionFactorService } from './services/conversionFactor.service';
import { ConversionFactor, ConversionFactorSchema } from './entities/conversionFactor.entity';

@Module({
  controllers: [ResultController, ConversionFactorController],
  providers: [ResultService, ConversionFactorService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Result.name,
        schema: ResultSchema
      },
      {
        name: ConversionFactor.name,
        schema: ConversionFactorSchema
      },

    ])
  ],
})
export class CO2Module {}
