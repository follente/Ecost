/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TourneyModule } from './tourney/tourney.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    UserModule, 
    TourneyModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
