import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import sharp from 'sharp';


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            console.log(fields, files)
            console.log(files.file.filepath)
            const oldPath = files.file.filepath;
            //const newPath = `./public/uploads/${files.file.originalFilename}`;
            const newPath = `./public/uploads/${Date.now()}.webp`;

            sharp(oldPath)
                .resize({fit: sharp.fit.contain, width:400})
                .toFormat('webp')
                .webp({quality:85})
                .toFile(newPath);

            // fs.rename(oldPath, newPath);
            res.status(200).json({ fields, files })
        })
    })
    
}