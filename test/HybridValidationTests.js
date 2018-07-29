
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const localIftttKey = '12345';
const fakePhoneNumber = '0031612345678';
const fakeCMToken = '1t2o3k4e5n';
const fakeAppKey = '1s2h3a4r5e6d7k8e9y';

//call should function for starting point
chai.should();

//Use chaiHttp to make request to this API
chai.use(chaiHttp);

describe('Validation of the actionFields key', () => {
    it('should respond with status 400 when the actionFields key is not provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "ifttt_source": {
                    "id": "2",
                    "url": "https://ifttt.com/myrecipes/personal/2"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('actionFields missing in body.');
                done();
            });
    });

    it('should respond with status 200 when actionFields is provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "0031687654321",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of correct input', () => {
    it('Should respond with status 200 when providing a correct sender', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of sender', () => {

    //Check if field is empty
    it('Should respond with status 400 when the sender field is empty', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "user": {
                    "timezone": "America/Los_Angeles"
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"sender" is not allowed to be empty');
                done();
            });
    });

    //Check if field is present
    it('Should respond with status 400 when the sender field is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"sender" is not allowed to be empty');
                done();
            });
    });

    //Check for correct datatype
    it('Should respond with status 400 when the sender has an incorrect datatype', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": 87654321,
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"sender" must be a string');
                done();
            });
    });

    //Check for special characters
    it('should respond status 200 when using an approved special character as sender', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "!#$%&'()*+,./:;<=>?@[]^_`{|}~",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
    it('should respond status 200 when using an approved special character as sender 2', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields" : {
                    "sender" : ",./:;<=>?@[",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
    it('should respond status 200 when using an approved special character as sender 3', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields" : {
                    "sender" : "]^_`{|}~",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of reveiver', () => {

    //Check if field is empty
    it('Should respond with status 400 when the receiver field is empty', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": "",
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "user": {
                    "timezone": "America/Los_Angeles"
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"receiver" is not allowed to be empty');
                done();
            });
    });

    //Check if field is missing
    it('Should respond with status 400 when the reveiver field is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"receiver" is not allowed to be empty');
                done();
            });
    });

    //Check if field has correct datatype
    it('Should respond with status 400 when the receiver has an incorrect datatype', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": 87654321,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"receiver" must be a string');
                done();
            });
    });



    //correct values
    it('Should not throw an error when providing a correct reveiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of body', () => {

    //incorrect values
    it('Should throw an error when using an incorrect variable for body', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": "0031687654321",
                    "body": 123456,
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //missing value
    it('Should throw an error when the body variable is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //correct values
    it('Should not throw an error when providing a correct body', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of token', () => {

    //incorrect values
    it('Should throw an error when using an incorrect variable for token', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": "0031687654321",
                    "body": "This is a test message",
                    "token": 123456,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //missing value
    it('Should throw an error when the token variable is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a test message",
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //correct values
    it('Should not throw an error when providing a correct token', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of appKey', () => {

    //incorrect values
    it('Should throw an error when using an incorrect variable for key', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": "0031687654321",
                    "body": "This is a test message",
                    "token": fakeCMToken,
                    "appKey": 123456
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //missing value
    it('Should throw an error when the key variable is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a test message",
                    "token": fakeCMToken,
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //correct values
    it('Should not throw an error when providing a correct key', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "appKey": fakeAppKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});