const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: errors.array()[0].msg });
};

const validateUserName = [
    body('name').notEmpty().withMessage('이름을 입력하세요!').trim().isLength({ max: 30 }).withMessage('30자 이하 입력하세요!'),
    validate,
];

const validateUser = [
    ...validateUserName,
    body('nickname').trim().isLength({ max: 30 }).withMessage('30자 이하 입력하세요!').optional({ nullable: true, checkFalsy: true }),
    body('phone_number').isLength({ max: 20 }).withMessage('20자 이하 입력하세요!').optional({ nullable: true, checkFalsy: true }),
    body('email').isEmail().isLength({ max: 20 }).withMessage('20자 이하 입력하세요!').withMessage('이메일 형식을 지켜주세요!').normalizeEmail().optional({ nullable: true, checkFalsy: true }),
    body('birth').isISO8601().withMessage('올바른 날짜 형식을 입력하세요!').trim().optional({ nullable: true, checkFalsy: true }),
    body('address').isLength({ max: 60 }).withMessage('60자 이하 입력하세요!').trim().optional({ nullable: true, checkFalsy: true }),
    body('gender').isIn(['남자', '여자', '기타']).withMessage('올바른 성별을 선택하세요!').optional({ nullable: true, checkFalsy: true }),
    validate,
];

module.exports = { validateUserName, validateUser };
