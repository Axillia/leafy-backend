import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { Condition } from './condition.entity';
import { CreateConditionDto } from './dto/create-condition.dto';

@Controller('condition')
export class ConditionController {
  constructor(private conditionService: ConditionService) {}

  @Post()
  async createCondition(
    @Body(ValidationPipe) createConditionDto: CreateConditionDto,
  ): Promise<Condition> {
    return await this.conditionService.createCondition(createConditionDto);
  }

  @Get('all')
  async getConditions(): Promise<Condition[]> {
    return await this.conditionService.getConditions();
  }
}
