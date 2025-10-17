
import { langfuse } from "@/lib/langfuse-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, prompt, isActive } = await req.json();

        if (!name || !prompt) {
            return NextResponse.json(
                { error: "Name and prompt content are required" },
                { status: 400 }
            );
        }


        const newPrompt = await langfuse.createPrompt({
            name,
            prompt,
            isActive,
        });

        return NextResponse.json(newPrompt);
    } catch (error) {
        console.error("Failed to create prompt:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}