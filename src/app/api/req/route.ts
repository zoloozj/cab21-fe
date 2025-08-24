import { MAIN_API } from '@/config-global';
import axios from 'axios'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {

    try {   
        const body = await req.json();
        const {serviceUrl} = body;
        delete body.serviceUrl;
        const url = `${MAIN_API}/${serviceUrl}`
        console.log(url, "___URL")
        const response = await axios.post(url, body);
        return NextResponse.json(response.data);
    } catch (e:any) {
        return NextResponse.json(
            { error: e || 'Internal Server Error' },
            { status: 500 }        
    )
    }

}