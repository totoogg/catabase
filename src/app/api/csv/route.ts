import { CSVaction } from '@/shared';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  const { fileName, csvContent } = await CSVaction(data);

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv;charset=utf-8',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}
