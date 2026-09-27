import { Module } from "@nestjs/common";
import { MongoModule } from "@org/database/mongodb";
import { CacheModule } from "./cache/cache.module";

@Module({
  imports: [MongoModule, CacheModule],
  exports: [MongoModule, CacheModule],
})
export class AppInfraModule {}
