import { Global, Module, Provider } from "@nestjs/common";
import { USER_SERVICE } from "../../tokens";
import { UserService } from "./adapters/user.service";

const PROVIDERS: Provider[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

@Global()
@Module({
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class UserServiceModule {}
