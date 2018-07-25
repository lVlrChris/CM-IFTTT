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
                console.log(res);
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
                console.log(res);
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
                console.log(res);
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