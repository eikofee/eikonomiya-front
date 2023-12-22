import {promises as fsPromises} from 'fs';
import path from 'path'
import { getUIDFolderList } from './server';


export async function GET(request: Request) {
    return await Response.json(getUIDFolderList())
  }
