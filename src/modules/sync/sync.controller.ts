import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { SyncService } from './sync.service';
// import { StatName } from 'src/constants';
import { KebabToCamelCasePipe } from './pipes/sync.pipe';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('create-sheet')
  async writeToSheet() {
    await this.syncService.writeToSheet();
    return 'Writing to sheet...';
  }

  @Get()
  @UsePipes(new KebabToCamelCasePipe())
  findAll(@Query() { statName }: { statName: any }) {
    console.log(statName);
    this.syncService.syncByStatName(statName);
    return 'Syncing data...';
  }

  @Get('local')
  async syncToLocal() {
    await this.syncService.writeToLocal();
    return 'Writing to local...';
  }

  @Get('stat')
  async syncStatList() {
    const data = await this.syncService.syncStatList();
    return data;
  }
}
