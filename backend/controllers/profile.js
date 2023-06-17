const ProfileService = require('../services/profile');
const Status = require('../common/status')

async function addProfile(req, res, next) {
    const data  = req.body;

    data.newValue.user_idx = data.profileCardId

    if (data) {
        try {
            const insert_profile = await ProfileService.addProfile(data.newValue)
            insert_profile ? Status.sendSuccessResponse(res, "성공적으로 삽입되었습니다.", insert_profile)
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
    addProfile,
};