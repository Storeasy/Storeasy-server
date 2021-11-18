import {
  BadRequestException,
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PageService } from './page.service';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/s3/image-file-filter';
import { ResponseStatus } from 'src/config/res/response-status';
import { CreatePageRequestDto } from './dto/create-page.request.dto';
import { S3Service } from 'src/s3/s3.service';
import { ResponseEntity } from 'src/config/res/response-entity';
import { UpdatePageRequestDto } from './dto/update-page.request.dto';
import { PageResponseDto } from './dto/page.response.dto';

dotenv.config();
const s3 = new AWS.S3();

@ApiTags('페이지')
@Controller('api/page')
export class PageController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly pageService: PageService,
  ) {}

  @ApiOperation({ summary: '페이지 생성' })
  @ApiCreatedResponse()
  @UseInterceptors(
    FilesInterceptor('pageImages', 5, {
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  async createPage(
    @Req() req,
    @UploadedFiles() pageImages: Express.Multer.File[],
    @Body() createPageRequestDto: CreatePageRequestDto,
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
        pageImagesFiles.map((file) => {
          return file.then((f) => f.Location);
        }),
      );
      await this.pageService.createPageWithImage(
        req.user.userId,
        pageImagesUrls,
        createPageRequestDto,
      );
    } else {
      await this.pageService.createPage(req.user.userId, createPageRequestDto);
    }
    return ResponseEntity.OK(ResponseStatus.CREATE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: '페이지 수정' })
  @ApiCreatedResponse()
  @UseInterceptors(
    FilesInterceptor('pageImages', 5, {
      fileFilter: imageFileFilter,
    }),
  )
  @Post(':pageId')
  async updatePage(
    @Req() req,
    @Param('pageId') pageId: number,
    @UploadedFiles() pageImages: Express.Multer.File[],
    @Body() updatePageRequestDto: UpdatePageRequestDto,
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
        pageImagesFiles.map((file) => {
          return file.then((f) => f.Location);
        }),
      );
      await this.pageService.updatePageWithImage(
        req.user.userId,
        pageId,
        pageImagesUrls,
        updatePageRequestDto,
      );
    } else {
      console.log('withoutImage');
      await this.pageService.updatePage(
        req.user.userId,
        pageId,
        updatePageRequestDto,
      );
    }
    return ResponseEntity.OK(ResponseStatus.UPDATE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: '페이지 삭제' })
  @ApiOkResponse()
  @Delete(':pageId')
  async deletePage(@Req() req, @Param('pageId') pageId: number) {
    await this.pageService.deletePage(req.user.userId, pageId);
    return ResponseEntity.OK(ResponseStatus.DELETE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: '페이지 상세 조회' })
  @ApiOkResponse({ type: PageResponseDto })
  @Get(':pageId')
  async getPage(@Param('pageId') pageId: number) {
    const data = await this.pageService.getPage(pageId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_PAGE_SUCCESS, data);
  }
}
