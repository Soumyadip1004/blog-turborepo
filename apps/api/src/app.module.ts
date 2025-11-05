import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@/lib/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule.forRoot({ auth }), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
