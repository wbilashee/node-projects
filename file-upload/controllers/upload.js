const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");

const uploadFile = async (req, res) => {
    const file = req.files.image;

    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(StatusCodes.OK).json(result);
    });

    await file.mv('./public/uploads/' + file.name, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = uploadFile;