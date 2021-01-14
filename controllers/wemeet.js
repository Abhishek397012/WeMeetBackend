const { json } = require("body-parser");
const Wemeet = require("../models/wemeet");
const User = require("../models/user");
const Session = require("../models/session");
exports.CreateWeMeet = async (req, res) => {
  const wemeet = new Wemeet({
    title: req.body.title,
    description: req.body.description,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    visibility: req.body.visibility,
    loungeTables: req.body.loungeTables,
    status: req.body.status,
    registrationCount: req.body.registrationCount,
    hostId: req.params.id,
    imgUrl: req.body.imgUrl,
  });
  try {
    const savedWemeet = await wemeet.save();
    User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          eventsHosted: savedWemeet._id,
        },
      },
      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          res.json(user);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.GetWeMeet = async (req, res) => {
  try {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        var istrue = false;
        user.eventsHosted.forEach((event) => {
          if (event == req.params.wemeetid) {
            istrue = true;
          }
        });
        if (istrue) {
          try {
            Wemeet.findById(req.params.wemeetid, function (err, wemeet) {
              if (err) {
                console.log(err);
              } else {
                res.json({ allowed: 1, wemeet: wemeet });
              }
            });
          } catch (err) {
            res.json({ message: err });
          }
        } else {
          res.json({ allowed: 0 });
        }
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.Upcoming = (req, res, next) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        var Events = user.eventsHosted;
        var found = false;
        var upcoming = null;
        var count = 0;
        Events.forEach((eventId) => {
          Wemeet.findOne({ _id: eventId })
            .populate("user")
            .exec((err, event) => {
              count++;
              if (event && event.status === 0 && !found) {
                found = true;
                upcoming = event;
              }
              if (!found && count == Events.length) {
                upcoming = null;
              }
              if (count === Events.length) {
                res.json({
                  UpcomingWemeet: upcoming,
                });
              }
            });
        });
      }
    });
  } catch (err) {
    return res.json({ message: err });
  }
};
exports.GetAllUpcomingWemeets = (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        var Events = user.eventsHosted;
        var UpcomingWemeets = [];
        var count = 0;
        Events.forEach((eventId, index) => {
          Wemeet.findOne({ _id: eventId })
            .populate("user")
            .exec((err, event) => {
              count++;
              if (event && event.status === 0) {
                ue = {
                  speakers: event.speakers,
                  sessions: event.sessions,
                  registrants: event.registrants,
                  _id: event._id,
                  title: event.title,
                  description: event.description,
                  startDateTime: event.startDateTime,
                  endDateTime: event.endDateTime,
                  visibility: event.visibility,
                  loungeTables: event.loungeTables,
                  status: event.status,
                  hostId: event.hostId,
                  imgUrl: event.imgUrl,
                  createdAt: event.createdAt,
                  updatedAt: event.updatedAt,
                };
                UpcomingWemeets.push(ue);
              }

              if (count === Events.length) {
                res.send(UpcomingWemeets);
              }
            });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.GetAllPastWeMeets = (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        var Events = user.eventsHosted;
        var PastWemeets = [];
        var count = 0;
        Events.forEach((eventId) => {
          Wemeet.findOne({ _id: eventId })
            .populate("user")
            .exec((err, event) => {
              count++;
              if (event && event.status === 2) {
                ue = {
                  speakers: event.speakers,
                  sessions: event.sessions,
                  registrants: event.registrants,
                  _id: event._id,
                  title: event.title,
                  description: event.description,
                  startDateTime: event.startDateTime,
                  endDateTime: event.endDateTime,
                  visibility: event.visibility,
                  loungeTables: event.loungeTables,
                  status: event.status,
                  hostId: event.hostId,
                  imgUrl: event.imgUrl,
                  createdAt: event.createdAt,
                  updatedAt: event.updatedAt,
                };
                PastWemeets.push(ue);
              }
              if (count === Events.length) {
                res.send(PastWemeets);
              }
            });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.UpdateWeMeet = async (req, res) => {
  try {
    Wemeet.findByIdAndUpdate(
      req.params.wemeetid,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          startDateTime: req.body.startDateTime,
          endDateTime: req.body.endDateTime,
          visibility: req.body.visibility,
          loungeTables: req.body.loungeTables,
          status: req.body.status,
          registrationCount: req.body.registrationCount,
          hostId: req.params.id,
          imgUrl: req.body.imgUrl,
        },
      },
      function (err, wemeet) {
        if (err) {
          console.log(err);
        } else {
          res.json(wemeet);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};
exports.GetAllWeMeets = async (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        var Events = user.eventsHosted;
        var AllWemeets = [];
        var count = 0;
        Events.forEach((eventId) => {
          Wemeet.findOne({ _id: eventId })
            .populate("user")
            .exec((err, event) => {
              if (event) {
                count++;
                ue = {
                  speakers: event.speakers,
                  sessions: event.sessions,
                  registrants: event.registrants,
                  _id: event._id,
                  title: event.title,
                  description: event.description,
                  startDateTime: event.startDateTime,
                  endDateTime: event.endDateTime,
                  visibility: event.visibility,
                  loungeTables: event.loungeTables,
                  status: event.status,
                  hostId: event.hostId,
                  imgUrl: event.imgUrl,
                  createdAt: event.createdAt,
                  updatedAt: event.updatedAt,
                };
                AllWemeets.push(ue);
              }
              if (count === Events.length) {
                res.send(AllWemeets);
              }
            });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.GetAllWeMeetsDetails = async (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        var Events = user.eventsHosted;
        var WemeetsCount = Events.length;
        var SpeakersCount = 0;
        var RegistrationsCount = 0;
        Events.forEach((eventId) => {
          Wemeet.findOne({ _id: eventId })
            .populate("user")
            .exec((err, event) => {
              if (event) {
                RegistrationsCount += event.registrants.length;
                SpeakersCount += event.speakers.length;
              }
            });
        });
        res.send({
          TeamWeMeets: WemeetsCount,
          TotalSpeakers: SpeakersCount,
          TotalRegistrations: RegistrationsCount,
          TotalAttendee: RegistrationsCount - SpeakersCount,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.GetAllSortedWeMeets = async (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        var Events = user.eventsHosted;
        var AllWemeets = [];
        var count = 0;
        Events.forEach((eventId) => {
          Wemeet.findOne({ _id: eventId })
            .populate("user")
            .exec((err, event) => {
              count++;
              if (event) {
                ue = {
                  speakers: event.speakers,
                  sessions: event.sessions,
                  registrants: event.registrants,
                  _id: event._id,
                  title: event.title,
                  description: event.description,
                  startDateTime: event.startDateTime,
                  endDateTime: event.endDateTime,
                  visibility: event.visibility,
                  loungeTables: event.loungeTables,
                  status: event.status,
                  hostId: event.hostId,
                  imgUrl: event.imgUrl,
                  createdAt: event.createdAt,
                  updatedAt: event.updatedAt,
                };
                AllWemeets.push(ue);
              }
              if (count === Events.length) {
                AllWemeets.sort((a, b) => b.startDateTime - a.startDateTime);
                GroupedWeMeet = [];
                allWeMeetTimes = new Set();
                MonthlyWeMeets = [];
                var f = 0;
                var weMeetTime;
                AllWemeets.forEach((wemeet) => {
                  previousWeMeetTime = weMeetTime;
                  weMeetTime =
                    String(wemeet.startDateTime).slice(4, 7) +
                    String(wemeet.startDateTime).slice(10, 15);
                  if (allWeMeetTimes.has(weMeetTime) == false) {
                    if (f != 0)
                      GroupedWeMeet.push({
                        WemeetTime: previousWeMeetTime,
                        Wemeets: MonthlyWeMeets,
                      });

                    f = 1;
                    MonthlyWeMeets = [];
                  }
                  MonthlyWeMeets.push(wemeet);
                  allWeMeetTimes.add(weMeetTime);
                });
                GroupedWeMeet.push({
                  WemeetTime: weMeetTime,
                  Wemeets: MonthlyWeMeets,
                });
                res.send(GroupedWeMeet);
              }
            });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.GetAllSpeakers = async (req, res) => {
  try {
    User.findById(
      req.params.id,

      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          var isallowed = false;
          user.eventsHosted.forEach((event) => {
            if (event == req.params.wemeetid) {
              isallowed = true;
            }
          });
          if (isallowed) {
            try {
              Wemeet.findById(
                req.params.wemeetid,

                function (err, wemeet) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json({ allowed: 1, speakers: wemeet.speakers });
                  }
                }
              );
            } catch (err) {
              res.json({ message: err });
            }
          } else {
            res.json({ allowed: 0 });
          }
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};
var wemeetIdForUpdate;
var speakerIdForUpdate;
function toggleRegistrant(val) {
  try {
    Wemeet.findByIdAndUpdate(
      wemeetIdForUpdate,
      { upDatedAt: Date.now() },
      function (err, wemeet) {
        if (err) {
          console.log(err);
        } else {
          wemeet.registrants.forEach((registrant) => {
            if (registrant.id == speakerIdForUpdate) registrant.isSpeaker = val;
          });
          Wemeet.findByIdAndUpdate(
            wemeetIdForUpdate,
            wemeet,
            function (err, updatedwemeet) {
              if (err) {
                console.log(err);
              }
            }
          );
          // res.json(wemeet);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}
exports.AddSpeakers = async (req, res) => {
  wemeetIdForUpdate = req.params.wemeetid;
  speakerIdForUpdate = req.body.id;
  try {
    Wemeet.findByIdAndUpdate(
      req.params.wemeetid,
      {
        $push: {
          speakers: {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation,
            organization: req.body.organization,
            profilePicUrl: req.body.profilePicUrl,
            sessions: [],
            isSpeaker: true,
          },
        },
      },
      function (err, wemeet) {
        if (err) {
          console.log(err);
        } else {
          res.json({ message: "done" });
          toggleRegistrant(true);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.RemoveSpeakers = async (req, res) => {
  wemeetIdForUpdate = req.params.wemeetid;
  speakerIdForUpdate = req.body.id;
  try {
    Wemeet.findByIdAndUpdate(
      req.params.wemeetid,
      {
        $pull: {
          speakers: {
            id: req.body.id,
          },
        },
      },
      function (err, wemeet) {
        if (err) {
          console.log(err);
        } else {
          res.json({ message: "done" });
          toggleRegistrant(false);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.GetAllRegistrants = async (req, res) => {
  try {
    User.findById(
      req.params.id,

      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          try {
            Wemeet.findById(
              req.params.wemeetid,

              function (err, wemeet) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(wemeet.registrants);
                }
              }
            );
          } catch (err) {
            res.json({ message: err });
          }
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};
exports.AddRegistrants = async (req, res) => {
  try {
    Wemeet.findByIdAndUpdate(
      req.params.wemeetid,
      {
        $push: {
          registrants: {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation,
            organization: req.body.organization,
            city: req.body.city,
            country: req.body.country,
            profilePicUrl: req.body.profilePicUrl,
            isSpeaker: false,
          },
        },
      },
      function (err, wemeet) {
        if (err) {
          console.log(err);
        } else {
          res.json(wemeet);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.CreateSession = async (req, res) => {
  const session = new Session({
    name: req.body.name,
    description: req.body.description,
    sessionDateTime: req.body.sessionDateTime,
    duration: req.body.duration,
    hostId: req.params.id,
    wemeetId: req.params.wemeetid,
    //speakers: req.body.speakers,
  });
  try {
    const savedSession = await session.save();
    Wemeet.findByIdAndUpdate(
      req.params.wemeetid,
      {
        $push: {
          sessions: savedSession._id,
        },
      },
      function (err, wemeet) {
        if (err) {
          console.log(err);
        } else {
          res.json(wemeet);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.GetSession = async (req, res) => {
  try {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        var istrue = false;
        user.eventsHosted.forEach((event) => {
          if (event == req.params.wemeetid) {
            istrue = true;
          }
        });
        if (istrue) {
          try {
            Wemeet.findById(req.params.wemeetid, function (err, wemeet) {
              if (err) {
                console.log(err);
              } else {
                var issessionavailable = false;
                wemeet.sessions.forEach((session) => {
                  if (session == req.params.sessionid) {
                    issessionavailable = true;
                  }
                });
                if (issessionavailable == true) {
                  try {
                    Session.findById(
                      req.params.sessionid,
                      function (err, session) {
                        if (err) {
                          console.log(err);
                        } else {
                          res.json(session);
                        }
                      }
                    );
                  } catch (err) {
                    res.json({ message: err });
                  }
                }
              }
            });
          } catch (err) {
            res.json({ message: err });
          }
        }
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.UpdateSession = async (req, res) => {
  try {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        var istrue = false;
        user.eventsHosted.forEach((event) => {
          if (event == req.params.wemeetid) {
            istrue = true;
          }
        });
        if (istrue) {
          try {
            Wemeet.findById(req.params.wemeetid, function (err, wemeet) {
              if (err) {
                console.log(err);
              } else {
                var issessionavailable = false;
                wemeet.sessions.forEach((session) => {
                  if (session == req.params.sessionid) {
                    issessionavailable = true;
                  }
                });
                if (issessionavailable == true) {
                  try {
                    Session.findByIdAndUpdate(
                      req.params.sessionid,
                      {
                        $set: {
                          name: req.body.name,
                          description: req.body.description,
                          sessionDateTime: req.body.sessionDateTime,
                          duration: req.body.duration,
                          speakers: req.body.speakers,
                        },
                      },
                      function (err, session) {
                        if (err) {
                          console.log(err);
                        } else {
                          res.json(session);
                        }
                      }
                    );
                  } catch (err) {
                    res.json({ message: err });
                  }
                }
              }
            });
          } catch (err) {
            res.json({ message: err });
          }
        }
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
};
exports.GetAllSession = async (req, res) => {
  try {
    User.findById(
      req.params.id,

      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          try {
            Wemeet.findById(
              req.params.wemeetid,

              function (err, wemeet) {
                if (err) {
                  console.log(err);
                } else {
                  // res.json(wemeet.sessions);
                  var Sessions = wemeet.sessions;
                  var AllSessions = [];
                  var count = 0;
                  Sessions.forEach((sessionId) => {
                    Session.findOne({ _id: sessionId })
                      .populate("wemeet")
                      .exec((err, session) => {
                        if (session) {
                          count++;
                          se = {
                            _id: session._id,
                            name: session.name,
                            description: session.description,
                            sessionDateTime: session.sessionDateTime,
                            duration: session.duration,
                            hostId: session.hostId,
                            wemeetId: session.wemeetId,
                            speakers: session.speakers,
                            createdAt: session.createdAt,
                            updatedAt: session.updatedAt,
                          };
                          AllSessions.push(se);
                        }
                        if (count === Sessions.length) {
                          res.json(AllSessions);
                        }
                      });
                  });
                }
              }
            );
          } catch (err) {
            res.json({ message: err });
          }
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.AddSessionSpeakers = async (req, res) => {
  try {
    Session.findByIdAndUpdate(
      req.params.sessionid,
      {
        $push: {
          speakers: {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
          },
        },
      },
      function (err, session) {
        if (err) {
          console.log(err);
        } else {
          // res.json(session);
          tempspeakers = [];
          Wemeet.findById(req.params.wemeetid, function (err, wemeet) {
            if (err) {
              console.log(err);
            } else {
              tempspeakers = wemeet.speakers;
              tempspeakers.forEach((speaker) => {
                if (speaker.id == req.body.id) {
                  speaker.sessions.push(session.name);
                }
              });

              Wemeet.findByIdAndUpdate(
                req.params.wemeetid,
                { speakers: tempspeakers },
                function (err, wemeet) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json({ Message: "Session Speaker Added!" });
                  }
                }
              );
            }
          });
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.RemoveSessionSpeakers = async (req, res) => {
  try {
    Session.findByIdAndUpdate(
      req.params.sessionid,
      {
        $pull: {
          speakers: {
            id: req.body.id,
          },
        },
      },
      function (err, session) {
        if (err) {
          console.log(err);
        } else {
          res.json(session);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};
