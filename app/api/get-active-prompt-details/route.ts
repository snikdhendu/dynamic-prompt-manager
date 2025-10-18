import { langfuse } from '@/lib/langfuse-server';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const promptName = req.nextUrl.searchParams.get('name');


        if (promptName) {
            const prompt = await langfuse.getPrompt(promptName);
            if (!prompt.prompt) {
                return NextResponse.json({ error: `Prompt '${promptName}' not found.` }, { status: 404 });
            }

            const regex = /{{\s*(\w+)\s*}}/g;
            const matches = [...prompt.prompt.matchAll(regex)];
            const variables = Array.from(new Set(matches.map(match => match[1])));

            return NextResponse.json({ variables });
        }

        else {
            const promptsList = await langfuse.api.promptsList({});
            const promptNames = promptsList.data.map(p => p.name);
            return NextResponse.json({ promptNames });
        }

    } catch (error) {
        console.error("Failed to get prompt details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}