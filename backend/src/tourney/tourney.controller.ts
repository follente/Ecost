/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourneyService } from './tourney.service';
import { CreateTourneyDto } from './dto/create-tourney.dto';
import { UpdateTourneyDto } from './dto/update-tourney.dto';
import { EnrollTourneyDto } from './dto/enroll-tourney.dto';

@Controller('tourney')
export class TourneyController {
  constructor(private readonly tourneyService: TourneyService) {}

  @Post()
  create(@Body() createTourneyDto: CreateTourneyDto) {
    return this.tourneyService.create(createTourneyDto);
  }

  @Get()
  findAll() {
    return this.tourneyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourneyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourneyDto: UpdateTourneyDto) {
    return this.tourneyService.update(id, updateTourneyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourneyService.remove(id);
  }

  @Patch('/:id/enroll')
  enroll(@Param('id') id: string, @Body() enrollTourneyDto: EnrollTourneyDto) {
    return this.tourneyService.enroll(id, enrollTourneyDto);
  }

  @Patch(':id/unenroll')
  unenroll(@Param('id') id: string, @Body() enrollTourneyDto: EnrollTourneyDto) {
    return this.tourneyService.unenroll(id, enrollTourneyDto);
  }
}
