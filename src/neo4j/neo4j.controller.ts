import {Controller, Inject} from '@nestjs/common';
import {Neo4jService} from "./neo4j.service";

@Controller('neo4j')
export class Neo4jController {
    constructor(@Inject(Neo4jService) neo4jService: Neo4jService) {
    }


}
