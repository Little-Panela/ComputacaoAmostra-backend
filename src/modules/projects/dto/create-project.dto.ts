import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CourseEnum } from '../types';
import { Type } from 'class-transformer';

class MultilanguageVideoDto {
  @IsString()
  @ApiProperty()
  en: string;

  @IsString()
  @ApiProperty()
  pt: string;
}

class LinksDto {
  @IsOptional()
  @IsUrl()
  @ApiProperty()
  github?: string;

  @ValidateNested({ each: true })
  @Type(() => MultilanguageVideoDto)
  @ApiProperty()
  youtube: MultilanguageVideoDto;
  
  @IsOptional()
  @ApiProperty()
  banner?: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMinSize(3)
  @ApiProperty()
  team: string[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => LinksDto)
  @ApiProperty()
  links: LinksDto;

  @IsEnum({ BCC: 'bcc', ECOMP: 'ecomp' })
  @ApiProperty()
  course: CourseEnum;
}
