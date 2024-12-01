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

export async function PUT(req:Request, {params}:{params:Promise<{subjectId:string}>}){
    try {
        const {subjectId} = await params;

        const { name } = await req.json();

        if(!name) { 
            return new NextResponse("name is required", {status:404})
        }

        await db.subject.update({
            where:{
                id:subjectId as string 
            },
            data:{
                name:name as string
            }
        })

        return new NextResponse("subject updated", { status: 200 });

        
    } catch (error:any) {
        console.log(error.message)
        return new NextResponse("internal server error", {status:500})
        
    }
}

export async function DELETE(req:Request, {params}:{params:Promise<{subjectId:string}>}){
    try {
        const {subjectId} = await params;

        await db.subject.delete({
            where:{
                id:parseInt(subjectId)
            }
        })

        return new NextResponse("subject deleted", { status: 200 });

        
    } catch (error:any) {
        console.log(error.message)
        return new NextResponse("internal server error", {status:500})
            
        }
    }