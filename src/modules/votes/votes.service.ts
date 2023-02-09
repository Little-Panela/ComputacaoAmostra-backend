import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TProject } from '../projects';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    const vote = this.votesRepository.create(createVoteDto);
    await this.votesRepository.save(vote);
  }

  async findAll(filter?: TProject['name']) {
    const votes = await this.votesRepository.find({
      relations: ['project_id'],
    });
    if (!filter) return votes;
    return votes.filter(({ project_id }) =>
      (project_id as TProject).name.includes(filter),
    );
  }
}
