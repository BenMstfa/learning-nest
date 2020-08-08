import {PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
        TaskStatus.OPEN,
    ];

    transform(value: any): any {

        return value;
    }

}