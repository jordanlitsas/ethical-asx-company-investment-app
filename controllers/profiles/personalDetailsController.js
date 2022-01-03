const Services = require('../../services')

const getPersonalDetails = async (req, res) => {
    let userId = req.query.userId;

    let userIdValidation = await Services.userService.validateUser(userId);
    if (typeof(userIdValidation) == 'string'){
        res.status(400).send({code: 1, errMsg: userIdValidation})
    } else {

        let personalDetails = await Services.personalDetailsService.getPersonalDetails(userId);

        if (personalDetails != null){
            res.send({result: personalDetails});
        } else {
            res.status(204).send(); 
        }
    }
}


const insertPersonalDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let personalDetails = await Services.personalDetailsService.getPersonalDetails(userId);

        if (personalDetails != null){
          
            res.status(400).send({code: 1, errMsg: "User personal details already exist."})
        } else {    
            let personalDetailsDoc = {userId: userId};    
            personalDetailsDoc = await Services.personalDetailsService.insertPersonalDetails(personalDetailsDoc);            
            res.status(200).send({code: 0});
        }
    }
}


const updatePersonalDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let personalDetails = await Services.personalDetailsService.getPersonalDetails(userId);

        if (personalDetails != null){
            let personalDetailsDoc = personalDetails;
            personalDetailsDoc = await Services.personalDetailsService.updatePersonalDetails(userId,personalDetailsDoc);            
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User personal record does not exist to update."})
        }
    }
}


const deletePersonalDetails = async (req, res) => {
    
    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let personalDetails = await Services.personalDetailsService.getPersonalDetails(userId);

        if (personalDetails != null){
            await Services.personalDetailsService.removePersonalDetailsDoc(userId);
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User personal record does not exist to delete."})
        }
    }    
}

module.exports = {getPersonalDetails, insertPersonalDetails, updatePersonalDetails, deletePersonalDetails}