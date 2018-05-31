# IFTTT-CM
IFTTT integration with CM.com's apps

## Developer Documentation IFTTT-CM

### 1 Introduction
Welcome to the developer documentation of the project of team IFTTT-CM about certain actions of CM, these actions have been published onto the IFTTT platform. Our API is also deployed on Heroku, where the data received from IFTTT will be redirected to CM.

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
#### 1.3 Sending your first POST request


## 2 IFTTT
If This Then That is a platform where users are able to configure own triggers, if a trigger is valid, a certain action will be performed by the platform. The actions and triggers can be configured by both users and developers of companies. However, developing certain actions will often require more information from a developer of a company.

#### 2.1 Authentication
To use the actions that have been published by team IFTTT-CM need certain information to work successful. CM requires a certain amount of data to successfully send a SMS via the Action Send SMS action. 

##### IFTTT POST request
```
METHOD: POST
URL: {{api_url_prefix}}/ifttt/v1/test/setup{{api_url_prefix}}/ifttt/v1/test/setup
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
