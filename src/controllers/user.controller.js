import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message: "chalo hum chalein"
    })
})

export {registerUser}

// status(200) means if every thing is alright then pass the json
// status(200) indicates that the request was successful, and json({ message: "ok" }) sends a JSON response with the message "ok".