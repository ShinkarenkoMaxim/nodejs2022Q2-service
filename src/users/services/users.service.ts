import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';

type UpdatePasswordResult = {
  record: any;
  successfullyUpdated: boolean;
};

const availableFieldsToSelect = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: { ...createUserDto },
      select: availableFieldsToSelect,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: availableFieldsToSelect,
    });
  }

  findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: availableFieldsToSelect,
    });
  }

  async updatePassword(
    id: string,
    passwordMatch: UpdatePasswordDto,
  ): Promise<UpdatePasswordResult> {
    let user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      if (user.password !== passwordMatch.oldPassword) {
        return { record: user, successfullyUpdated: false };
      }

      const updatedUser = {
        password: passwordMatch.newPassword,
        updatedAt: new Date(),
        version: user.version + 1,
      };

      user = await this.prisma.user.update({
        where: { id },
        data: updatedUser,
      });

      return {
        record: user,
        successfullyUpdated: true,
      };
    } else {
      return { record: null, successfullyUpdated: false };
    }
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
