const handleError = (res, status, message, error) =>{
    return res.status(status || 500).json({
        message: message || "Server error",
        error
    })
};

export default handleError;