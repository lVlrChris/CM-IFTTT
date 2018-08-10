const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const smsEndpoint = "/api/ifttt/v1/actions/send_sms";
const validIftttKey = '12345';
const fakePhoneNumber = '0031612345678';
const fakeToken = process.env.TEST_KEY_TOKEN ||'0000000-0000-0000-0000-000000000000';
const fakeBody = "Testeroni";


//Using the chai package to call .should on responses
chai.should();

//Using chaiHttp to make http request to our api
chai.use(chaiHttp);

describe('Authorization tests', ()=>{
    it('should responds status 200 when using a correct IFTTT-ServiceKey', (done)=> {
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
    it('should responds status 400 when using an incorrect IFTTT-ServiceKey', (done)=> {
            chai.request(server)
                .post(smsEndpoint)
                .set('IFTTT-Service-Key', 1)
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
                    res.should.have.status(401);
                    res.body.should.have.property('errors');
                    res.body.errors[0].should.have.property('status');
                    res.body.errors[0].should.have.property('message');
                    res.body.errors[0].message.should.equal('Invalid channel key');
                    done();
                });
    });
    it('should responds status 400 when using an incorrect IFTTT-ServiceKey', (done)=> {
        chai.request(server)
            .post(smsEndpoint)
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
                res.should.have.status(401);
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('Invalid channel key');
                done();
            });
    });

});

