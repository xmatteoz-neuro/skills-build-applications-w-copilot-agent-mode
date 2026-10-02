import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/** Seed the octofit_db database with test data */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com' },
      { name: 'Luca Rossi', email: 'luca.rossi@example.com' },
      { name: 'Amara Okafor', email: 'amara.okafor@example.com' },
    ]);

    const teams = await Team.create([
      {
        name: 'Morning Movers',
        description: 'Early workouts and steady progress.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Weekend Trailblazers',
        description: 'Outdoor sessions and weekend challenges.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, calories: 285 },
      { user: users[1]._id, type: 'cycling', durationMinutes: 45, calories: 410 },
      { user: users[2]._id, type: 'strength', durationMinutes: 38, calories: 260 },
      { user: users[0]._id, type: 'yoga', durationMinutes: 25, calories: 120 },
      { user: users[2]._id, type: 'swimming', durationMinutes: 30, calories: 320 },
    ]);

    await Leaderboard.create([
      { user: users[1]._id, points: 1840, rank: 1, period: 'weekly' },
      { user: users[0]._id, points: 1625, rank: 2, period: 'weekly' },
      { user: users[2]._id, points: 1470, rank: 3, period: 'weekly' },
    ]);

    await Workout.create([
      {
        name: 'Tempo Run',
        description: 'A controlled pace run with a short warm-up and cool-down.',
        activityType: 'running',
        durationMinutes: 35,
        difficulty: 'intermediate',
      },
      {
        name: 'Full-Body Basics',
        description: 'A balanced strength session using bodyweight movements.',
        activityType: 'strength',
        durationMinutes: 30,
        difficulty: 'beginner',
      },
      {
        name: 'Recovery Flow',
        description: 'Mobility and yoga poses for a light recovery day.',
        activityType: 'yoga',
        durationMinutes: 25,
        difficulty: 'beginner',
      },
    ]);

    console.log(`Seeded ${users.length} users and ${teams.length} teams, plus activities, leaderboard entries, and workouts.`);
  } catch (error) {
    console.error('Error seeding octofit_db:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
