import {
  IUserResponse,
  IUserRetrieveParams,
  RetrieveUserBy,
} from "@aquabot/shared/contracts";
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseFilters,
} from "@nestjs/common";
import { HttpExceptionFilter } from "@org/server/common";
// import { JwtAccessTokenGuard } from "../../../../auth/guards/jwt-access-token.guard";
import {
  RetrieveUserUseCase,
  SearchUsersUseCase,
  UpdateUserUseCase,
} from "../../../application/use-cases";
import { SearchUsersDto, UpdateUserDto } from "../dtos";
import { UserHttpMapper } from "../mappers/user-http.mapper";

@Controller("/users")
@UseFilters(HttpExceptionFilter)
// @UseGuards(JwtAccessTokenGuard)
export class UserController {
  constructor(
    private readonly retrieveUserUC: RetrieveUserUseCase,
    private readonly searchUsersUC: SearchUsersUseCase,
    private readonly updateUserUC: UpdateUserUseCase,
  ) {}

  @Get("search")
  async getUsers(@Query() query: SearchUsersDto) {
    console.log(query);
    const paginationResult = await this.searchUsersUC.execute(query);

    return {
      ...paginationResult,
      data: paginationResult.data.map(UserHttpMapper.toDto),
    };
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<IUserResponse> {
    const userRetrieveParams: IUserRetrieveParams = {
      by: RetrieveUserBy.ID,
      value: id,
    };

    const user = await this.retrieveUserUC.execute(userRetrieveParams);

    return UserHttpMapper.toDto(user);
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.updateUserUC.execute(id, updateUserDto);

    return UserHttpMapper.toDto(user);
  }
}
