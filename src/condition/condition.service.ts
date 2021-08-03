import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConditionRepository } from './condition.repository';
import { CreateConditionDto } from './dto/create-condition.dto';
import { Condition } from './condition.entity';

@Injectable()
export class ConditionService {
  constructor(
    @InjectRepository(ConditionRepository)
    private conditionRepository: ConditionRepository,
  ) {}

  async createCondition(
    createConditionDto: CreateConditionDto,
  ): Promise<Condition> {
    return await this.conditionRepository.createCondition(createConditionDto);
  }

  async getConditions(): Promise<Condition[]> {
    return await this.conditionRepository.getConditions();
  }
}
