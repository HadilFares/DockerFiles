// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule global
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {}),
    CatsModule,
  ],
})
export class AppModule {}

// MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
/*auth: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
      },*/
