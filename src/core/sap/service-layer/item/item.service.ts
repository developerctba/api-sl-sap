import { Injectable } from '@nestjs/common';
import { Item } from './item';
import { SAPSession } from '../shared/interface/sap-session.interface';
import slOptions from '../../config/service-layer-options';
import configs from '../../config/config';

@Injectable()
export class ItemService {

    async findAll(session: SAPSession) {
        const options = { ...slOptions };
        options.uri = `${configs.url}/b1s/v1/Items`;
        return await session.request.get(options);
    }

    async findByCode(session: SAPSession, code: string) {
        const options = slOptions;
        options.uri = `${configs.url}/b1s/v1/Items?$filter=ItemCode eq '${code}'`;
        return await session.request.get(options);
    }

    async create(session: SAPSession, item: Item) {
        const options = slOptions;
        options.uri = `${configs.url}/b1s/v1/Items`;
        options.body = item;
        return await session.request.post(options);
    }

    async deleteByCode(session: SAPSession, code: string) {
        const item = await this.findByCode(session, code).then(item => item);
        if (item) {
            const options = slOptions;
            options.uri = `${configs.url}/b1s/v1/Items('${code}')`;
            return await session.request.delete(options);
        }
    }

    async update(session: SAPSession, item: Item) {
        const options = { ...slOptions };
        options.uri = `${configs.url}/b1s/v1/Items('${item.ItemCode}')`;
        options.body = item;
        return await session.request.patch(options);
    }

}
