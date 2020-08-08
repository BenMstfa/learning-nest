import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param, ParseIntPipe,
    Patch,
    Post, Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {Task} from "./task.entity";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto){
        return this.tasksService.getTasks(filterDto);
    }

    /*
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }*/
}
