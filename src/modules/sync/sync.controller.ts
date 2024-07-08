import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { SyncService } from './sync.service';
import { StatName } from 'src/constants';
import { KebabToCamelCasePipe } from './pipes/sync.pipe';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get()
  @UsePipes(new KebabToCamelCasePipe())
  findAll(@Query() { statName }: { statName: StatName }) {
    console.log(statName);
    this.syncService.syncByStatName(statName);
    return 'Syncing data...';
  }
}
