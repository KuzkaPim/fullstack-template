import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const rootPath = path.resolve(process.cwd());
const uploadPath = path.join(rootPath, 'data', 'uploads');

fs.mkdirSync(uploadPath, { recursive: true });

export const storage = diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, `${randomUUID()}${path.extname(file.originalname)}`);
	},
});
