const config = require('../config/config');

let authToken;

module.exports = {
    authorize(req, res, next) {

        //Save IFTTT state
        const iftttState = req.query.state;

        //Check Client ID match
        let clientMatch = false;
        if(req.query.client_id === config.oAuthID) {
            clientMatch = true;
        }

        //User login
        //Prompt user for IFTTT access
        let iftttAuthorized = true;

        let redirectURI = req.query.redirect_uri;
        if(iftttAuthorized && clientMatch) {
            //Generate authorization token
            authToken = 'notSoSecretToken';
            redirectURI += '?code=' + authToken + '&state=' + iftttState;
            res.redirect(redirectURI);
        } else {
            redirectURI += '?error=access_denied';
            res.redirect(redirectURI)
        }
    },

    token(req, res, next) {

        //Get request data
        const requestData = {
            grantType: req.body.grant_type,
            code: req.body.code,
            clientId: req.body.client_id,
            clientSecret: req.body.client_secret,
            redirectURI: req.body.redirect_uri
        };

        //Check grant type
        let isCorrectGrantType = false;
        if(requestData.grantType === 'authorization_code') isCorrectGrantType = true;
        //Check authorization token
        let isCorrectToken = false;
        if(requestData.code === authToken) isCorrectToken = true;
        //Check client id
        let isCorrectClientID = false;
        if(requestData.clientId === config.oAuthID) isCorrectClientID = true;
        //Check client secret
        let isCorrectClientSecret = false;
        if(requestData.clientSecret === config.oAuthID) isCorrectClientSecret = true;

        //Respond with token type and token
        if(isCorrectGrantType && isCorrectToken && isCorrectClientID && isCorrectClientSecret) {
            res.status(200).send(
                {
                    "token_type": "Bearer",
                    "access_token": "b29a71b4c58c22af116578a6be6402d3"
                }
            );
        }
    }
};