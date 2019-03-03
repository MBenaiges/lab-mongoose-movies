'use strict';

const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render('movies/index', { movies });
  } catch (error) {
    next(error);
  }
});

router.get('/new', async (req, res, next) => {
  res.render('movies/new');
});

router.post('/', async (req, res, next) => {
  const { _id, title, genre, plot } = req.body;
  const movie = { title, genre, plot };
  try {
    if (_id) {
      await Movie.findByIdAndUpdate(_id, movie);
    } else {
      await Movie.create(movie);
    }
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('movies/show', movie);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('movies/new', movie);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
