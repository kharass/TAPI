import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import express from "express";

const packageDefinition = protoLoader.loadSync('grpc/proto/schedule.proto');
const scheduleProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(scheduleProto.ScheduleService.service, {
    getStudent: (call, callback) => {
        const studentId = call.request.studentId;
        callback(null, { name: "John", surname: "Doe" });
    },
    getCourses: (call, callback) => {
        callback(null, { courses: [{ name: "Math", department: "Science" }, ] });
    },
    getLecturer: (call, callback) => {
        const lecturerId = call.request.lecturerId;
        callback(null, { name: "Dr. Smith", surname: "Lecturer" });
    },
   
});

server.bindAsync("127.0.0.1:9090", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
        return console.error(err);
    }
    console.log(`gRPC listening on ${port}`);
    server.start();
});

const client = new scheduleProto.ScheduleService('127.0.0.1:9090', grpc.ChannelCredentials.createInsecure());

const getStudentRequest = { studentId: "123" };
const getCoursesRequest = {}; 
const getLecturerRequest = { lecturerId: "456" };

client.getStudent(getStudentRequest, (error, response) => {
    if (!error) {
        console.log("Student Response:", response);
    } else {
        console.error("Error:", error);
    }
});

client.getCourses(getCoursesRequest, (error, response) => {
    if (!error) {
        console.log("Courses Response:", response);
    } else {
        console.error("Error:", error);
    }
});

client.getLecturer(getLecturerRequest, (error, response) => {
    if (!error) {
        console.log("Lecturer Response:", response);
    } else {
        console.error("Error:", error);
    }
});
