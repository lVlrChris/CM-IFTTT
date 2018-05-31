# IFTTT-CM
IFTTT integration with CM.com's apps

## Developer Documentation IFTTT-CM

## §1 Introduction
Welcome to the developer documentation of the project of team IFTTT-CM about certain actions of CM, these actions have been published onto the IFTTT platform. There is also a proxy API that is deployed on Heroku. The goal is to deploy your own API on Heroku, where the data that is received from a IFTTT applet will be redirected to CM, via your own API proxy. 

Via your own API proxy and IFTTT applet, it is possible to publish new actions, since the actions that are currently published by the IFTTT-CM team are only the following three:
* Sending a SMS
* Sending a voice call
* Sending a payment link

For configuring your own API and an IFTTT applet, you will need the to sign up for an account on the website of [CM](https://www.cm.com/). Once you are signed up onto their service, you will receive a unique token, this token is necessary for developing and maintaining a send SMS applet that you can develop and publish on the IFTTT platform.

It is also required to have an account on the IFTTT website, you can easily [sign up](https://ifttt.com/join) on their website.

#### 1.1 Installation
Clone the repository from GitHub by using the following command:
```
$ git clone https://github.com/lVlrChris/IFTTT-CM
```
After succesfully cloning the repository, make sure that you have installed the correct Node packages, by using the following command:
```
$ npm install
```

#### 1.2 Configuring IFTTT-CM
In order to run the server on the local device, it is recommended to use Nodemon, however, it is also possible to start the server via Node, but it is recommended to use Nodemon for maxmimum productivity.
To run the server, make sure that you follow these instructions:
```
$ nodemon index.js
```
Or when using Node:
```
$ node index.js
```
#### 1.3 Sending your first GET request
After running the server, you can validate if you are using a correct key by sending the following request:
```
Method: GET
Endpoint URL: localhost:3000/api/ifttt/v1/status
````
You will also need the following header information in order to check if the key is valid:
```
Content-Type: application/json
IFTTT-Service-Key: 12345
```
After sending the request, you should receive a status *200 OK* and a body that looks exactly like this:
```
Valid key
```
Great, so now that your own server is running, it is time for the real stuff!

## §2 IFTTT
If This Then That is a platform where users are able to configure own triggers, if a trigger is valid, a certain action will be performed by the platform. The actions and triggers can be configured by both users and developers of companies. However, developing certain actions will often require more information from a developer of a company.

As mentioned in [section 1](https://github.com/lVlrChris/IFTTT-CM/tree/development#1-introduction), make sure that you have succesfully signed up for an account on IFTTT, so that you are able to publish your applet on their website.  

#### 2.1 Authentication
To use the actions that have been published by team IFTTT-CM need certain information to work successful. CM requires a certain amount of data to successfully send a SMS via the Action Send SMS action. IFTTT requires a IFTT-Service-Key to use their API, once you register your own applet, you should recive an unique IFTTT-Service-Key. 
For local testing, we will use the *12345* IFTTT-Service-Key just like we did in [subsection 1.3](https://github.com/lVlrChris/IFTTT-CM/tree/development#13-sending-your-first-post-request).

##### IFTTT POST request
In order to test if our API is able to send an IFTTT-like body, we need to verify if it is possible to successfully post a request by using our IFTTT-Service-Key. 
The endpoint URL and method for testing are:
```
METHOD: POST
Endpoint URL: {{api_url_prefix}}/ifttt/v1/test/setup{{api_url_prefix}}/ifttt/v1/test/setup
```
With the following header:
```
Content-Type: application/json
IFTTT-Service-Key: 12345
```
In our case this will be the following request:
```
Method: POST
Endpoint URL: localhost:3000/api/ifttt/v1/test/setup
```
If succesfull, you should receive a status: *200 OK*, followed by the following body as a response:
```
{
    "data": {
        "samples": {
            "actions": {
                "sendsms": {
                    "sender": "Jan",
                    "body": "De man",
                    "receiver": "0031612345678",
                    "token": "XeQ9D7IjomnZWMsjuHDgLhyEvYLvwAoAdJRyzF2odxspOvU90ci4lsRijfTAvR9y"
                }
            }
        }
    },
    "code": 200
}
```

#### 2.2 IFTTT-CM Api
Our team has developed an own Api that is available on Heroku. 
The api is deployed on the following Heroku website:
```
https://ifttt-cm.herokuapp.com/
```

### The Team
* **Rudwan Akhiat** - *Git Destroyer* - [IFTTT-CM](https://github.com/rudwan97)
* **Jan Belterman** - *Boss* - [IFTTT-CM](https://github.com/JanBelterman)
* **Chris Boer** - *CEO of IFTTT-CM/Postmaster* - [IFTTT-CM](https://github.com/lVlrChris)
* **Floris Botermans** - *Koffiejongen* - [IFTTT-CM](https://github.com/FlorisBotermans)
* **Floris van Broekhoven** - *Code Wizard* - [IFTTT-CM](https://github.com/Davilicus)
* **Kevin van Loon** - *Lead Senior Experienced Developer* - [IFTTT-CM](https://github.com/KevinvanLoon)
* **Jim van Zuidam** - *Executive Executer* - [IFTTT-CM](https://github.com/JvZuidam)

See also the list of [contributors](https://github.com/lVlrChris/IFTTT-CM/contributors) who participated in this project.
