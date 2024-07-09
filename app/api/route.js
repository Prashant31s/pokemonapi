import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
let pokemon= {name: '', height: ''};
export async function GET(request) {
    return NextResponse.json({"hi": "hi"});
}
export async function HEAD(request) {}
 
export async function POST(request, response) {
    let req = await request.json();
    console.log(req)
    try {
        pokemon.name = req.name;
        pokemon.height = req.height;
        return NextResponse.json({body: pokemon}, {status: 200});
    } catch (error) {
        return NextResponse.json({body: error}, {status: 500});
    }
}