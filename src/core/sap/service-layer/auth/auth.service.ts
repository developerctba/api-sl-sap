import { Injectable } from '@nestjs/common';
import { SAPSession } from '../shared/interface/sap-session.interface';
import slOptions from '../../config/service-layer-options';
import configs from '../../config/config';
import * as request from 'request-promise';

@Injectable()
export class AuthService {
    constructor(){}

    async auth(): Promise<SAPSession>{
        return await this.authentication();
    }

    async authentication(): Promise<SAPSession> {
        const options = slOptions;
        options.uri = `${configs['url']}/b1s/v1/Login`;
        options['body'] = {
            CompanyDB: configs['company'],
            Password: configs['password'],
            UserName: configs['username']
        };

        var response = await request.post(options);
        let session: SAPSession = {
            b1session: response.SessionId,
            companydb: configs['company'],
            routeid: '.node0',
            request: request.defaults({
                headers: {
                    Cookie: [
                        `B1SESSION=${response.SessionId};HttpOnly;`,
                        `CompanyDB=${configs['company']};HttpOnly;`,
                        `ROUTEID=${'.node0'}; path=/b1s`
                    ]
                }
            })
        };

        

        return session;
    };
}
