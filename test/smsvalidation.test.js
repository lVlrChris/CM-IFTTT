const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

//Test constants
const validIftttKey = '12345';
const fakePhoneNumber = '0031612345678'
const phoneNumberKevin = '0031639023866'

chai.should();
chai.use(chaiHttp);


//TODO: Discuss if we have to make testcases for using special characters in a request
describe('Validation of sender',()=>{
    it('should throw an error when using an int as sender', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
               "actionFields" : {
                   "sender" : 1234,
                   "body" : "testBody",
                   "receiver" : fakePhoneNumber,
                   "token" : "939DA045-26F7-461F-90FF-C41969F81057"
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
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond status 200 when more than 16 digits', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : '1234567890123456789',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
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
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond status 200 when using more than11 alphanumeric characters', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendsms')
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields" : {
                    "sender" : 'abc123abc1234567',
                    "body" : "testBody",
                    "receiver" : fakePhoneNumber,
                    "token" : "939DA045-26F7-461F-90FF-C41969F81057"
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

//TODO: Discuss how to validate a mobile phone number
describe('Validation of receiver',()=>{
    it('should throw an error when using an int as receiver', (done)=> {

    });
    it('should respond status 200 when using a international format number string', (done)=> {

    });
    it('should throw an error when not providing a sender', (done)=> {

    });
});

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
   // it('should throw an error when using an invalid token', (done)=> {
        // chai.request(server)
        //     .post('/api/ifttt/v1/actions/sendsms')
        //     .set('IFTTT-Service-Key', validIftttKey)
        //     .send({
        //         "actionFields" : {
        //             "sender" : 'test',
        //             "body" : "testBody",
        //             "receiver" : invalidPhonenumber,
        //             "token" : "12345678-12345678-12344567-12344566-123323445"
        //         }
        //     })
        //     .end(function (err, res) {
        //         res.should.have.status(412);
        //         res.should.be.json;
        //         res.body.should.have.property('message');
        //         res.body.should.have.property('datetime');
        //         res.body.should.have.property('errorCode');
        //         done();
        //     });
   // });
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
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
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

describe('Validation of content',()=>{
    it('should throw an error when using an int as content', (done)=> {

    });
    it('should throw an error when using a content longer than 160chars', (done)=> {

    });
    it('should respond status 200 when using a string content smaller than 160 chars', (done)=> {

    });
    it('should throw an error when not providing a content', (done)=> {

    });
});