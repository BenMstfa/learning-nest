import {Module} from '@nestjs/common';
import {TasksModule} from './tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { TestingModule } from './testing/testing.module';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        TestingModule,
        AuthModule,
        Neo4jModule.forRoot({
            scheme: 'neo4j',
            host: 'localhost',
            port: 7686,
            username: 'neo4j',
            password: 'hema96'
        }),
    ],
})
export class AppModule {
}
