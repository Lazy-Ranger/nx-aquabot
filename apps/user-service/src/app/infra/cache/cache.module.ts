import { Global, Module, Provider } from "@nestjs/common";
import { RedisService } from "@org/server/cache";
import { CACHE_SERVICE } from "../../tokens";

const PROVIDERS: Provider[] = [
  {
    provide: CACHE_SERVICE,
    useClass: RedisService,
  },
];

@Global()
@Module({
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class CacheModule {}
