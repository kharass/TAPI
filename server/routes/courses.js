import express from "express";
import grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { scheduleProto } from "../grpc/proto/schedule.proto"; 

const packageDefinition = protoLoader.loadSync('grpc/proto/schedule.proto');
const scheduleProto = grpc.loadPackageDefinition(packageDefinition);

export const coursesRouter = express.Router();

coursesRouter.get('/:id', (req, res) => {
    const courseId = req.params.id;

    const client = new scheduleProto.ScheduleService('127.0.0.1:9090', grpc.ChannelCredentials.createInsecure());

    client.GetCourse({ courseId: courseId }, (err, response) => {
        if (err !== null) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(response);
        }
    });
});

coursesRouter.get('/:id/schedule', (req, res) => {
    const courseId = req.params.id;

    const client = new scheduleProto.ScheduleService('127.0.0.1:9090', grpc.ChannelCredentials.createInsecure());

    client.GetCourseSchedule({ courseId: courseId }, (err, response) => {
        if (err !== null) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(response);
        }
    });
});

coursesRouter.post('/', (req, res) => {
    res.send("Dodawanie nowego kursu");
});

coursesRouter.put('/:id', (req, res) => {
    res.send(`Aktualizacja kursu o ID ${req.params.id}`);
});

coursesRouter.delete('/:id', (req, res) => {
    res.send(`Usuwanie kursu o ID ${req.params.id}`);
});
