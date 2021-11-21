import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { imageFileFilter } from './image-file-filter';
import { S3Service } from './s3.service';

@ApiTags('업로드')
@Controller('api/upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiOperation({ summary: '프로필 이미지 업로드' })
  @ApiCreatedResponse()
  @UseInterceptors(
    FileInterceptor('profileImage', {
      fileFilter: imageFileFilter,
    }),
  )
  @Post('profile')
  async uploadProfileImage(
    @Req() req,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(ResponseStatus.INVALID_FILE_ERROR);
    }
    if (profileImage) {
      const profileImageFile = await this.s3Service.uploadProfileImage(
        req.user.userId,
        profileImage,
      );
      return ResponseEntity.OK_WITH(
        ResponseStatus.UPLOAD_PROFILE_IMAGE_SUCCESS,
        profileImageFile.Location,
      );
    } else {
      return ResponseEntity.OK(ResponseStatus.UPLOAD_PROFILE_IMAGE_FAIL);
    }
  }

  @ApiOperation({ summary: '페이지 이미지 업로드' })
  @ApiCreatedResponse()
  @UseInterceptors(
    FilesInterceptor('pageImages', 5, {
      fileFilter: imageFileFilter,
    }),
  )
  @Post('page')
  async createPage(
    @Req() req,
    @UploadedFiles() pageImages: Express.Multer.File[],
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(ResponseStatus.INVALID_FILE_ERROR);
    }
    if (pageImages[0]) {
      const pageImagesFiles = await this.s3Service.uploadPageImages(
        req.user.userId,
        pageImages,
      );
      const pageImagesUrls = await Promise.all(
        pageImagesFiles.map((file) => file.then((f) => f.Location)),
      );
      return ResponseEntity.OK_WITH(
        ResponseStatus.UPLOAD_PAGE_IMAGES_SUCCESS,
        pageImagesUrls,
      );
    } else {
      return ResponseEntity.OK(ResponseStatus.UPLOAD_PAGE_IMAGES_FAIL);
    }
  }
}
