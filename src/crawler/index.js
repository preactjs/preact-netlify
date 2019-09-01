import * as fs from 'fs';
import {resolve} from 'path';
import { promisify } from 'util';
import globRead from 'glob';

const readFile = promisify(fs.readFile);
const glob = promisify(globRead);

async function generateFileList() {
  const mdFilesPath = resolve(__dirname + '../../../content/**/*.md');
  const files = await glob(mdFilesPath);
  console.log({files});
}

generateFileList();