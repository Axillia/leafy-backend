import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportRepository } from './report.repository';
import { ReportCreateDto } from './dto/report-create.dto';
import { User } from '../user/user.entity';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportRepository)
    private reportRepository: ReportRepository,
  ) {}

  async createReport(
    reportCreateDto: ReportCreateDto,
    user: User,
  ): Promise<Report> {
    return await this.reportRepository.createReport(reportCreateDto, user);
  }
}
