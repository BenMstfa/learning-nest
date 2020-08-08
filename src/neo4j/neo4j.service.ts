import {Inject, Injectable} from '@nestjs/common';
import {Neo4jConfig} from "./neo4j-config-interface";
import {NEO4J_CONFIG, NEO4J_DRIVER} from "./neo4j-constants";
import neo4j, {Driver, Session} from "neo4j-driver";
import Result from "neo4j-driver/types/result";

@Injectable()
export class Neo4jService {
    constructor(
        @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
        @Inject(NEO4J_DRIVER) private readonly driver: Driver
    ) {
    }

    getConfig(): Neo4jConfig {
        return this.config;
    }

    getDriver(): Driver {
        return this.driver
    }

    getReadSession(database?: string): Session {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.READ
        })
    }

    getWriteSession(database?: string): Session {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.WRITE
        })
    }

    read(cypher: string, params: Record<string, any>, database?: string): Result {
        return this.getReadSession(database).run(cypher, params)
    }

    write(cypher: string, params: Record<string, any>, database?: string): Result {
        return this.getWriteSession(database).run(cypher, params)
    }
}
