import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { LikeUserRepository } from 'src/repositories/like-user.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { LikePageResponseDto } from './dto/like-page.response.dto';
import { LikeUserResponseDto } from './dto/like-user.response.dto';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeUserRepository: LikeUserRepository,
    private readonly likePageRepository: LikePageRepository,
    private readonly userRepository: UserRepository,
    private readonly pageRepository: PageRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
    private readonly profileTagRepository: ProfileTagRepository,
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

  public async getLikeUsers(userId: number) {
    const likeUsers = await this.likeUserRepository.findAllUsersByUserId(userId);
    console.log(likeUsers);
    const profiles = likeUsers.map(like => like.receiverUser.profile);
    console.log(profiles);

    return await Promise.all(
      profiles.map(async (profile) => {
        const profileTags = await this.profileTagRepository.findAllByUserIdJoinTag(profile.userId);
        const tags = profileTags.map(profileTag => profileTag.tag);
        return  LikeUserResponseDto.ofLikeUser(profile, tags);
      })
    );
  }

  public async getLikePages(userId: number) {
    const likePages = await this.likePageRepository.findAllPagesByUserId(userId);
    const pages = likePages.map(like => like.page);

    return await Promise.all(
      pages.map(async (page) => {
        const profile = await this.profileRepository.findOne(page.userId);
        const pageImageCount = await this.pageImageRepository.getCountByPageId(
          page.id,
        );
        const pageTags = await this.pageTagRepository.findAllJoinQuery(page.id);
        return LikePageResponseDto.ofLikePageSimple(profile, page, pageImageCount, pageTags);
      })
    );
  }
}
