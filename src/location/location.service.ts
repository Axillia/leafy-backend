import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from './location.repository';
import { Location } from './location.entity';
import { LocationCreateDto } from './dto/location-create.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository,
  ) {}

  async getLocations(): Promise<Location[]> {
    return await this.locationRepository.getLocations();
  }

  async createLocation(
    locationCreateDto: LocationCreateDto,
  ): Promise<Location> {
    return await this.locationRepository.createLocation(locationCreateDto);
  }
}
