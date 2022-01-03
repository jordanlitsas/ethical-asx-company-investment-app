const Models = require('../../models');
const ObjectId = require('mongoose').Types.ObjectId;

const getUserWithUserId = async (userId) => {
    let user = Models.users.findById(userId);
    return user;
}


/*
    calling findWithId() with an invalid ObjectId causes a cast error.
    ensures given userId is a valid ObjectId for validating request to change documents that link user's user doc _id value to a specific end user
*/
const validateUser = async (userId) => {
    let validUserId = ObjectId.isValid(userId);
    if (validUserId){
        let user = await getUserWithUserId(userId);
        if (!user){
            return "userId is not associated with a user."
        }
    } else {
        return "Invalid ObjectId structure."
    }
    return true;
}
module.exports = {getUserWithUserId, validateUser};