import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { LocationCreateDto } from './dto/location-create.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('/all')
  async getLocations(): Promise<Location[]> {
    return await this.locationService.getLocations();
  }

  @Post()
  async createLocation(
    @Body(ValidationPipe) locationCreateDto: LocationCreateDto,
  ): Promise<Location> {
    return await this.locationService.createLocation(locationCreateDto);
  }
}
