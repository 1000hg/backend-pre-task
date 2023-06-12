const UserService = require('../services/user');
const Status = require('../common/status')

async function userList(req, res, next) {
    try {
        const user_list = await UserService.userList(res)

        user_list ? Status.sendSuccessResponse(res, "리스트를 호출하였습니다.", user_list)
                : Status.sendNotFoundResponse(res, "리스트 호출에 실패하였습니다.");
    } catch (error) {
        console.error('Error:', error);
        Status.sendErrorResponse(res, "서버 호출에 실패하였습니다.");
    }
}

async function addUser(req, res, next) {
    let data = {}
    const name  = req.body.createTargetName;

    data.name = name;

    if (data) {
        try {
            const insert_user = await UserService.addUser(data)
            insert_user ? Status.sendSuccessResponse(res, "성공적으로 삽입되었습니다.", insert_user)
                        : Status.sendErrorResponse(res, "삽입에 실패하였습니다.")
        } catch (error) {
            console.error('Error:', error);
            Status.sendErrorResponse(res, "서버 호출에 실패하였습니다.");
        }
    } else {
        Status.sendNotFoundResponse(res, "이름을 입력해주세요.")
    }
}

module.exports = {
    userList,
    addUser
};