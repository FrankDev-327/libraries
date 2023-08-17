import {
  generateUserStatus,
  generateAdminUserData,
  generateAdminsUsersData,
  generateAdminUserPayload,
} from '../../test/user.generate';
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

afterEach(() => {
  jest.resetAllMocks();
});

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  test('should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('should return an empty array', async () => {
    const spy = jest.spyOn(service, 'getUserList').mockResolvedValueOnce([]);
    const users = await service.getUserList();
    expect(users).toEqual([]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('shold return users/authors list', async () => {
    const userData = generateAdminsUsersData();
    const spy = jest
      .spyOn(service, 'getUserList')
      .mockResolvedValueOnce(userData);
    const users = await service.getUserList();
    expect(users).toEqual(userData);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('Get a user', () => {
    test('should return a user info', async () => {
      const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
      const userData = generateAdminUserData({ id });
      const spy = jest
        .spyOn(service, 'getUserInfo')
        .mockResolvedValueOnce(userData);
      const user = await service.getUserInfo(id);
      expect(user).toEqual(userData);
      expect(user.id).toBe(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create a user', () => {
    test('should add a user into the database', async () => {
      const payload = generateAdminUserPayload();
      const userData = generateAdminUserData(payload);
      const spy = jest
        .spyOn(service, 'createUser')
        .mockResolvedValueOnce(userData);
      const user = await service.createUser(payload);
      expect(user).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  test('should update a user', async () => {
    const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
    const userData = generateAdminUserData();
    const spy = jest
      .spyOn(service, 'updateInfo')
      .mockResolvedValueOnce(userData);
    const user = await service.updateInfo(userData, id);
    expect(user).toEqual(userData);
    expect(user.id).toBe(id);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('invalidate a user', async () => {
    const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
    const userData = generateAdminUserData();
    const status = generateUserStatus();
    const spy = jest
      .spyOn(service, 'updateStatus')
      .mockResolvedValueOnce(userData);
    const userUpdated = await service.updateStatus(status, id);
    expect(userUpdated).toEqual(userData);
    expect(userUpdated.id).toBe(id);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('delete a user', async () => {
    const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
    const userData = generateAdminUserData({ id });
    const spy = jest
      .spyOn(service, 'deleteAdmin')
      .mockResolvedValueOnce(userData);
    const user = await service.deleteAdmin(userData);
    expect(user).toEqual(userData);
    expect(user.id).toBe(id);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('delere all users', async () => {
    const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
    const userData = generateAdminsUsersData();
    const spy = jest
      .spyOn(service, 'deleteAllAuthors')
      .mockResolvedValueOnce(userData);
    const users = await service.deleteAllAuthors();
    expect(users).toEqual(userData);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
