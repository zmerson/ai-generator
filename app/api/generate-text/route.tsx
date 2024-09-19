import { exec } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

// export default function handler(req: any, res: any ){ 
    // const { model, prompt, parameters } = req.body;
// 
    // exec(`python3 /app/scripts/generate_text.py --model ${model} --prompt ${prompt} --parameters ${parameters}`, (error, stdout, stderr) => {
        // if (error) {
            // console.error(`exec error: ${error}`);
            // return;
        // }
        // res.status(200).json({text: stdout});
    // });
// }
// 
export async function POST(req: any) {
    const { model, prompt, parameters } = await req. body;
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate.py');
    try {
    exec(`python3 /app/scripts/generate.py --model ${model} --prompt ${prompt} --parameters ${parameters}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        let text = stdout.toString();
        console.log("python script returned text", text);
        return new NextResponse(text, {status: 200});
    });
    }catch(err){
        console.log("erroro ", err);

        return new NextResponse("error", {status: 500});
    }
}
