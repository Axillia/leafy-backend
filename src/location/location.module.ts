import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRepository } from './location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
