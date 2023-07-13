var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Bike = require("../models/bike");
module.exports = router;

//Get
router.get("/", (req, res, next) => {
  Bike.find()
    // .populate("group")
    .then((bikes) => {
      res.status(200).json({
        message: "Bike snagged successfully",
        bikes: bikes,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Broken Bikes Fetch",
        error: error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Bike.findOne(
   {
    "id": req.params.id
   }
  )
   // .populate("group")
    .then((bike) => {
      res.status(200).json({
        message: "Bike snagged successfully",
        bike: bike,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Broken Bike Fetch",
        error: error,
      });
    });
})

// router.get("/:id", (req, res, next) => {
//   Bike.findOne({
//     "id": req.params.id
//   })
//     .populate("group")
//     .then((bike) => {
//       res
//       .status(200)
//       .json({
//         message: "Bike snagged successfully",
//         bike: bike,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "Broken Bike Fetch",
//         error: error,
//       });
//     });
// });

//Post
router.post("/", (req, res, next) => {
  const maxBikeId = sequenceGenerator.nextId("bikes");
  const bike = new Bike({
    id: maxBikeId,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    url: req.body.url,
    gender: req.body.gender,
    surfaceType: req.body.surfaceType,
    terrainLevel: req.body.terrainLevel,
    terrainType: req.body.terrainType,
    wheelSize: req.body.wheelSize,
    funFactor: req.body.funFactor
  });

  bike
    .save()
    .then((createdBike) => {
      res.status(201).json({
        message: "Bike added successfully",
        bike: createdBike,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

//Put
router.put("/:id", (req, res, next) => {
  Bike.findOne({ id: req.params.id })
    .then((bike) => {
    id = maxBikeId;
    manufacturer = req.body.manufacturer;
    model = req.body.model;
    url = req.body.url;
    gender = req.body.gender;
    surfactType = req.body.surfactType;
    terrainLevel = req.body.terrainLevel;
    terrainType = req.body.terrainType;
    wheelSize = req.body.wheelSize;
    funFactor = req.body.funFactor

      Bike.updateOne({ id: req.params.id }, bike)
        .then((result) => {
          res.status(204).json({
            message: "Bike updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Bike not found.",
        error: { bike: "Bike not found" },
      });
    });
});

// Delete
router.delete("/:id", (req, res, next) => {
  Bike.findOne({ id: req.params.id })
    .then((bike) => {
      Bike.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Bike deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Bike not found.",
        error: { bike: "Bike not found" },
      });
    });
});
