import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req:Request, {params}:{params:Promise<{subjectId:string}>}){

    try {
        const {subjectId} = await params;

        const subject = await db.subject.findUnique({
            where:{
                id:parseInt(subjectId)
            }
        })

        if (!subject) {
            return new NextResponse("subject not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(subject), { status: 200 });

        
    } catch (error:any) {
        console.log(error.message)
        return new NextResponse("internal server error", {status:500})
        
    }
}