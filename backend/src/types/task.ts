import { TaskStatus } from "../enums/task";

interface ValidateRequest {
    title: string;
    description?: string;
    parentTaskId?: number;
    status?: TaskStatus;
}

export { ValidateRequest };