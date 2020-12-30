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
                res.json(wemeet);
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
    User.findById(
      req.params.id,

      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          res.json(user.eventsHosted);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
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
          try {
            Wemeet.findById(
              req.params.wemeetid,

              function (err, wemeet) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(wemeet.speakers);
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
exports.AddSpeakers = async (req, res) => {
  try {
    Wemeet.findByIdAndUpdate(
      req.params.wemeetid,
      {
        $push: {
          speakers: {
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation,
            organization: req.body.organization,
            profilePicUrl: req.body.profilePicUrl,
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

exports.RemoveSpeakers = async (req, res) => {
  try {
    Wemeet.findByIdAndUpdate(
      req.params.wemeetid,
      {
        $pull: {
          speakers: {
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation,
            organization: req.body.organization,
            profilePicUrl: req.body.profilePicUrl,
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
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation,
            organization: req.body.organization,
            city: req.body.city,
            country: req.body.country,
            profilePicUrl: req.body.profilePicUrl,
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
    speakers: req.body.speakers,
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
                  res.json(wemeet.sessions);
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
            name: req.body.name,
            email: req.body.email,
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

exports.RemoveSessionSpeakers = async (req, res) => {
  try {
    Session.findByIdAndUpdate(
      req.params.sessionid,
      {
        $pull: {
          speakers: {
            name: req.body.name,
            email: req.body.email,
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
