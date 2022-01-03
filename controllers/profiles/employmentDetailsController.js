const Services = require('../../services')

const getEmploymentDetails = async (req, res) => {
    let userId = req.query.userId;

    let userIdValidation = await Services.userService.validateUser(userId);
    if (typeof(userIdValidation) == 'string'){
        res.status(400).send({code: 1, errMsg: userIdValidation})
    } else {

        let employmentDetails = await Services.employmentDetailsService.getEmploymentDetails(userId);

        if (employmentDetails != null){
            res.send({result: employmentDetails});
        } else {
            res.status(204).send(); 
        }
    }
}


const insertEmploymentDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let employmentDetails = await Services.employmentDetailsService.getEmploymentDetails(userId);

        if (employmentDetails != null){
          
            res.status(400).send({code: 1, errMsg: "User employment details already exist."})
        } else {    
            let employmentDetailsDoc = {userId: userId};    
            employmentDetailsDoc = await Services.employmentDetailsService.insertEmploymentDetails(employmentDetailsDoc);            
            res.status(200).send({code: 0});
        }
    }
}


const updateEmploymentDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let employmentDetails = await Services.employmentDetailsService.getEmploymentDetails(userId);

        if (employmentDetails != null){
            let employmentDetailsDoc = employmentDetails;
            employmentDetailsDoc = await Services.employmentDetailsService.updateEmploymentDetails(userId,employmentDetailsDoc);            
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User employment record does not exist to update."})
        }
    }
}


const deleteEmploymentDetails = async (req, res) => {
    
    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let employmentDetails = await Services.employmentDetailsService.getEmploymentDetails(userId);

        if (employmentDetails != null){
            await Services.employmentDetailsService.removeEmploymentDetailsDoc(userId);
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User employment record does not exist to delete."})
        }
    }    
}

module.exports = {getEmploymentDetails, insertEmploymentDetails, updateEmploymentDetails, deleteEmploymentDetails}