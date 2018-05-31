const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const validIftttKey = '12345';
const fakePhoneNumber = '0031612345678';
//String of 160chars
const longString160Chars = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

//Using the chai package to call .should on responses
chai.should();

//Using chaiHttp to make http request to our api
chai.use(chaiHttp);

//Tests for sender input
describe('Validation of sender',()=>{
    it('should throw an error when using an int as sender', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
               "actionFields" : {
                   "sender" : 123,
                   "body" : "testBody",
                   "receiver" : fakePhoneNumber,
                   "token" : "939DA045-26F7-461F-90FF-C41969F81057"
               },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.should.have.property('datetime');
                res.body.should.have.property('errorCode');
                done();
            });
    });
    it('should NOT throw an error when using an string smaller than 16 digits', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : '123',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }

            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should NOT throw an error when using more than 11 alphanumerical characters', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'abcdefghijklmnopqrstuvwx',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond status 200 when using 16 digits', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : '1234567890123456',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond status 200 when using more than 16 digits', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : '1234567890123456789',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond status 200 when using 11 alphanumeric characters', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'abc123abc12',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond status 200 when using more than 11 alphanumeric characters', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'abc123abc1234567',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should throw an error when not providing a sender', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.should.have.property('datetime');
                res.body.should.have.property('errorCode');
                done();
            });
    });
});
//Tests for receiver input
describe('Validation of receiver',()=>{
    it('should throw an error when using an int as receiver', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'test',
                    "body" : "testBody",
                    "receiver" : 0,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                res.body.should.have.property('message');
                res.body.should.have.property('datetime');
                res.body.should.have.property('errorCode');
                res.should.be.json;
                done();
            });
    });
    it('should respond status 200 when using a international format number string', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : '1234567890123456789',
                    "body" : "testBody",
                    "receiver" : "0031612345678",
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should throw an error when not providing a receiver', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : '1234567890123456789',
                    "body" : "testBody",
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                res.body.should.have.property('message');
                res.body.should.have.property('datetime');
                res.body.should.have.property('errorCode');
                res.should.be.json;
                done();
            });
    });
});
//Tests for token input
describe('Validation of token',()=>{
    it('should throw an error when using an int as token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'sender',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : 0
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.should.have.property('datetime');
                res.body.should.have.property('errorCode');
                done();
            });
    });
    it('should respond status 200 when using a valid token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'sender',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : '939DA045-26F7-461F-90FF-C41969F81057'
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
    it('should throw an error when not providing a token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'sender',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.should.have.property('datetime');
                res.body.should.have.property('errorCode');
                done();
            });
    });
});
//Tests for body input
describe('Validation of body',()=>{
    it('should throw an error when using an int as body', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'sender',
                    "body" : 0,
                    "receiver" : fakePhoneNumber,
                    "token" : '939DA045-26F7-461F-90FF-C41969F81057'
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                done();
            });
    });
    it('should throw an error when using a body longer than 160chars', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'sender',
                    "body" : longString160Chars,
                    "receiver" : fakePhoneNumber,
                    "token" : '939DA045-26F7-461F-90FF-C41969F81057'
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                done();
            });
    });
    it('should respond status 200 when using a string body smaller than 160 chars', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'sender',
                    "body" : "uno",
                    "receiver" : fakePhoneNumber,
                    "token" : '939DA045-26F7-461F-90FF-C41969F81057'
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
    it('should throw an error when not providing a body', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'sender',
                    "receiver" : fakePhoneNumber,
                    "token" : '939DA045-26F7-461F-90FF-C41969F81057'
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(412);
                done();
            });
    });
});