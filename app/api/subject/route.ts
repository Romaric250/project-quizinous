import { NextFetchEvent, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req:Request){
    try {

        const { name } = await req.json();


        if(!name) { 
            return new NextResponse("name is required", {status:404})
        }

       await db.subject.create({
            data:{
                name:name as string
            }
        })

        return new NextResponse("subject created", { status: 201 });


        
    } catch (error:any) {
        console.log(error.message)
        return new NextResponse("internal server error", { status: 500 });
        
    }
}