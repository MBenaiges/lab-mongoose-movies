'use strict';

const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity');

router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/index', { celebrities });
  } catch (error) {
    next(error);
  }
});

router.get('/new', async (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/', async (req, res, next) => {
  const { _id, name, occupation, catchPhrase } = req.body;
  const celebrity = { name, occupation, catchPhrase };
  try {
    if (_id) {
      await Celebrity.findByIdAndUpdate(_id, celebrity);
    } else {
      await Celebrity.create(celebrity);
    }
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render('celebrities/show', celebrity);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render('celebrities/new', celebrity);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndDelete(id);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
