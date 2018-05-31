# IFTTT-CM
IFTTT integration with CM.com's apps

## Developer Documentation IFTTT-CM

## §1 Introduction
Welcome to the developer documentation of the project of team IFTTT-CM about certain actions of CM, these actions have been published onto the IFTTT platform. There is also a proxy API that is deployed on Heroku. The goal is to deploy your own API on Heroku, where the data that is received from a IFTTT applet and API will be redirected to CM, via your own API proxy. 

Via your own API proxy and IFTTT applet, it is possible to publish new actions, since the CM actions that are currently published by the IFTTT-CM team are only the following three:
* Sending an SMS
* Sending a voice call
* Sending a payment link

For configuring your own API and an IFTTT applet, you will need the to sign up for an account on the website of [CM](https://www.cm.com/). After signing up, you will receive a unique token, this token is necessary for developing and maintaining certain CM applets that you can develop and publish on the IFTTT platform.

It is also required to have an account on the IFTTT website, you can easily [sign up](https://ifttt.com/join) on their website.

#### 1.1 Installation
Clone the repository from GitHub by using the following command:
```
$ git clone https://github.com/lVlrChris/IFTTT-CM
```
After successfully cloning the repository, make sure that you have installed the correct Node packages, by using the following command:
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

As mentioned in [section 1](https://github.com/lVlrChris/IFTTT-CM/tree/development#1-introduction), make sure that you have successfully signed up for an account on IFTTT, so that you are able to publish your applet on their website.  

#### 2.1 Authentication
To use the actions that have been published by team IFTTT-CM you will need certain information to perform the actions without any issues. CM requires a certain amount of data to successfully send an SMS via the Action Send SMS action. And IFTTT requires a IFTT-Service-Key to use their API, once you register your own applet, you should recive an unique IFTTT-Service-Key. 
For local testing, we will use the *12345* IFTTT-Service-Key just like we did in [subsection 1.3](https://github.com/lVlrChris/IFTTT-CM/tree/development#13-sending-your-first-get-request).

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
Great, now that we have covered the basic validation of the IFTTT-Service-Key, it is time to continue our journey. The real deal is about actually using and configuring your own actions. Fortunately, we are able to use the Send SMS Action, since that has already been configured by the IFTTT-CM team.

#### 2.2 Sending an SMS 
In order to send an SMS, it is necessary that you have an account on CM.com, since this is required to be able to use their API related SMS functions. 

So, when we think about an SMS, it is quite obvious, that we need atleast a sender and a receiver to be able to send and receive a message. However, there is more to that.
 
Actually, just like we mentioned in [section 1](https://github.com/lVlrChris/IFTTT-CM/tree/development#1-introduction) and [subsection 2.1](https://github.com/lVlrChris/IFTTT-CM/tree/development#21-authentication), we need the IFTTT-Service-Key. Also, it is not really an SMS without actually sending a message, since an empty SMS is actually not an SMS.
If you think about it, without a body, what really is the point of an SMS? 

So to sum things up, we need the following information to actually send an SMS:
* Sender
* Body
* Receiver
* IFTTT-Service-Key

##### The SMS POST request

Well, let's get to it, shall we?
The endpoint for sending an SMS is a bit different than before, since we are now actually 'using an action', instead of just verifying information.
```
Method: POST
Endpoint URL: localhost:3000/api/ifttt/v1/actions/sendsms
```
And the header (just like we did before):
```
Content-Type: application/json
IFTTT-Service-Key: 12345

```
It should be clear by now that we are sending the requests via our own server, hence the use of *localhost:3000*.
It is also worth mentioning that we need to use *actionFields* in the request of our body, since this is how the IFTTT API deals with received information. Right now, the body should be something like this:
```
{
  "actionFields": {
    "sender": "Jan",
    "body": "De man",
    "receiver": "0031612345678",
    "token": "12345"
  }
}
```
You should receive the following, disappointing, response:
(with a *200 OK* status)
```
{
    "data": [
        {
            "id": "no id"
        }
    ]
}
```
That is, because the IFTTT API requires even more information in order to successfully send an SMS. The so called 'metadata' that is required, looks like this:
```
"ifttt_source": {
    "id": "0057ee44c3d63c10",
    "url": "http://example.com/0057ee44c3d63c10"
  }
```
The so called ID and URL are required to validate an request for a certain response/action. When we do not provide these two fields, the API on IFTTT's side will simply not be able to verify this information.
When we add the information to our body and send a new request, we get this:
```
{
  "actionFields": {
    "sender": "Jan",
    "body": "De man",
    "receiver": "0031612345678",
    "token": "12345"
  },
  "ifttt_source": {
    "id": "0057ee44c3d63c10",
    "url": "http://example.com/0057ee44c3d63c10"
  }
}
```
That does look a lot better, doesn't it? 
Let us take a look at the response with a *200 OK* status:
```
{
    "data": [
        {
            "id": "0057ee44c3d63c10",
            "url": "http://example.com/0057ee44c3d63c10"
        }
    ]
}
```
It works! You just sent an SMS.

#### 2.3 IFTTT-CM Api
Our team has developed an own Api that is available on Heroku. 
The API is deployed on the following Heroku website:
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
