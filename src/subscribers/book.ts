import { BookEntity } from '../entities/book.entity';
import { UsersService } from '../users/users.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class BookSubscriber implements EntitySubscriberInterface<BookEntity> {
  private rabbitMQData: any;
  constructor(private userService: UsersService) {}

  listenTo(): string | Function {
    return BookEntity;
  }

  @RabbitSubscribe({
    exchange: 'book.relation',
    routingKey: 'book-relation-route',
    queue: 'book-relation-queue',
    queueOptions: {
      durable: false,
    },
  })
  async dispatchingUserInfo(dispatchedInfo) {
    this.rabbitMQData = dispatchedInfo;
    console.log('rabbit');
    console.log(this.rabbitMQData);
  }

  async afterInsert(event: InsertEvent<BookEntity>): Promise<void> {
    console.log('event');

    //console.log(this.rabbitMQData);

    /* const model = event.entity;
        const user = await this.userService.getUserInfo(this.rabbitMQData.user_id);
        user.book = model; */
    //await user.save();
  }
}
