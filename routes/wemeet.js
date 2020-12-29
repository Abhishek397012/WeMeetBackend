const express = require("express");
const router = express.Router();

const {
  CreateWeMeet,
  UpdateWeMeet,
  GetAllWeMeets,
  AddSpeakers,
  RemoveSpeakers,
} = require("../controllers/wemeet");

router.post("/:id/create", CreateWeMeet);
router.put("/:id/:wemeetid/update", UpdateWeMeet);
router.get("/:id/allwemeets", GetAllWeMeets);
router.post("/:id/:wemeetid/addspeakers", AddSpeakers);
router.delete("/:id/:wemeetid/removespeakers", RemoveSpeakers);

module.exports = router;
