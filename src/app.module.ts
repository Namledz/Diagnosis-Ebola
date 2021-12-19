import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CovidService } from './covid.service';
import { CovidFieldsService } from './fields.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CovidService, CovidFieldsService],
})
export class AppModule {}
