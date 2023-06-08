const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ChatBotData = require('./model/ChatBotData')
require('dotenv').config();

// Connect to MongoDB
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api/read', async (req, res) => {
  try {

    const data = new Object({
      content: req.body.content,
      displayType: req.body.displayType,
      invokeByMsg: req.body.invokeByMsg,
      responseByIds: req.body.responseByIds,
      responseWithIds: req.body.responseWithIds
    });

    const nonNullKeys = [];
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        nonNullKeys.push(key);
      }
    }

    const filter = {};
    for (const key of nonNullKeys) {
      filter[key] = data[key];
    }

    const result = await ChatBotData.find(filter);
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/create', async (req, res) => {
  try {

    const data = new ChatBotData({
      content: req.body.content,
      displayType: req.body.displayType,
      invokeByMsg: req.body.invokeByMsg,
      responseByIds: req.body.responseByIds,
      responseWithIds: req.body.responseWithIds
    });

    const document = await data.save()
    res.status(201).json(document)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/update/:id', async (req, res) => {
  try {

    const { id } = req.params;
    document = ChatBotData.findOne({ _id: id })
    if (document) {
      result = await ChatBotData.updateOne({ _id: req.params.id },
        {
          content: req.body.content,
          displayType: req.body.displayType,
          invokeByMsg: req.body.invokeByMsg,
          responseByIds: req.body.responseByIds,
          responseWithIds: req.body.responseWithIds
        });

      res.send(result).status(200);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  try {

    const { id } = req.params;
    let result = await ChatBotData.findByIdAndDelete({ _id: id });
    res.send(result).status(200);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
