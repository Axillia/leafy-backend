import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { ReportCreateDto } from './dto/report-create.dto';
import { Report } from './report.entity';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createReport(
    @GetUser() user: User,
    @Body(ValidationPipe) reportCreateDto: ReportCreateDto,
  ): Promise<Report> {
    return await this.reportService.createReport(reportCreateDto, user);
  }
}
