import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne({id: id})

        if (!found) {
            throw new NotFoundException('No task found with ')
        }

        return found
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN
        await task.save();

        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    /*getAllTasks(): Task[] {
        return this.tasks;
    }



    deleteTask(id: string): void {
        this.tasks.splice(this.tasks.findIndex(t => t.id === id), 1)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);

        task.status = status

        return task;
    }*/
}
