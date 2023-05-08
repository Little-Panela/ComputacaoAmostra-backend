import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseFilterPipe implements PipeTransform {
  transform(value: string, _metadata: ArgumentMetadata) {
    if (
      !Object.values({ bcc: 'bcc', ecomp: 'ecomp', all: 'all' }).includes(value)
    )
      throw new HttpException(
        'Filter type is invalid, try bcc, ecomp or all.',
        HttpStatus.BAD_REQUEST,
      );
    return value;
  }
}
