import {faker} from "@faker-js/faker";

export const getStudent = (id) => {
    faker.seed(Number(id));
    return {
        id: id,
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(), 
    };
}

export const getGroup = (id) => {
    faker.seed(Number(id));
    return {
        id: id,
        course:faker.number.int(),
        lecturer:faker.number.int(),
        room:faker.number.int(),
        students:[faker.number.int(1000),faker.number.int(1000),
            faker.number.int(1000),faker.number.int(1000),
            faker.number.int(1000)]
    };
}

export const getLecturer = (id) => {
    faker.seed(Number(id));
    return {
        id: id,
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        course: faker.number.int(100), 
    };
}

export const getRoom = (id) => {
    faker.seed(Number(id));
    return {
        id: id,
        course: faker.number.int(100), 
    };
}

export const getCourse = (id) => {
    faker.seed(Number(id));
    return {
        id: id,
        name: faker.person.jobTitle(),
        department: faker.person.jobTitle(),
        teacher: faker.person.fullName(),
        room: faker.number.int(550), 
        date: faker.date.anytime(),
        duration:faker.date.between({from: '2023-11-12T08:00:00.000Z', to: '2023-11-12T20:00:00.000Z'}),
    };
}