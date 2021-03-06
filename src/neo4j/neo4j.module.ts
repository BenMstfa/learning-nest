import {DynamicModule, Module} from '@nestjs/common';
import {Neo4jService} from './neo4j.service';
import {Neo4jConfig} from "./neo4j-config-interface";
import {NEO4J_CONFIG, NEO4J_DRIVER} from "./neo4j-constants";
import {createDriver} from "./neo4j.utils";
import {Driver} from "neo4j-driver";


@Module({})
export class Neo4jModule {
    static forRoot(config: Neo4jConfig): DynamicModule {
        return {
            module: Neo4jModule,
            providers: [
                Neo4jService,
                {
                    provide: NEO4J_CONFIG,
                    useValue: config,
                },
                {
                    provide: NEO4J_DRIVER,
                    inject: [NEO4J_CONFIG],
                    useFactory: async (config: Neo4jConfig): Promise<Driver> => createDriver(config)
                },
            ],
            exports: [
                Neo4jService
            ],
        }
    }
}
