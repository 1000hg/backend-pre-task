const sendSuccessResponse = (res, message, data) => {
    res.status(200).json({ success: true, message: message, data: data });
};

const sendNotFoundResponse = (res, message) => {
    res.status(404).json({ success: false, message: message });
};

const sendErrorResponse = (res, message) => {
    res.status(500).json({ success: false, message: message });
};

module.exports = {
    sendSuccessResponse,
    sendNotFoundResponse,
    sendErrorResponse
};