const UserService = require('../services/user');
const Status = require('../common/status')



async function addUser(req, res, next) {
    let data = {}
    const name  = req.body.createTargetName;

    data.name = name;

    if (data) {
        const insert_user = UserService.addUser(data)
        Status.sendSuccessResponse(res, "성공적으로 삽입되었습니다.", insert_user)
    } else {
        Status.sendNotFoundResponse(res, "이름이 없습니다.")
    }

    
}

module.exports = {
    addUser
};