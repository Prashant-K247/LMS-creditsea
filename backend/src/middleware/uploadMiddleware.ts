import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({destination: (req,file,cb)=>{
        cb(null, uploadsDir);
    },

    filename: ( req, file, cb)=>{
        const uniqueName =Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb( null, uniqueName + path.extname(file.originalname));
    },
});

const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
];

const fileFilter: multer.Options["fileFilter"] =( req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error("Only PDF, JPG and PNG files are allowed"));
    }
};

export const upload =multer({storage, fileFilter, limits: {fileSize: 5 * 1024 * 1024}});