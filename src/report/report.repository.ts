import { EntityRepository, Repository } from 'typeorm';
import { Report } from './report.entity';
import { ReportCreateDto } from './dto/report-create.dto';
import { User } from '../user/user.entity';

@EntityRepository(Report)
export class ReportRepository extends Repository<Report> {
  async createReport(
    reportCreateDto: ReportCreateDto,
    user: User,
  ): Promise<Report> {
    const { product, reason, message } = reportCreateDto;

    const report = new Report();
    report.reporter = user.id;
    report.product = product;
    report.reason = reason;
    report.message = message;

    return await report.save();
  }
}
