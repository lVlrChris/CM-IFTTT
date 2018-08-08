const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const validIftttKey = '12345';
const contactEndpoint = '/api/ifttt/v1/actions/add_contact';
const fakePhoneNumber = '0031612345678';
const fakeToken = '0000000-0000-0000-0000-000000000000';
const fakeMAil = "Testeroni@test.test";
const fakeLastname = "Klaas";
const fakeFirstname = "Jan-Peter";
const fakeAccountId = '0000000-0000-0000-0000-000000000000';
const fakeGroupId = '0000000-0000-0000-0000-000000000000';
const fakeInsertion = "van";


//call should function for starting point
chai.should();

//Use chaiHttp to make request to this API
chai.use(chaiHttp);

describe('Validation of the actionFields key', () => {
    it('should respond status 400 when the actionFields key is not provided', (done) => {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('actionFields missing in body.');
                done();
            });
    });
    it('should respond status 200 when actionFields is provided', (done) => {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
                },
                "ifttt_source" : {
                    "id" : "test",
                    "url" : "test"
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

describe('Validation of firstname', ()=>{
    it('should respond status 400 when using an "" as firstname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": "",
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"firstName" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an empty firstname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "groupID": fakeGroupId,
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
                res.body.errors[0].message.should.equal('"firstName" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 200 when using a string as firstname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                done();
            });
    });
    it('should respond status 400 when using an integer as firstname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": 1234,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"firstName" must be a string');
                done();
            });
    });
});

describe('Validation of insertion', ()=>{
    it('should respond status 200 when using an "" as insertion', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": "",
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                done();
            });
    });
    it('should respond status 200 when using an empty insertion', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                done();
            });
    });
    it('should respond status 400 when using an integer as insertion', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": 1234,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"insertion" must be a string');
                done();
            });
    });
    it('should respond status 200 when using a string as insertion', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": "insertion",
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                done();
            });
    });
});

describe('Validation of lastname', ()=>{
    it('should respond status 400 when using an "" as lastname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": "",
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"lastName" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an empty lastname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"lastName" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an integer as lastname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": 1234,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"lastName" must be a string');
                done();
            });
    });
    it('should respond status 200 when using an string as lastname', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": "string",
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                done();
            });
    });
});

describe('Validation of phonenumber', ()=>{
   it('should respond status 400 when using an "" as phonenumber', (done)=>  {
       chai.request(server)
           .post(contactEndpoint)
           .set('IFTTT-Service-Key', validIftttKey)
           .send({
               "actionFields": {
                   "email": fakeMAil,
                   "firstName": fakeFirstname,
                   "lastName": fakeLastname,
                   "insertion": fakeInsertion,
                   "groupID": fakeGroupId,
                   "phoneNumber": "",
                   "accountID": fakeAccountId,
                   "token": fakeToken
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
               res.body.should.have.property('errors');
               res.body.errors[0].should.have.property('status');
               res.body.errors[0].should.have.property('message');
               res.body.errors[0].message.should.equal('"phoneNumber" is not allowed to be empty');
               done();
           });
   });
   it('should respond status 400 when using an empty phonenumber', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"phoneNumber" is not allowed to be empty');
                done();
            });
    });
   it('should respond status 400 when using an integer as phonenumber', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": 1234,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"phoneNumber" must be a string');
                done();
            });
    });
   it('should respond status 200 when using an string as phonenumber', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": "string",
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                done();
            });
    });
});

describe('Validation of email', ()=>{
    it('should respond status 400 when using an "" as email', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": "",
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"email" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an empty email', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"email" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an integer as email', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": 1234,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"email" must be a string');
                done();
            });
    });
    it('should respond status 200 when using an string as email', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": "string",
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                done();
            });
    });
});

describe('Validation of account id', ()=> {
    it('should respond status 400 when using an "" as accountid', (done) => {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": "",
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"accountId" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an empty accountid', (done) => {
            chai.request(server)
                .post(contactEndpoint)
                .set('IFTTT-Service-Key', validIftttKey)
                .send({
                    "actionFields": {
                        "email": fakeMAil,
                        "firstName": fakeFirstname,
                        "lastName": fakeLastname,
                        "insertion": fakeInsertion,
                        "groupID": fakeGroupId,
                        "phoneNumber": fakePhoneNumber,
                        "token": fakeToken
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
                    res.body.should.have.property('errors');
                    res.body.errors[0].should.have.property('status');
                    res.body.errors[0].should.have.property('message');
                    res.body.errors[0].message.should.equal('"accountId" is not allowed to be empty');
                    done();
                });
        });
    it('should respond status 400 when using an integer accountid', (done) => {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": 1234,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"accountId" must be a string');
                done();
            });
    });
    it('should respond status 200 when using an string as accountid', (done) => {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": "string",
                    "token": fakeToken
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
                done();
            });
    });
});

describe('Validation of group id', ()=>{
    it('should respond status 400 when using an "" as groupid', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": "",
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"groupId" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an empty groupid',  (done)=> {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"groupId" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an integer as groupid',  (done)=> {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "groupID" : 1234,
                    "token": fakeToken
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"groupId" must be a string');
                done();
            });
    });
    it('should respond status 200 when using an string as groupid',  (done)=> {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "groupID" : "string",
                    "token": fakeToken
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
                done();
            });
    });
});

describe('Validation of token', ()=>{
    it('should respond status 400 when using an "" as token', (done)=>  {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "groupID": fakeGroupId,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"token" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an empty token',  (done)=> {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "groupID" : "string"
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"token" is not allowed to be empty');
                done();
            });
    });
    it('should respond status 400 when using an integer as token',  (done)=> {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "groupID" : fakeGroupId,
                    "token": 1234
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
                res.body.should.have.property('errors');
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                res.body.errors[0].message.should.equal('"token" must be a string');
                done();
            });
    });
    it('should respond status 200 when using an string as token',  (done)=> {
        chai.request(server)
            .post(contactEndpoint)
            .set('IFTTT-Service-Key', validIftttKey)
            .send({
                "actionFields": {
                    "email": fakeMAil,
                    "firstName": fakeFirstname,
                    "lastName": fakeLastname,
                    "insertion": fakeInsertion,
                    "phoneNumber": fakePhoneNumber,
                    "accountID": fakeAccountId,
                    "groupID" : fakeGroupId,
                    "token": fakeToken
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
                done();
            });
    });
});

