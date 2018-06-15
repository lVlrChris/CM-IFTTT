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
    it('should throw an error when the actionFields key is not provided', (done) => {
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
                done();
            });
    });

    it('should not throw an error when actionFields is provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "0031687654321",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "key": fakeAppKey
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

    //incorrect values
    it('Should throw an error when using an incorrect variable for sender', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "0031687654321",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "key": fakeAppKey
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //missing value
    it('Should throw an error when the sender variable is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "key": fakeAppKey
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //correct values
    it('Should not throw an error when providing a correct sender', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "key": fakeAppKey
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

describe('Validation of reveiver', () => {

    //incorrect values
    it('Should throw an error when using an incorrect variable for reveiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": "0031687654321",
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "key": fakeAppKey
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //missing value
    it('Should throw an error when the reveiver variable is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_hybrid_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "This is a sample message",
                    "token": fakeCMToken,
                    "key": fakeAppKey
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
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
                    "key": fakeAppKey
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
                    "key": fakeAppKey
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
                res.should.have.status(412);
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
                    "key": fakeAppKey
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
                res.should.have.status(412);
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
                    "key": fakeAppKey
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
                    "key": fakeAppKey
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
                res.should.have.status(412);
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
                    "key": fakeAppKey
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
                res.should.have.status(412);
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
                    "key": fakeAppKey
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


describe('Validation of key', () => {

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
                    "key": 123456
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
                res.should.have.status(412);
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
                res.should.have.status(412);
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
                    "key": fakeAppKey
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