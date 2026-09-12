import { Module } from "@nestjs/common";
import { MongoModule } from "@org/database/mongodb";

@Module({
  imports: [MongoModule],
  exports: [MongoModule],
})
export class DatabaseModule {}
