import { NextResponse } from 'next/server';
import { getRelevantKeywords } from '@/lib/aiSearch';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const keywords = await getRelevantKeywords(query);

    return NextResponse.json({
      keywords
    });
  }
  catch (error) {
    console.error('Error processing search:', error);

    return NextResponse.json(
      {
        error: 'Failed to process search'
      },
      {
        status: 500
      }
    );
  }
}