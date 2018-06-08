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

//Authentication tests?

describe('Validation of the actionFields key', () => {
    it('should throw an error when the actionFields key is not provided', (done) => {
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
                res.should.have.status(412);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.should.have.property('datetime');
                res.body.should.have.property('errorCode');
                done();
            });
    });

    it('should not throw an error when actionFields is provided', (done) => {
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
                    "sharedkey": fakeCMSharedKey
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
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('url');
            })
    })
});

//Tests for the input from a voice action
describe('Validation of instruction id', () => {
    //instruction id: alphanumeric, 64 chars, optional
    //incorrect values
    //missing value
    //missing key
    //correct values

});

describe('Validation of callee', () => {
    //callee: alphanumeric, 24 chars, required, international format
    //incorrect values
    //missing value
    //missing key
    //correct values

    it('should throw an error when not using a string as sender', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendvoice')
            .set('IFTTT-Service-Key', validIftttKey)
    });
});

describe('Validation of caller', () => {
    //caller: alphanumeric, 24 chars, required, international format
    //correct values
});

describe('Validation of callback-url', () => {
    //callback-url: alphanumeric, 256 chars, optional, callback url regex
    //correct values
});

describe('Validation of anonymous', () => {
    //anonymous: boolean, 1 char, optional
    //correct values
});

describe('Validation of prompt', () => {
    //prompt: alphanumeric, 500 chars, required
    //correct values
});

describe('Validation of prompt type', () => {
    //prompt-type: alphanumeric, 4 chars, optional, either TTS or File
    //correct values
});

describe('Validation of voice', () => {
    //voice: JSON, any size, optional,
    // requires language, gender and numer in JSON
    //correct values
});
