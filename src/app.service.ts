import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  render () {
    return {
      github: 'https://github.com/KevinVelassco/acl-api',
      documentation: 'graphql'
    };
  }
}
