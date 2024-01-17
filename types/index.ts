export interface Student{
    id: number;
    name: string;
    surname: string;
    email: string;
}

export interface Course{
    id: number;
    name: string;
    department: string;
    teacher: string;
    room: number;
    date: Date;
    duration: Date;
}