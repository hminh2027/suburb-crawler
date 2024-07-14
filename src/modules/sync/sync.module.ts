import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { GoogleSheetsModule } from 'src/lib/google-sheets/google-sheets.module';

@Module({
  imports: [GoogleSheetsModule],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
