// pages/api/search/[query].ts

import { NextRequest, NextResponse } from 'next/server';
import NodeCache from 'node-cache';

// Create a cache instance with a default TTL of 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
  }

  const query = req.nextUrl.pathname.match(/\/([^\/]+)$/)?.[1];
  console.log("Query being asked is:", query);

  if (!query) {
    return new NextResponse("Query parameter is required", { status: 400 });
  }

  // Check if the data is in the cache
  const cachedData = cache.get(query);
  if (cachedData) {
    console.log("Returning cached data for query:", query);
    return new NextResponse(JSON.stringify(cachedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(`http://0.0.0.0:3000/search/${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Store the data in the cache
    cache.set(query, data);

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse(JSON.stringify({ message: 'Error fetching data from the API' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
