import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'strength', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);