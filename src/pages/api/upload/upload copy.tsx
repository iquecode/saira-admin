// import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from 'multer';
import sharp from 'sharp'


// Returns a Multer instance that provides several methods for generating 
// middleware that process files uploaded in multipart/form-data format.
// const upload = multer({
//     storage: multer.diskStorage({
//       destination: './public/uploads',
//       filename: (req, file, cb) => cb(null, file.originalname),
//     }),
//   });

const storage = multer.memoryStorage();
const filter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === 'image') {
      cb(null, true);
  } else {
      cb(new Error("Only images are allowed!"));
  }
};
exports.imageUploader = multer({
  storage,
  fileFilter: filter
});



const apiRoute = nc<NextApiRequest, NextApiResponse>({

    

    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.array('theFiles');
// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post((req, res) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};