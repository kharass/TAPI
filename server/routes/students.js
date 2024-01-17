import express from "express";
import grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { scheduleProto } from "../grpc/proto/schedule.proto"; 

const packageDefinition = protoLoader.loadSync('grpc/proto/schedule.proto');
const scheduleProto = grpc.loadPackageDefinition(packageDefinition);

export const studentsRouter = express.Router();

studentsRouter.get('/:id', (req, res) => {
    const studentId = req.params.id;

    const client = new scheduleProto.ScheduleService('127.0.0.1:9090', grpc.ChannelCredentials.createInsecure());

    client.GetStudent({ studentId: studentId }, (err, response) => {
        if (err !== null) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(response);
        }
    });
});

studentsRouter.post('/', (req, res) => {
    res.send("Dodawanie nowego studenta");
});

studentsRouter.put('/:id', (req, res) => {
    res.send(`Aktualizacja studenta o ID ${req.params.id}`);
});

studentsRouter.delete('/:id', (req, res) => {
    res.send(`Usuwanie studenta o ID ${req.params.id}`);
});
