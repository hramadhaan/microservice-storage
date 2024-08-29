const express = require("express");
const multer = require("multer");
const fs = require("fs");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const uploadControllers = require("../controllers/upload");

const router = express.Router();

const endpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");

const s3 = new aws.S3({
  endpoint: endpoint,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  },
});

const storageSpaces = multerS3({
  s3,
  bucket: process.env.SPACES_BUCKET,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

router.post(
  "/uploads",
  multer({
    storage: storageSpaces,
    limits: { fileSize: 1024 * 1024 * 2 },
  }).array("files"),
  uploadControllers.uploadFile
);

module.exports = router;
