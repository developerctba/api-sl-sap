import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ItemController],
    providers: [ItemService]
})
export class ItemModule {}