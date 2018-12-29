const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Questions = require('../models/questions');
const questionRouter = express.Router();

questionRouter.use(bodyParser.json());

questionRouter.route('/')
.all((request, response, next) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  next();
})
// get all the questions (set to get all for now)
.get((request, response, next) => {
  Questions.find({})
  .then((questions) => {
    response.json(questions);
  }, (err) => next(err)) // forward error to error handler
  .catch((err) => next(err));
})
// create a question in DB with fields in the req body
.post((requset, response, next) => {
  Questions.create(request.body)
  .then((question) => {
    console.log(question);
    response.json(question);
  }, err => next(err))
  .catch((err) => next(err))
})
// put on all questions is not suppported
.put((requset, response, next) => {
  response.statusCode = 403;
  response.end('PUT not supported right now.');
})
.delete((requset, response, next) => {
  Questions.remove({})
    .then((res) => {
        response.json(res);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// handle request for specific question id
questionRouter.route('/:quesId')
.get((request, response, next) => {
  Questions.findById(request.params.quesId)
  .then((question) => {
    response.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    response.json(question);

  }, (err) => next(err))
  .catch(err => next(err))
})
// POST is not supported right now on specific question
.post((request, response, next) => {
  response.statusCode = 403;
  response.end('POST not supported for specific question' + request.params.quesId);
})
.put((request, response, next) => {
  Questions.findByIdAndUpdate(request.params.quesId, {$set: request.body}, {new: true})
  .then((updatedQues) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.json(updatedQues);
  }, (err) => next(err))
  .catch((err) => next(err))
})
// delete specific question
.delete((request, response, next) => {
  Questions.findByIdAndRemove(request.params.quesId)
  .then((res) => {
    response.statusCode = 200;
    response.end('Question is deleted');
    response.json(res);

  }, (err) => next(err))
  .catch((err) => next(err))
})
