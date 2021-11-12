import { BadRequestException, Body, Controller, Delete, Get, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageService } from './page.service';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/s3/image-file-filter';
import { ResponseStatus } from 'src/config/res/response-status';
import { CreatePageRequestDto } from './dto/create-page.request.dto';
import { S3Service } from 'src/s3/s3.service';
import { ResponseEntity } from 'src/config/res/response-entity';

dotenv.config();
const s3 = new AWS.S3();

@ApiTags('페이지')
@Controller('api/page')
export class PageController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly pageService: PageService,
  ) {}

  @ApiOperation({ summary: "페이지 생성" })
  @ApiCreatedResponse()
  @UseInterceptors(FilesInterceptor('pageImages', 5, {
    fileFilter: imageFileFilter
  }))
  @Post()
  async createPage(@Req() req, @UploadedFiles() pageImages: Express.Multer.File[], @Body() createPageRequestDto: CreatePageRequestDto) {
    if(req.fileValidationError) {
      throw new BadRequestException(ResponseStatus.INVALID_FILE_ERROR);
    }
    if(pageImages) {
      const pageImagesFiles = await this.s3Service.uploadPageImages(req.user.userId, pageImages);
      const pageImagesUrls = await Promise.all(
        pageImagesFiles.map((file) => {
        return file.then((f) => f.Location);
        })
      );
      await this.pageService.createPageWithImage(req.user.userId, pageImagesUrls, createPageRequestDto);
    } else {
      await this.pageService.createPage(req.user.userId, createPageRequestDto);
    }
    return ResponseEntity.OK(ResponseStatus.CREATE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: "페이지 수정" })
  @ApiCreatedResponse()
  @Post(':pageId')
  async updatePage() {

  }

  @ApiOperation({ summary: "페이지 삭제" })
  @ApiOkResponse()
  @Delete()
  async deletePage() {

  }

  @ApiOperation({ summary: "페이지 상세 조회" })
  @ApiOkResponse()
  @Get(':pageId')
  async getPage() {

  }
}
