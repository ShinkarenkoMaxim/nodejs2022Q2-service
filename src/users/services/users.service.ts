import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../interfaces/user.interface';
import { UpdatePasswordDto } from '../dto/update-password.dto';

type UpdatePasswordResult = {
  record: Omit<User, 'password'> | null;
  successfullyUpdated: boolean;
};

function omitPassword({
  id,
  login,
  version,
  createdAt,
  updatedAt,
}): Omit<User, 'password'> {
  return { id, login, version, createdAt, updatedAt };
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const timestamp = new Date().getTime();
    const { login, password } = createUserDto;
    const newUser = {
      id: uuidv4(),
      login,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.push({ ...newUser, password });

    return newUser;
  }

  findAll(): Omit<User, 'password'>[] {
    const users = this.users.map((user) => omitPassword(user));
    return users;
  }

  findOneById(id: string): Omit<User, 'password'> {
    let foundedUser: Omit<User, 'password'> | null = null;

    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.id === id) {
        foundedUser = omitPassword(user);
        break;
      }
    }

    return foundedUser;
  }

  updatePassword(
    id: string,
    passwordMatch: UpdatePasswordDto,
  ): UpdatePasswordResult {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      if (user.password !== passwordMatch.oldPassword) {
        return { record: user, successfullyUpdated: false };
      }

      const timestamp = new Date().getTime();

      user.password = passwordMatch.newPassword;
      user.updatedAt = timestamp;
      user.version++;

      return {
        record: omitPassword(user),
        successfullyUpdated: true,
      };
    } else {
      return { record: null, successfullyUpdated: false };
    }
  }

  delete(id: string): boolean {
    const userIdx = this.users.findIndex((user) => user.id === id);

    if (userIdx === -1) {
      return false;
    }

    this.users.splice(userIdx, 1);

    return true;
  }
}
