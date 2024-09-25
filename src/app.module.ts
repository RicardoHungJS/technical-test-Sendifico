import { Module } from '@nestjs/common';
import { ServicesModule } from './infrastructure/services/services.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [ControllersModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
