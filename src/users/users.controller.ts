import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  Res,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './services/users.service';

@Controller({ path: 'user' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const newUser = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).send(newUser);
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const { record, successfullyUpdated } =
      await this.usersService.updatePassword(id, updatePasswordDto);

    if (!record) {
      throw new NotFoundException('User not found');
    }

    if (record && !successfullyUpdated) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    return record;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const result = await this.usersService.delete(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
