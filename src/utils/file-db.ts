import { promises as fs } from 'fs';
import path from 'path';

const dbPath = '../../last_img.txt'

export async function readLastImg() {
  const filePath = path.resolve(__dirname, dbPath);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    // console.log('File content:', data);
    return data;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}

export async function overwriteLastImg(newUrl: string) {
  const filePath = path.resolve(__dirname, dbPath);
  try {
    await fs.writeFile(filePath, newUrl, 'utf-8');
    console.log('File overwritten with:', newUrl);
  } catch (err) {
    console.error('Error writing to file:', err);
  }
}
