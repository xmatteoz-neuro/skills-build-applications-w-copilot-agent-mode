import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/api/users/', async (_request, response) => {
	response.json(await User.find().sort({ name: 1 }));
});

router.get('/api/teams/', async (_request, response) => {
	response.json(await Team.find().populate('members', 'name email').sort({ name: 1 }));
});

router.get('/api/activities/', async (_request, response) => {
	response.json(await Activity.find().populate('user', 'name email').sort({ performedAt: -1 }));
});

router.get('/api/leaderboard/', async (_request, response) => {
	response.json(
		await Leaderboard.find()
			.populate('user', 'name email')
			.sort({ rank: 1 }),
	);
});

router.get('/api/workouts/', async (_request, response) => {
	response.json(await Workout.find().sort({ name: 1 }));
});

export default router;