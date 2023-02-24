module.exports={
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'secreta'
}

const IMG_BASE = process.env.IMG || "https://apifoodmet.up.railway.app";
const IMG_UPLOADS = "/uploads/";
const IMG_URL = IMG_BASE + IMG_UPLOADS + req.file.filename;

// ...

if (req.file) {
  product.image = IMG_URL;
}

// ...
