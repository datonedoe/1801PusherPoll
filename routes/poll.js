require('dotenv').config();
const express = require("express");
const Pusher = require('pusher');
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/Vote");

var pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  encrypted: process.env.ENCRYPTED
});

console.log("process.env.APPID", process.env.APPID);
console.log("process.env.KEY", process.env.KEY);
console.log("process.env.SECRET", process.env.SECRET);
console.log("process.env.CLUSTER", process.env.CLUSTER);
console.log("process.env.ENCRYPTED", process.env.ENCRYPTED);
router.get("/", (req, res) => {
  Vote.find().then(votes => res.json({success: true, votes: votes}))
})

router.post("/", (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.Point),
      os: vote.os
    });

  })

  return res.json({ success: true, message: 'Thank you for voting' });
})

module.exports = router;
