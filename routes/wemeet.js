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
  CreateSession,
  GetSession,
  UpdateSession,
  GetAllSession,
  AddSessionSpeakers,
  RemoveSessionSpeakers,
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
router.post("/:id/:wemeetid/create", CreateSession);
router.get("/:id/:wemeetid/:sessionid/summary", GetSession);
router.put("/:id/:wemeetid/:sessionid/update", UpdateSession);
router.get("/:id/:wemeetid/allsessions", GetAllSession);
router.post("/:id/:wemeetid/:sessionid/addspeakers", AddSessionSpeakers);
router.delete(
  "/:id/:wemeetid/:sessionid/removespeakers",
  RemoveSessionSpeakers
);

module.exports = router;
