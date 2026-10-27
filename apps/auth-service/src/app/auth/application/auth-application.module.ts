import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
// import { AuthDatabaseModule } from "../../infra/db/auth.mongo.module";
import { AuthDatabaseModule } from "../infra/db/auth.mongo.module";
// import { UserModule } from "../../user/user.module";
import JwtStrategy from "../strategies/strategies.provider";
import servicesProviders from "./services/service.provider";
import useCasesProviders from "./use-cases/use-case.provider";

const PROVIDERS = [...JwtStrategy, ...useCasesProviders, ...servicesProviders];
@Module({
  imports: [AuthDatabaseModule, PassportModule, JwtModule],
  providers: PROVIDERS,
  exports: [
    AuthDatabaseModule,
    JwtModule,
    ...useCasesProviders,
    ...servicesProviders,
  ],
})
export class AuthApplicationModule {}
