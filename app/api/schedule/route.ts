import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { tasks } = await req.json();

        if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
            return NextResponse.json({ error: 'No tasks provided' }, { status: 400 });
        }

        const prompt = `
You are an elite, high-performance day planner.

Given the following tasks: ${tasks.join(', ')}

Create a smart, time-blocked schedule for the day. Prioritize tasks based on urgency, dependencies, and logical flow. Assign exact time slots, group similar activities, and account for constraints like energy levels or availability.

After the schedule, include a short explanation of *why* you ordered the tasks this way. Be concise, confident, and clear.
`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });

        return NextResponse.json({ schedule: response.choices[0].message.content });
    } catch (error) {
        if (error instanceof Error) {
            console.error('GPT-4o API ERROR:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.error('GPT-4o API ERROR:', error);
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }

}
