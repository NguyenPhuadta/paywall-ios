import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('..',import.meta.url)));
import {rmSync,mkdirSync,copyFileSync,cpSync,existsSync} from 'node:fs';
rmSync('dist',{recursive:true,force:true});
mkdirSync('dist',{recursive:true});
copyFileSync('index.html','dist/index.html');
for(const dir of ['paywalls','assets','library','apps','downloads'])cpSync(dir,'dist/'+dir,{recursive:true});
if(!existsSync('dist/paywalls/castduo/assets/pro-metal-badge-v4.png'))throw Error('Badge asset missing');
console.log('Static website packaged.');
