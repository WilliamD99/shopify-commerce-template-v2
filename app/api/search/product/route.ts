import { NextResponse } from 'next/server';
import { getProducts } from '~/lib/shopify';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const searchStr = url.searchParams.get('search');
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam !== null ? parseInt(limitParam) : 10;

    const res = await getProducts({
      query: `title:*${searchStr}*`
    });
    return NextResponse.json(res, {
      status: 200
    });
  } catch (e) {
    let err_response = {
      status: 'fail',
      message: 'Something went wrong'
    };
    return new NextResponse(JSON.stringify(err_response), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
