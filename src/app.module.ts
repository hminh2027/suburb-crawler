import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SyncModule } from './modules/sync/sync.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    SyncModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
