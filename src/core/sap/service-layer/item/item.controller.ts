import { ItemService } from './item.service';
import { Controller, Get, Req, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { Item } from './item';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService){}

    @Get()
    async findAll(@Req() req){
        return await this.itemService.findAll(req.sapSession);
    }

    @Get('code/:code')
    async findByCode(@Req() req, @Param('code') code: string){
        return await this.itemService.findByCode(req.sapSession, code);
    }

    @Post()
    async create(@Req() req, @Body() item: Item){
        return await this.itemService.create(req.sapSession, item);
    }

    @Patch()
    async update(@Req() req, @Body() item: Item){
        return await this.itemService.update(req.sapSession, item);
    }

    @Delete('code/:code')
    async deleteByCode(@Req() req, @Param('code') code: string){
        return await this.itemService.deleteByCode(req.sapSession, code);
    }
}
