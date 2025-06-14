/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CO2Module } from './CO2/CO2.module'



@Module({
  imports: [
    UserModule, 
    CO2Module,
    MongooseModule.forRoot('mongodb://localhost:27017'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
