import mongoose, { model, Schema } from "mongoose";

const subscriptionSchema = new Schema({
  Subscriber: {
    type: Schema.Types.ObjectId, // one who is subscribing
    ref: "User",
  },
  Channel: {
    type: Schema.Types.ObjectId, // one to who 'subscriber' is subscribing
    ref: "User",
  },
}, {timestamps: true});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
