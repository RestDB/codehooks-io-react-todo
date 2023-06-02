// index.ts
import { app, Datastore } from 'codehooks-js' // Standard Codehooks.io lib
import {userProfileFromAuth0} from './authHelper.js'

app.use('/todo*', userProfileFromAuth0);

app.get('/todo', async (req, res) => {
  console.log('Get todo for', req.user.email)
  const db = await Datastore.open();
  db.getMany('tododata', {
    filter: {owner: req.user.email},
    sort: {_id: -1}
  }).pipe(res);
})

app.post('/todo', async (req, res) => {
  console.log('Save todo for', req.user.email, req.body)
  const {email: owner} = req.user;
  const task = {...req.body, owner};
  const db = await Datastore.open();
  const result = await db.insertOne('tododata', task);
  res.json(result);
})

app.put('/todo/:id', async (req, res) => {
  try {
    console.log('Update todo for', req.user.email, req.body)
    const task = req.body;
    const {id} = req.params;
    const db = await Datastore.open();
    const result = await db.updateOne('tododata', id, task);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.delete('/todo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    console.log('Delete todo for', req.user.email, id)
    
    const db = await Datastore.open();
    const result = await db.removeOne('tododata', id);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
})


export default app.init(); // Bind functions to the serverless cloud