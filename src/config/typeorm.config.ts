import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Task} from "../tasks/task.entity";
import {User} from "../auth/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [Task, User],
    synchronize: false,
}