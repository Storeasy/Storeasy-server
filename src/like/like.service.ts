import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { LikeUserRepository } from 'src/repositories/like-user.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeUserRepository: LikeUserRepository,
    private readonly likePageRepository: LikePageRepository,
    private readonly userRepository: UserRepository,
    private readonly pageRepository: PageRepository,
  ) {}

  public async likeUser(sender: number, receiver: number) {
    if (!(await this.userRepository.existsByUserId(receiver))) {
      throw new NotFoundException(ResponseStatus.USER_NOT_FOUND);
    }
    if (sender == receiver) {
      throw new ForbiddenException(ResponseStatus.LIKE_USER_FAIL_SELF);
    }

    await this.likeUserRepository.save({
      sender: sender,
      receiver: receiver,
    });
  }

  public async likePage(sender: number, pageId: number) {
    const page = await this.pageRepository.findOne(pageId);
    if (!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if (sender == page.userId) {
      throw new ForbiddenException(ResponseStatus.LIKE_PAGE_FAIL_SELF);
    }

    await this.likePageRepository.save({
      sender: sender,
      pageId: pageId,
    });
  }
}
