import { EntityRepository, Repository } from 'typeorm';
import { Condition } from './condition.entity';
import { CreateConditionDto } from './dto/create-condition.dto';

@EntityRepository(Condition)
export class ConditionRepository extends Repository<Condition> {
  async createCondition(
    crateConditionDto: CreateConditionDto,
  ): Promise<Condition> {
    const { name, label_color, label_icon } = crateConditionDto;

    const condition = new Condition();
    condition.name = name;
    condition.label_color = label_color;
    condition.label_icon = label_icon;

    return await condition.save();
  }

  async getConditions(): Promise<Condition[]> {
    const query = this.createQueryBuilder('location');

    return await query.getMany();
  }
}
