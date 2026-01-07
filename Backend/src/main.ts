import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { JobController } from './jobs/job.controller';
import { PathfinderController } from './pathfinder/pathfinder.controller';

// 1. Setup the Server
const app = express();
app.use(cors());              // Allow Frontend to talk to us
app.use(express.json());      // Allow us to read JSON data
const PORT = 3000;

// 2. Initialize our Logic (Controllers)
const jobController = new JobController();
const pathfinderController = new PathfinderController();

// ---------------------------------------------------------
// SECTION A: JOB ROUTES
// ---------------------------------------------------------

// Route: Get all jobs (with search)
app.get('/jobs', async (req, res) => {
  const keyword = req.query.keyword as string || ""; 
  const jobs = await jobController.findJobs(keyword);
  res.json(jobs);
});

// ---------------------------------------------------------
// SECTION B: PATHFINDER ROUTES (AI & Database)
// ---------------------------------------------------------

// Route: AI Career Advice (The "dumb" or "smart" text analysis)
app.post('/pathfinder',async (req, res) => {
  const { interest } = req.body;
  const result = await pathfinderController.recommend(interest || "");
  res.json(result);
});

// Route: Get List of Counties (for the Dropdown)
app.get('/locations/counties', (req, res) => {
  res.json(pathfinderController.getCounties());
});

// Route: Get Types (University vs College) based on County
app.get('/locations/types', (req, res) => {
  const county = req.query.county as string;
  res.json(pathfinderController.getTypes(county));
});

// Route: Get Institutions based on County + Type
app.get('/locations/institutions', (req, res) => {
  const { county, type } = req.query;
  res.json(pathfinderController.getInstitutions(county as string, type as string));
});

// Route: Get Courses based on Institution
app.get('/locations/courses', (req, res) => {
  const { county, type, institution } = req.query;
  res.json(pathfinderController.getCourses(county as string, type as string, institution as string));
});

// ---------------------------------------------------------
// SECTION C: START SERVER
// ---------------------------------------------------------

// Route: Simple Health Check
app.get('/', (req, res) => {
  res.send('🚀 AI Career Coach Backend is Running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});