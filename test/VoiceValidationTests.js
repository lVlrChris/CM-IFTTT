const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const localIftttKey = '12345';
const fakePhoneNumber = '0031612345678';
const fakeCMToken = '0000000-0000-0000-0000-000000000000';
const fakeGUIDCMToken = '1234567-0000-0000-0000-000000000000';
//call should function for starting point
chai.should();

//Use chaiHttp to make request to this API
chai.use(chaiHttp);

describe('Validation of the actionFields key', () => {
    it('Should respond with status 400 when the actionFields key is not provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
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
                res.body.errors[0].message.should.equal('actionFields key not provided.')
                done();
            });
    });

    it('Should respond with status 200 when actionFields is provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "0031687654321",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "language": "nl",
                    "token": fakeCMToken
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
    it('Should respond with status 200 when providing a correct request', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "Validation test body",
                    "receiver": fakePhoneNumber,
                    "language": "nl",
                    "token": fakeCMToken
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
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "",
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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

    //Check for correct datatype
    it('Should respond with status 400 when the sender has an incorrect datatype', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": 123,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"sender" must be a string');
                done();
            });
    });

    //Check for only digits
    it('Should respond with status 400 when something other than digits in the sender', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber + "asdf",
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"senderToInt" must be a number');
                done();
            })
    });
});

describe('Validation of receiver', () => {

    //Check if field is empty
    it('Should respond with status 400 when the receiver field is empty', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": "",
                    "language": "nl-NL",
                    "token": fakeCMToken
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
    it('Should respond with status 400 when the receiver field is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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

    //Check if field has correct datatype
    it('Should respond with status 400 when the receiver has an incorrect datatype', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "0031612345678",
                    "body": "De man",
                    "receiver": 123,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"receiver" must be a string');
                done();
            });
    });

    //Check if field has only digits
    it('Should respond with status 400 when the receiver something other than digits in the receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": "0031612345678abc",
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"receiver" with value "0031612345678abc" fails to match the required pattern: /([+]?[0-9]+)$/');
                done();
            });
    });

    //Check if field has digits and a + sign
    it('Should respond with status 200 when providing a number with a + sign as receiver', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": "+31612345678",
                    "language": "nl-NL",
                    "token": fakeCMToken
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

    //Check if field is empty
    it('Should respond with status 400 when the body field is empty', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"body" is not allowed to be empty');
                done();
            });
    });

    //Check if field is present
    it('Should respond with status 400 when the body field is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"body" is not allowed to be empty');
                done();
            });
    });

    //Check if field has correct datatype
    it('Should respond with status 400 when the body has an incorrect datatype', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": 123,
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"body" must be a string');
                done();
            });
    });

    //Check if field had a 500 character limit
    it('Should respond with status 400 when the body is larger than 500 characters', (done) => {

        let longCharString = "";

        for (let i = 0; i < 501; i++) {
            longCharString += "a";
        }

        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": longCharString,
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"body" length must be less than or equal to 500 characters long');
                done();
            });
    });

    it('Should respond with status 200 when the body has exactly 500 characters', (done) => {

        let longCharString = "";

        for (let i = 0; i < 500; i++) {
            longCharString += "a";
        }
        console.log(longCharString.length);

        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": longCharString,
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });

    it('Should respond with status 200 when the body has less than 500 characters', (done) => {

        let longCharString = "";

        for (let i = 0; i < 499; i++) {
            longCharString += "a";
        }

        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": longCharString,
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken
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
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of language', () => {

    //Check if field is empty
    it('Should respond with status 400 when the language field is empty', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "",
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"language" is not allowed to be empty');
                done();
            });
    });

    //Check if field is missing
    it('Should respond with status 400 when the language field is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"language" is not allowed to be empty');
                done();
            });
    });

    //Check for correct datatype
    it('Should respond with status 400 when language had an incorrect datatype', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": 123,
                    "token": fakeCMToken
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
                res.body.errors[0].message.should.equal('"language" must be a string');
                done();
            });
    });
});

describe('Validation of token', () => {

    //Check if field is empty
    it('Should respond with status 400 when the token field is empty', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": ""
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
                res.body.errors[0].message.should.equal('"token" is not allowed to be empty');
                done();
            });
    });

    //Check if field is missing
    it('Should respond with status 400 when the token field is missing', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL"
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
                res.body.errors[0].message.should.equal('"token" is not allowed to be empty');
                done();
            });
    });

    //Check if field had correct datatype
    it('Should respond with status 400 when the token has an incorrect datatype', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": 123
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
                res.body.errors[0].message.should.equal('"token" must be a string');
                done();
            });
    });

    it('Should respond with status 400 when using an invalid CM token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeGUIDCMToken
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
                res.body.errors[0].message.should.equal('Authorization failed');
                done();
            });
    });

    it('Should respond with status 400 when using an invalid GUID token', (done)=> {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": 'zzzzzzzz-zzzzzz'
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
                res.body.errors[0].message.should.equal('Authorization failed');
                done();
            });
    });
});

