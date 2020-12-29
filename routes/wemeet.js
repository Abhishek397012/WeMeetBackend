const express = require("express");
const router = express.Router();

const {
  CreateWeMeet,
  GetWeMeet,
  UpdateWeMeet,
  GetAllWeMeets,
  GetAllSpeakers,
  AddSpeakers,
  RemoveSpeakers,
  GetAllRegistrants,
  AddRegistrants,
} = require("../controllers/wemeet");

router.post("/:id/create", CreateWeMeet);
router.get("/:id/:wemeetid/summary", GetWeMeet);
router.put("/:id/:wemeetid/update", UpdateWeMeet);
router.get("/:id/allwemeets", GetAllWeMeets);
router.get("/:id/:wemeetid/allspeakers", GetAllSpeakers);
router.post("/:id/:wemeetid/addspeakers", AddSpeakers);
router.delete("/:id/:wemeetid/removespeakers", RemoveSpeakers);
router.get("/:id/:wemeetid/allregistrants", GetAllRegistrants);
router.post("/:id/:wemeetid/addregistrants", AddRegistrants);

module.exports = router;
