import fs from 'fs'
import path from 'path'

export default function handler(req, res) {




    const dirRelative = 'templatesEmail';
    const dir = path.resolve('./src', dirRelative);
    //const filenames = fs.readdirSync(dir);
    //const files = filenames.map(name => path.join('/', dirRelative, name))

    
    const file = dir + '/validate.txt';
    res.statusCode = 200

    let ret ='';
    fs.readFile(file, (err, data) => {
             if (err) res.status(500).send(err);;
             ret = data;
             res.send(data);
    });



   





    // const file = __dirname + '/templatesEmail/' + 'validate.html';

    // let ret ='';
    // readFile(file, (err, data) => {
    //     if (err) ret = err.message;
    //     ret = String(data);
    // });

    // if(ret) {
    //     res.status(200).json({ ret })
    // } else {
    //     res.status(200).json({ error: 'erro' })
    // }
    
  }
  

