/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { TurnType } from '../../typesOfTurn/turnType.interface';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTurnTypeDto } from '../createTurnTypeDto';
import { ActivityTime } from 'src/ActivityTime/ActivityTime.interface';

@Injectable()
export class TurnsTypeService {
  private db: Db;

  constructor(@InjectModel('TurnType') private readonly turnTypeModel: Model<TurnType>) { }


  // async connectToDatabase(): Promise<MongoClient> {
  //   const client = await MongoClient.connect('mongodb://127.0.0.1:27017/Users');
  //   this.db = client.db('Users');
  //   console.log('Connected to turnstype');

  //   return client;
  // }

  // async findByEmail(email: string): Promise<Turn | undefined> {
  //   return this.db.collection<Turn>('Turn').findOne({ email });
  // }

async getAll(): Promise<TurnType[] | undefined> {
    
     const arr = this.turnTypeModel.find().exec();
     console.log(arr);
     
    return arr;
  }

  //async function that creating object- new record of turns tables.

  async create(
    createTurnTypeDto: CreateTurnTypeDto ): Promise<TurnType> {
   
    const createdTurn = new this.turnTypeModel(createTurnTypeDto);
    return createdTurn.save();
  }

  async deleteturn(id: string) {
    const turndelete = await this.turnTypeModel.findById(id);
    try {
      if (!turndelete) {
        throw UnauthorizedException;
      }
      await this.turnTypeModel.findByIdAndRemove({ id });
      console.log('sucsses delete TurnsType');
    } catch {
      console.error('error delete TurnsType', error);
    }
  }

  async update(id: string, newturn: TurnType) {
    try {
      await this.db.collection<TurnType>('TurnsType').updateOne({ id }, newturn);
      console.log('sucsses update TurnsType');
    } catch {
      console.error('error update TurnsType', error);
    }
  }

}
