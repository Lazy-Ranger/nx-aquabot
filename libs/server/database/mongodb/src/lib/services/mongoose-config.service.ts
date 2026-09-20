import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseOptionsFactory } from "@nestjs/mongoose";
import { MongodbConfig } from "../config/mongodb.config";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly config: ConfigService<MongodbConfig>) {}

  createMongooseOptions() {
    return {
      uri: this.config.get<string>("mongodb.url"),
    };
  }
}
