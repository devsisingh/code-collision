import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const snlData = await request.json(); // Assuming the request body contains the JSON data

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pinataContent: snlData, // The JSON data you want to save
        pinataMetadata: {
          name: "SNL Data", // Optional: Name your pinned JSON
        }
      }),
    });

    const { IpfsHash } = await res.json();
    console.log(IpfsHash);

    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
