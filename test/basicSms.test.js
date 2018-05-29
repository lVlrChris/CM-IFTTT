var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
var app = 'https://gw.cmtelecom.com';

var kevin = '0031639023866';
var rudwan = '0031646227962';
var jim = '0031630273638'

describe("Sending basic SMS", function() {
    describe("Send SMS", function() {
        it("Status 200", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/v1.0/message')
                .send({
                    "messages": {
                        "authentication": {
                            "producttoken": "3ed143e9-1ed7-4ddf-9eda-a565031de843"
                        },
                        "msg": [ {
                            "from": rudwan,
                            "to": [{
                                "number": rudwan
                            }],
                            "body": {
                                "content": "200 test"
                            }
                        }
                        ]
                    }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });

    });

    describe("SMS content is invalid/invalid account or token", function(){
        it("Status 400", function (done){
            chai.request(app)
                .post('/v1.0/message')
                .send({
                    "messages": {
                        "authentication": {
                            "producttoken": "42069/42069"
                        },
                        "msg": [ {
                            "from": rudwan,
                            "to": [{
                                "number": jim
                            }],
                            "body": {
                                "content": "Ayy"
                            }
                        }
                        ]
                    }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        })
    })

    describe("", function(){
        it("errorCode 201", function (done){
            // this.timeout(10000);
            const expectedResult = {
                "details": "Created 0 message(s)",
                "errorCode": 201,
                "messages": [
                    {
                        "to": "invalid",
                        "status": "Rejected",
                        "reference": null,
                        "parts": 0,
                        "messageDetails": "Gsm 'invalid' is not a number.",
                        "messageErrorCode": 303
                    }
                ]
            };
            chai.request(app)
                .post('/v1.0/message')
                .send({
                    "messages": {
                        "authentication": {
                            "producttoken": "3ed143e9-1ed7-4ddf-9eda-a565031de843"
                        },
                        "msg": [ {
                            "from": "00316346227962",
                            "to": [{
                                "number": "invalid"
                            }],
                            "body": {
                                "content": "errorCode 201, messageErrorCode 303"
                            }
                        }
                        ]
                    }
                })
                .end(function (err, res) {
                    console.log(res.body)
                    expect(res.body).to.eql(expectedResult);
                    done();
                });
        })
    })
});