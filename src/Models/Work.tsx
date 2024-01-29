import { Employee } from "./Employee";
import { Project } from "./Project";

export interface Work {
    project: Project;
    employee: Employee;
    date: string;
    hours: number;
}