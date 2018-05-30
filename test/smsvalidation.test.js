const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

//Test constants
const validIftttKey = '12345';

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
                   "receiver" : "0031639023866",
                   "token" : "3ed143e9-1ed7-4ddf-9eda-a565031de843"
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
    it('should throw an error when using an string longer than 16 digits', (done)=> {

    });
    it('should throw an error when using more than 11 alphanumerical characters', (done)=> {

    });
    it('should respond status 200 when using 16 digits', (done)=> {

    });
    it('should respond status 200 when using 11 alphanumeric characters', (done)=> {

    });

    it('should throw an error when not providing a sender', (done)=> {

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

    });
    it('should throw an error when using an invalid token', (done)=> {

    });
    it('should respond status 200 when using a valid token', (done)=> {

    });
    it('should throw an error when not providing a token', (done)=> {

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