# IFTTT-CM
IFTTT integration with CM.com's apps

[![Build Status](https://travis-ci.com/lVlrChris/CM-IFTTT.svg?branch=master)](https://travis-ci.com/lVlrChris/CM-IFTTT)

## Developer Documentation IFTTT-CM

## §1 Introduction
Welcome to the developer documentation of the project of team IFTTT-CM about certain actions of CM, these actions have been published onto the IFTTT platform. There is also a proxy API that is deployed on Heroku. The goal is to deploy your own API on Heroku, where the data that is received from an IFTTT applet and API, will be redirected to CM, via your own API proxy. 

Via your own API proxy and IFTTT applet, it is possible to publish new actions, since the CM actions that are currently published by the IFTTT-CM team are the following three actions:
* Sending an SMS
* Sending a voice call
* Sending a payment link

For configuring your own API and an IFTTT applet, you will need the to sign up for an account on the website of [CM](https://www.cm.com/). After signing up, you will receive an unique token, this token is necessary for developing and maintaining certain CM applets that you can develop and publish on the IFTTT platform.

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
After running the server, you can validate the use of a correct key by sending the following request:
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

### For more information check out our wiki

### The Team
* **Rudwan Akhiat** - [Profile](https://github.com/rudwan97)
* **Jan Belterman** - [Profile](https://github.com/JanBelterman)
* **Chris Boer** - [Profile](https://github.com/lVlrChris)
* **Floris Botermans** - [Profile](https://github.com/FlorisBotermans)
* **Floris van Broekhoven** - [Profile](https://github.com/Davilicus)
* **Kevin van Loon** - [Profile](https://github.com/KevinvanLoon)
* **Jim van Zuidam** - [Profile](https://github.com/JvZuidam)

See also the list of [contributors](https://github.com/lVlrChris/IFTTT-CM/contributors) who participated in this project.
