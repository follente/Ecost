/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateResultDto } from '../dto/create-result.dto';
import { ConversionFactorService } from '../services/conversionFactor.service';


@Controller('conversionFactor')
export class ConversionFactorController {
  constructor(private readonly conversionFactorService: ConversionFactorService) {}

  @Post()
  create(@Body() createConveresionFactorDto: CreateResultDto) {
    return this.conversionFactorService.create(createConveresionFactorDto);
  }

  @Get()
  findAll() {
    return this.conversionFactorService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tourneyService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTourneyDto: UpdateTourneyDto) {
  //   return this.tourneyService.update(id, updateTourneyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tourneyService.remove(id);
  // }

  // @Patch('/:id/enroll')
  // enroll(@Param('id') id: string, @Body() enrollTourneyDto: EnrollTourneyDto) {
  //   return this.tourneyService.enroll(id, enrollTourneyDto);
  // }

  // @Patch(':id/unenroll')
  // unenroll(@Param('id') id: string, @Body() enrollTourneyDto: EnrollTourneyDto) {
  //   return this.tourneyService.unenroll(id, enrollTourneyDto);
  // }
}
