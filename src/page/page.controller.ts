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
      console.log(pageImages);
      console.log(req.user);
      console.log(req.user.userId)
      const pageImagesUrl = await this.s3Service.uploadPageImages(pageImages);
      console.log((await pageImagesUrl[0]).Location);
    } else {
      
    }
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
