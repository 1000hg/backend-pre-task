const UserService = require('../services/user');
const Status = require('../common/status')

async function userColumnList(req, res, next) {
    try {
        const user_column_list = await UserService.userColumnList(res);
        
        user_column_list ? Status.sendSuccessResponse(res, "컬럼 리스트를 호출하였습니다.", user_column_list)
                : Status.sendNotFoundResponse(res, "컬럼 리스트 호출에 실패하였습니다.");
    } catch (error) {
        console.error('Error:', error);
        Status.sendErrorResponse(res, "서버 호출에 실패하였습니다.");
    }
}


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

async function userInfo(req, res, next) {
    const user_idx = req.params.user_idx;
    try {
        const user_info = await UserService.userInfo(user_idx)

        user_info ? Status.sendSuccessResponse(res, "유저 정보를 호출하였습니다.", user_info)
                : Status.sendNotFoundResponse(res, "유저 정보 호출에 실패하였습니다.");
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
            const insert_user = await UserService.addUser(res, data)
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
    userColumnList,
    userList,
    userInfo,
    addUser
};