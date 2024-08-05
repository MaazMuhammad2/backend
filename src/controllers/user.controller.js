import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiRespone.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  // validation - not empty
  // check user already exist: username, email
  // check for images and check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove passowrd and refresh token field from response
  // check for user creation
  // return response

  const { fullName, username, email, passowrd } = req.body;
  console.log("Email is: ", email);

  // if (username === "") {
  //     throw new ApiError(400, "fullname is required")
  //     // check if any of the element  in an array past the test
  // } YOU CAN WRITE OTHER ALSO LIKE THIS BUT IT'D BE TOO LONG SO INSTEAD

  if (
    [fullName, username, email, passowrd].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Email is incorrect");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email and username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0].path;
  // console.log(avatarLocalPath)
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
  });

  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!registeredUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, registeredUser, "User registered successfully"));
});

export { registerUser };

// status(200) means if every thing is alright then pass the json
// status(200) indicates that the request was successful, and json({ message: "ok" }) sends a JSON response with the message "ok".
