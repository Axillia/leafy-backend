import { EntityRepository, Repository } from 'typeorm';
import { Location } from './location.entity';
import { LocationCreateDto } from './dto/location-create.dto';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async getLocations(): Promise<Location[]> {
    const query = this.createQueryBuilder('location');

    return await query.getMany();
  }

  async createLocation(
    locationCreateDto: LocationCreateDto,
  ): Promise<Location> {
    const { name } = locationCreateDto;

    const location = new Location();
    location.name = name;

    return await location.save();
  }
}
