import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { TProject } from './types';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create(createProjectDto);
    await this.projectRepository.save(project);

    return project;
  }

  async findAll(filter?: TProject['course']) {
    if (!Object.values({ bcc: 'bcc', ecomp: 'ecomp' }).includes(filter))
      throw new HttpException(
        'Filter type is invalid, try BCC or ECOMP.',
        HttpStatus.BAD_REQUEST,
      );
    const projects = await this.projectRepository.find({
      where: { status: true },
      relations: ['votes', 'owner_id'],
    });
    if (!filter) return projects;
    return projects.filter((projects) => projects.course === filter.toString());
  }

  async findOne(id: string) {
    const projects = await this.projectRepository.findOne({
      where: { id, status: true },
      relations: ['votes', 'owner_id'],
    });
    return projects;
  }

  async changeStatus(id: string) {
    const project = await this.findOne(id);
    project.status = !project.status;
    await this.projectRepository.save(project);

    return project;
  }
}
