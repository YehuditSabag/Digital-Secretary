import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {  UserSchema } from './user.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService,AuthService,],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}