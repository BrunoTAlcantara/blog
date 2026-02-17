import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const resolvedParams = await params;
  const [width, height] = resolvedParams.params;
  
  const w = parseInt(width) || 400;
  const h = parseInt(height) || 300;
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <rect x="10" y="10" width="${w-20}" height="${h-20}" fill="none" stroke="#d4d4d4" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="system-ui, sans-serif" font-size="16" fill="#737373">
        ${w} × ${h}
      </text>
    </svg>
  `;
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
