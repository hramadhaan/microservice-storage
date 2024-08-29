exports.uploadFile = (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please upload a file");
    error.statusCode = 400;
    return next(error);
  }

  const fileList = req.files.map((file) => file.location);

  res
    .status(200)
    .json({ message: "File uploaded successfully", data: fileList });
};
