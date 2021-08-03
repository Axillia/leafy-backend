import { Module } from '@nestjs/common';
import { ConditionController } from './condition.controller';
import { ConditionService } from './condition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionRepository } from './condition.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConditionRepository])],
  controllers: [ConditionController],
  providers: [ConditionService],
})
export class ConditionModule {}
