// index.ts
import { app, Datastore } from 'codehooks-js' // Standard Codehooks.io lib
import {userProfileFromAuth0} from './authHelper.js'

app.use('/todo', userProfileFromAuth0);

app.get('/todo', async (req, res) => {
  console.log('Get todo for', req.user.email)
  const db = await Datastore.open();
  db.getMany('tododata', {filter: {owner: req.user.email}}).pipe(res);
})

app.post('/todo', async (req, res) => {
  console.log('Save todo for', req.user.email, req.body)
  const task = req.body;
  task.owner = req.user.email;
  const db = await Datastore.open();
  const result = await db.insertOne('tododata', task);
  res.json(result);
})


export default app.init(); // Bind functions to the serverless cloud