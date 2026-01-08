const handleResponse = (res, status, message, data, meta) =>{
    return res.status(status || 200).json({
        message: message || "Request success",
        data, 
        meta
    })
};

export default handleResponse;