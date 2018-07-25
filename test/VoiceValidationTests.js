const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const localIftttKey = '12345';
const fakePhoneNumber = '0031612345678';
const fakeCMToken = '1t2o3k4e5n';
const fakeCMSharedKey = '1s2h3a4r5e6d7k8e9y';

//call should function for starting point
chai.should();

//Use chaiHttp to make request to this API
chai.use(chaiHttp);

describe('Validation of the actionFields key', () => {
    it('should respond status 400 when the actionFields key is not provided', (done) => {
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

    it('should respond status 200 when actionFields is provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "0031687654321",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "language": "nl",
                    "token": fakeCMToken,
                    "username": "sampleUsername",
                    "key": fakeCMSharedKey
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
    it('should throw an error when the sender field is empty', (done) => {
        chai.request(server)
            .post('api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "",
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken,
                    "username": "CMAvans2",
                    "key": fakeCMSharedKey
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
            })
    });

    //Check if field is present
    it('Should throw an error when the sender field is missing', (done) => {
        chai.request(server)
            .post('api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken,
                    "username": "CMAvans2",
                    "key": fakeCMSharedKey
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('Sender is empty.');
                done();
            });
    });

    //Check if single field

    //Check for datatype
    it('Should throw an error when using an incorrect field for sender', (done) => {
        chai.request(server)
            .post('api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": 1031612345678,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken,
                    "username": "CMAvans2",
                    "key": fakeCMSharedKey
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    //Check for only digids (correct input)
    it('Should not throw an error when providing a correct sender', (done) => {
        chai.request(server)
            .post('api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": fakePhoneNumber,
                    "body": "De man",
                    "receiver": fakePhoneNumber,
                    "language": "nl-NL",
                    "token": fakeCMToken,
                    "username": "CMAvans2",
                    "key": fakeCMSharedKey
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
