import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  revalidateTag('cats');

  return NextResponse.json({
    success: true,
    message: `Cache cleared`,
  });
};
