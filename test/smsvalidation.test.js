const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.should();
chai.use(chaiHttp);

describe('Validation of sender',()=>{
    it('should throw an error when using an int as sender', (done)=> {

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