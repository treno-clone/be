import handleError from "./handleError.js"

const handleAsync = (fn) =>(req, res, next)=>{
    fn(res, req, next).catch((error)=>{
        handleError(res, 500, "Server error", error)
    })
};

export default handleAsync;