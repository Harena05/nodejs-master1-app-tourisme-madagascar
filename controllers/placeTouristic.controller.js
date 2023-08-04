const config = require("../config/auth.config");
const db = require("../models");
const PlaceTouristic =require("../models/placeTouristic.model")
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const placeTouristicModel = require("../models/placeTouristic.model");

exports.save = async (req, res) => {
  const user = new PlaceTouristic({
    placeName: req.body.placeName,
    description: req.body.description,
    types: req.body.types,
    types: req.body.types,
    images: req.body.images,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  place.save()
    .then(() => {
        return res.send({ message: 'Place was registered successfully!' });
    })
    .catch((err) => {
        return res.status(500).send({ message: err.message });
    });
};

exports.all = async (res,req) =>{
  placeTouristicModel.find().then((result)=>{
    return res.status(200).send(result);
  }).catch((err)=>{
    return res.status(500).send({ message: err.message });
  });
};

exports.findeById = async (res,req) => {
    placeTouristicModel.findById(req.body.id).then((result)=>{
        if(!result){
            return res.status(404).send({ message: 'Place Not found.' });
        }
        return res.status(200).send(result);
    }).catch((err)=>{
        return res.status(500).send({ message: err.message });
    });
};

exports.update = async (res,req) => {
    placeTouristicModel.findByIdAndUpdate(req.body.id).then((result)=>{
        if(!result){
            return res.status(404).send({ message: 'Place Not found.' });
        }
        return res.status(200).send(result);
    }).catch((err)=>{
        return res.status(500).send({ message: err.message });
    });
};
