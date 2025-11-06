import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { auth } from '@repo/auth';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule.forRoot({ auth }), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
