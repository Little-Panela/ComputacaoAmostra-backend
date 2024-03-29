import { Module } from '@nestjs/common';
import { ConfigurationService } from '../config/config.service';

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
