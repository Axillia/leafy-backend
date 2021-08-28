import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportRepository } from './report.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReportRepository]), AuthModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
