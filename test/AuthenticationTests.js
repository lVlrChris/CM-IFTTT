const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Using the chai package to call .should on responses
chai.should();

//Using chaiHttp to make http request to our api
chai.use(chaiHttp);

describe('test', ()=>{
    it('should test ', function () {
        
    });
});

