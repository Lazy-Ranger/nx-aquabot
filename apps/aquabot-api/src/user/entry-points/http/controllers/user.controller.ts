import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseFilters,
  UseGuards
} from "@nestjs/common";
import { JwtAccessTokenGuard } from "../../../../auth/guards/jwt-access-token.guard";
import { HttpExceptionFilter } from "../../../../common/exception-filters/http-exception.filter";
import {
  RetrieveUserUseCase,
  SearchUsersUseCase,
  UpdateUserUseCase
} from "../../../application/use-cases";
import { IUserRetrieveParams, RetrieveUserBy } from "../../../contracts";
import { SearchUsersDto, UpdateUserDto } from "../dtos";
import { UserHttpMapper } from "../mappers/user-http.mapper";

@Controller("/users")
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAccessTokenGuard)
export class UserController {
  constructor(
    private readonly retrieveUserUC: RetrieveUserUseCase,
    private readonly searchUsersUC: SearchUsersUseCase,
    private readonly updateUserUC: UpdateUserUseCase
  ) {}

  @Get("search")
  async getUsers(@Query() query: SearchUsersDto) {
    const paginationResult = await this.searchUsersUC.execute(query);

    return {
      ...paginationResult,
      data: paginationResult.data.map(UserHttpMapper.toDto)
    };
  }

  @Get(":id")
  async getUserById(@Param("id") id: string) {
    const userRetrieveParams: IUserRetrieveParams = {
      by: RetrieveUserBy.ID,
      value: id
    };

    const user = await this.retrieveUserUC.execute(userRetrieveParams);

    return UserHttpMapper.toDto(user);
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = await this.updateUserUC.execute(id, updateUserDto);

    return UserHttpMapper.toDto(user);
  }
}
