const UserService = require('../services/user');
const ProfileService = require('../services/profile');
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
    const data = req.query;

    try {
        const user_list = await UserService.userList(data)

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
        const user_data_list = await ProfileService.profileInfo(user_idx);

        const data = {
            userStructures: user_info,
            cardDataStructures: user_data_list
        }

        data ? Status.sendSuccessResponse(res, "유저 정보를 호출하였습니다.", data)
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

async function updateUser(req, res, next) {
    const { newValue, parentDataKey, itemIndex } = req.body;

    if (newValue) {
        if (newValue.company_name) {
            try {
                const update_profile = await ProfileService.updateProfile(newValue)
                update_profile ? Status.sendSuccessResponse(res, "성공적으로 수정되었습니다.", update_profile)
                            : Status.sendErrorResponse(res, "수정에 실패하였습니다.")
            } catch (error) {
                console.error('Error:', error);
                Status.sendErrorResponse(res, "서버 호출에 실패하였습니다.");
            }
        } else {
            try {
                newValue.birdh = new Date(newValue.birdh);

                const update_user = await UserService.updateUser(newValue)
                update_user ? Status.sendSuccessResponse(res, "성공적으로 수정되었습니다.", update_user)
                            : Status.sendErrorResponse(res, "수정에 실패하였습니다.")
            } catch (error) {
                console.error('Error:', error);
                Status.sendErrorResponse(res, "서버 호출에 실패하였습니다.");
            }
        }
    } else {
        Status.sendNotFoundResponse(res, "이름을 입력해주세요.")
    }
}

async function deleteUser(req, res, next) {
    const { profileCardId } = req.body;

    if (profileCardId) {
        try {
            const profileDelete = await ProfileService.deleteProfile(profileCardId)
            const userDelete = await UserService.deleteUser(profileCardId)

            if (userDelete || profileDelete) {
                Status.sendSuccessResponse(res, "성공적으로 삭제되었습니다.")
            } else {
                Status.sendErrorResponse(res, "삽입에 실패하였습니다.")
            }

        } catch (error) {
            console.error('Error:', error);
            Status.sendErrorResponse(res, "서버 호출에 실패하였습니다.");
        }
    } else {
        Status.sendNotFoundResponse(res, "유저를 선택해주세요.")
    }
}

module.exports = {
    userColumnList,
    userList,
    userInfo,
    addUser,
    updateUser,
    deleteUser
};