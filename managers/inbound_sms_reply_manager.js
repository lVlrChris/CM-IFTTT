

module.exports = {
    setSmsReply(req, res, next) {

        //Gather data
        console.log(req.body.MESSAGES.MSG);
        //console.log(req);

        //Create object from data

        //Enter object into db

        res.sendStatus(200);
    }
};