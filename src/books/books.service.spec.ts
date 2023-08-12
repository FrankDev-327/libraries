import {
  generateBookData,
  generateBooksData,
  generateBookPayload,
  generateCurrentUser,
  generateBookCreatePayload,
} from '../../test/book.generate';
import { BooksService } from './books.service';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

afterEach(() => {
  jest.resetAllMocks();
});

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        UsersService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<BooksService>(BooksService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should return an empty array', async () => {
    const spy = jest.spyOn(service, 'getList').mockResolvedValueOnce([]);
    const books = await service.getList();
    expect(books).toEqual([]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('shoudl return book list', async () => {
    const bookData = generateBooksData();
    const spy = jest.spyOn(service, 'getList').mockResolvedValueOnce(bookData);
    const book = await service.getList();
    expect(book).toEqual(bookData);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('create a book', () => {
    test('should add book into the database', async () => {
      const currentUser = generateCurrentUser();
      const payload = generateBookCreatePayload();
      const bookData = generateBookData();
      const spy = jest
        .spyOn(service, 'createBook')
        .mockResolvedValueOnce(bookData);
      const book = await service.createBook(payload, currentUser);
      expect(book).toEqual(bookData);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return a book info', async () => {
      const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
      const bookData = generateBookData({ id });
      const spy = jest
        .spyOn(service, 'getDetails')
        .mockResolvedValueOnce(bookData);
      const book = await service.getDetails(id);
      expect(book).toEqual(bookData);
      expect(book.id).toBe(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should update a book', async () => {
      const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
      const currentUser = generateCurrentUser();
      const payload = generateBookPayload();
      const userData = generateBookData(payload);
      const spy = jest
        .spyOn(service, 'updateInfo')
        .mockResolvedValueOnce(userData);
      const bookUpdated = await service.updateInfo(payload, id, currentUser);
      expect(bookUpdated).toEqual(userData);
      expect(bookUpdated.id).toBe(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('delete a book', async () => {
      const id = '3774cdc2-1380-4300-9331-f9d05c1f0c8c';
      const bookData = generateBookData({ id });
      const payload = generateBookData();
      const spy = jest
        .spyOn(service, 'deleteInfo')
        .mockResolvedValueOnce(bookData);
      const bookDeleted = await service.deleteInfo(payload);
      expect(bookDeleted).toEqual(bookData);
      expect(bookDeleted.id).toBe(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
