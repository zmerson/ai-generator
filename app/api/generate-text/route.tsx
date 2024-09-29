import path from 'path';
import { exec } from 'child_process';
import { NextResponse } from 'next/server';
import { resourceLimits } from 'worker_threads';
import { promisify } from 'util';

const execPromise = promisify(exec);
export async function POST(req: Request) {
        const { model, prompt, parameters } = await req.json();
        console.log("request body:", { model, prompt, parameters });
        // let scriptPath = path.join(process.cwd(), 'scripts', 'generate.py');
        // console.log("Original script path:", scriptPath);

        // // Normalize the path for the current OS
        // scriptPath = path.normalize(scriptPath);
        // console.log("Normalized script path:", scriptPath);

        // // Replace backslashes with forward slashes for compatibility
        // // scriptPath = scriptPath.replace(/\\/g, '/');
        // console.log("Final script path:", scriptPath);

        const command = `python ./app/scripts/generate.py --model ${model} --prompt ${prompt} --parameters ${parameters}`;
        // const command = "cd"
        console.log("Executing command:", command);
        // return NextResponse.json({ message: "hello" });

        try {
            const { stdout, stderr } = await execPromise(command);
    
            if (stderr) {
                console.error(`Error from script: ${stderr}`);
                return new NextResponse(stderr, { status: 500 });
            }
    
            console.log("Python script returned text:", stdout);
            return NextResponse.json({ result: stdout }, { status: 200 });

        } catch (err) {
            console.log("error", err);
            return new NextResponse("error", { status: 505 });
        }
}