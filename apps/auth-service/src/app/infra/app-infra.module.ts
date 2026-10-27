import { Module } from "@nestjs/common";
import { MongoModule } from "@org/database/mongodb";
import { CacheModule } from "./cache/cache.module";
import { UserServiceModule } from "./user/user-service.module";

@Module({
  imports: [MongoModule, CacheModule, UserServiceModule],
  exports: [MongoModule, CacheModule, UserServiceModule],
})
export class AppInfraModule {}
