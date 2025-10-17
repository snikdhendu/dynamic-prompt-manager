
import { langfuse } from "@/lib/langfuse-server";
import { NextResponse } from "next/server";


const PROMPT_NAME = "new-check";

export async function GET() {
    try {

        const prompt = await langfuse.getPrompt(PROMPT_NAME);

        if (!prompt.prompt) {
            return NextResponse.json(
                { error: `Active prompt named '${PROMPT_NAME}' not found.` },
                { status: 404 }
            );
        }


        const regex = /{{\s*(\w+)\s*}}/g;
        const matches = [...prompt.prompt.matchAll(regex)];


        const variables = Array.from(new Set(matches.map(match => match[1])));


        return NextResponse.json({
            prompt: prompt.prompt,
            variables: variables,
        });
    } catch (error) {
        console.error("Failed to get prompt details:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}