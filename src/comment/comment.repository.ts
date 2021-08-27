import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { User } from '../user/user.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    commentCreateDto: CommentCreateDto,
    user: User,
  ): Promise<Comment> {
    const { product, question } = commentCreateDto;

    const comment = new Comment();
    comment.product = product;
    comment.question = question;
    comment.user = user.id;

    return await comment.save();
  }

  async getComments(product_id: number): Promise<Comment[]> {
    const query = this.createQueryBuilder('comment')
      .where('comment.product = :product_id', { product_id: product_id })
      .leftJoinAndSelect('comment.user', 'user');

    return await query.getMany();
  }

  async getCommentsByUser(user: User): Promise<Comment[]> {
    const query = this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.product', 'product')
      .leftJoinAndSelect('comment.user', 'user')
      .where('product.user = :user_id', { user_id: user.id })
      .where('comment.answer IS NULL');

    return await query.getMany();
  }
}
