var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.use(require('chai-things'));

const assertArrays = require('chai-arrays');
chai.use(assertArrays)

var expect = require('chai').expect;
var app = 'https://gw.cmtelecom.com';

var kevin = '0031639023866';
var rudwan = '0031646227962';
var jim = '0031630273638'

describe("advanced tests", function() {
    describe("invalid receiver", function(){
        it("errorCode 201, messageErrorCode 303", function (done){
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
                                "content": "errorCode 201"
                            }
                        }
                        ]
                    }
                })
                .end(function (err, res) {
                    console.log(res.body.errorCode);
                    console.log(res.body.messages[0].messageErrorCode);

                    expect(res.body.errorCode).to.equal(201);
                    expect(res.body.messages[0].messageErrorCode).to.equal(303);
                    done();
                });
        })
    })
});