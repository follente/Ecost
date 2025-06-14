/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { CreateResultDto } from '../dto/create-result.dto';


@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.resultService.delete(id);
  }

  @Get('user/:id')
    findByUser(@Param('id') id: string) {
    return this.resultService.findByUser(id)
  }

  // @Get()
  // findAll() {
  //   return this.tourneyService.findAll();
  // }

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
