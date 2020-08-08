import {Controller, Get} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os');

@Controller('testing')
export class TestingController {
    @Get()
    getOs(): any {
        return {
            'arch': os.arch(),
            'cpus': os.cpus()
        }
    }
}
