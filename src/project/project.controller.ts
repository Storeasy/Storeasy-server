import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { CreateProjectRequestDto } from './dto/create-project.request.dto';
import { ProjectColorResponseDto } from './dto/project-color.response.dto';
import { ProjectDetailResponseDto } from './dto/project-detail.response.dto';
import { UpdateProjectRequestDto } from './dto/update-project.request.dto';
import { ProjectService } from './project.service';

@ApiTags('프로젝트')
@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '프로젝트색 목록 조회' })
  @ApiOkResponse({ type: ProjectColorResponseDto })
  @Get('colors')
  async getProjectColors() {
    const data = await this.projectService.getProjectColors();
    return ResponseEntity.OK_WITH(
      ResponseStatus.READ_ALL_PROJECT_COLORS_SUCCESS,
      data,
    );
  }

  @ApiOperation({ summary: '프로젝트 생성' })
  @ApiCreatedResponse()
  @Post()
  async createProject(
    @Req() req,
    @Body() createProjectRequestDto: CreateProjectRequestDto,
  ) {
    await this.projectService.createProject(
      req.user.userId,
      createProjectRequestDto,
    );
    return ResponseEntity.OK(ResponseStatus.CREATE_PROJECT_SUCCESS);
  }

  @ApiOperation({ summary: '프로젝트 수정' })
  @ApiCreatedResponse()
  @Post(':projectId')
  async updateProject(
    @Req() req,
    @Param('projectId') projectId: number,
    @Body() updateProjectRequestDto: UpdateProjectRequestDto,
  ) {
    await this.projectService.updateProject(
      req.user.userId,
      projectId,
      updateProjectRequestDto,
    );
    return ResponseEntity.OK(ResponseStatus.UPDATE_PROJECT_SUCCESS);
  }

  @ApiOperation({ summary: '프로젝트 삭제' })
  @ApiOkResponse()
  @Delete(':projectId')
  async deleteProject(@Req() req, @Param('projectId') projectId: number) {
    await this.projectService.deleteProject(req.user.userId, projectId);
    return ResponseEntity.OK(ResponseStatus.DELETE_PROJECT_SUCCESS);
  }

  @ApiOperation({ summary: '프로젝트 상세 조회' })
  @ApiOkResponse({ type: ProjectDetailResponseDto })
  @Get(':projectId')
  async getProject(@Req() req, @Param('projectId') projectId: number) {
    const data = await this.projectService.getProject(req.user.userId, projectId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_PAGES_SUCCESS, data);
  }
}
