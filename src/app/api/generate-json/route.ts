"use server";

import {NextResponse} from "next/server";
import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

export async function POST(req: Request) {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const accountNo = formData.get("accountNo");
    const accountName = formData.get("accountName");
    const acqId = formData.get("acqId");

    if (!image) {
        return NextResponse.json({error: "No image provided"}, {status: 400});
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const contents = [
        {
            inlineData: {
                mimeType: image.type,
                data: base64,
            },
        },
        {
            text: `
  You are a strict JSON generator.
  Extract ONLY this structure from the image:
  {
    "orderCode": "<order code>",
    "amount": "<money without dots or commas, only digits>"
  }

  Return only pure JSON.
  Do NOT include code blocks, backticks, explanations, or markdown formatting.
  `,
        },

    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
    });

    if (response.text) {
        const rawText = response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(rawText);

        const finalJson = {
            accountNo,
            accountName,
            acqId,
            amount: parsed.amount,
            addInfo: parsed.orderCode,
            format: "text",
            template: "compact",
        };

        return NextResponse.json(finalJson);
    }
}
