const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const smsEndpoint = "/api/ifttt/v1/actions/send_sms";
const validIftttKey = '12345';
const fakePhoneNumber = '0031612345678';
const fakeToken = '0000000-0000-0000-0000-000000000000';
const fakeBody = "Testeroni";

//Using the chai package to call .should on responses
chai.should();

//Using chaiHttp to make http request to our api
chai.use(chaiHttp);

//Tests for sender input
describe('Validation of sender',()=>{
    it('should respond status 400 when using an "" as sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    });
    it('should respond status 400 when using an empty sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 200 when not using an empty sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 400 when using an integer as sender ', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 1234,
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 200 when using a string as sender ', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "String",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using a approved special char as sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "!#$%&'()*+,./:;<=>?@[]^_`{|}~",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using a approved special char as sender 2', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : ",./:;<=>?@[",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using a approved special char as sender 3', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "]^_`{|}~",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using 11 aplhanumeric sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "a2345678910",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using 12 alphanumeric sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "a2345678101",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using 1 alphanumeric sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "a",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using 16 digit sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "1234567890123456",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using 17 digit sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "1234568901234567",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using 1 digit sender', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "1",
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
//Tests for receiver input
describe('Validation of receiver',()=> {
    it('should respond status 400 when using an "" as receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": fakeBody,
                    "receiver": "",
                    "token": fakeToken
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });


    });
    it('should respond status 400 when using an empty receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": fakeBody,
                    "token": fakeToken
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 200 when using a string as receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": fakeBody,
                    "receiver": "String",
                    "token": fakeToken
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 400 when using an integer as receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": fakeBody,
                    "receiver": 1234,
                    "token": fakeToken
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 400 when using an alphanumeric receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": fakeBody,
                    "receiver": "abcdefg",
                    "token": fakeToken
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 200 when using an number with + as receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": fakeBody,
                    "receiver": "+31612345678",
                    "token": fakeToken
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 200 when using a number in international format', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": fakeBody,
                    "receiver": "0031612345678",
                    "token": fakeToken
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
//Tests for token input
describe('Validation of token',()=>{
    it('should respond status 400 when using an "" as token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : ""
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 400 when using an empty token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 400 when using an integer as token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : 1234
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 200 when using a string as token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : fakeBody,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
//Tests for body input
describe('Validation of body',()=>{
    it('should respond status 400 when using an "" as body', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : "",
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 400 when using an empty body', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 200 when using a string as body', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : "Testeroni",
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('should respond status 400 when using an integer as body', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : 1234,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 400 when using 1001 characters as body', (done)=> {

        let longString = "";
        for (let i = 0; i < 1001; i++){
            longString += "a";
        }
        console.log(longString.length);
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : longString,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });
    it('should respond status 200 when using 1000 characters as body', (done)=> {

        let longString = "";
        for (let i = 0; i < 1000; i++){
            longString += "a";
        }
        console.log(longString.length);
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_sms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : fakePhoneNumber,
                    "body" : longString,
                    "receiver" : fakePhoneNumber,
                    "token" : fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });





});