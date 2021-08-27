import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { Comment } from './comment.entity';
import { CommentUpdateDto } from './dto/comment-update.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createComment(
    @GetUser() user: User,
    @Body(ValidationPipe) commentCreateDto: CommentCreateDto,
  ): Promise<Comment> {
    return await this.commentService.createComment(commentCreateDto, user);
  }

  @Put('/:id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) commentUpdateDto: CommentUpdateDto,
  ): Promise<Comment> {
    return await this.commentService.updateComment(id, commentUpdateDto);
  }

  @Get('/:product_id')
  async getComments(
    @Param('product_id', ParseIntPipe) product_id: number,
  ): Promise<Comment[]> {
    return await this.commentService.getComments(product_id);
  }

  @Get('/user/:user_id')
  async getCommentsByUser(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<Comment[]> {
    return await this.commentService.getCommentsByUser(user_id);
  }
}
