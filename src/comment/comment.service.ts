import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { User } from '../user/user.entity';
import { CommentUpdateDto } from './dto/comment-update.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async createComment(
    commentCreateDto: CommentCreateDto,
    user: User,
  ): Promise<Comment> {
    return await this.commentRepository.createComment(commentCreateDto, user);
  }

  async getComments(product_id: number): Promise<Comment[]> {
    return await this.commentRepository.getComments(product_id);
  }

  async getCommentsByUser(user_id: number): Promise<Comment[]> {
    return await this.commentRepository.getCommentsByUser(user_id);
  }

  async updateComment(
    id: number,
    commentUpdateDto: CommentUpdateDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    const { answer } = commentUpdateDto;

    if (!comment) {
      throw new NotFoundException();
    }

    comment.answer = answer;

    return await comment.save();
  }
}
