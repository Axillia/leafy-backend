import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { LocationModule } from './location/location.module';
import { ConditionModule } from './condition/condition.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { ReportModule } from './report/report.module';
import { RequestModule } from './request/request.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    UploadModule,
    LocationModule,
    ConditionModule,
    ProductModule,
    CommentModule,
    ReportModule,
    RequestModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
