
import { BookEntity } from "src/entities/book.entity";
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm"

@EventSubscriber()
export class BookSubscriber implements EntitySubscriberInterface<BookEntity> {
    listenTo(): string | Function {
        return BookEntity;
    }

    afterInsert(event: InsertEvent<BookEntity>): void {
        
    }
}
