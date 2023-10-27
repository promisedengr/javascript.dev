const express = require("express");
const Coins = require("../../models/Coins");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const coins = await Coins.find();
    console.log("coins", coins);
    res.status(200).send(coins);
    // res.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
