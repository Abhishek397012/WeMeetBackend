const { json } = require("body-parser");
const Wemeet = require("../models/wemeet");
const User = require("../models/user");

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
            id: req.body.id,
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
