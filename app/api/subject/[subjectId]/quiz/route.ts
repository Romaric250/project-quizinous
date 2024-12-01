import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req:Request, {params}:{params:Promise<{subjectId:string}>}){
    try {

        const {subjectId} = await params;

        const quizzes = await db.quiz.findUnique({
            where:{
                subjectId:subjectId as string
            }
        })

        return new NextResponse(JSON.stringify(quizzes), { status: 200 });
        
    } catch (error:any) {
        console.log(error.message)
        return new NextResponse("internal server error", {status:500})
        
    }
}

export async function POST(req:Request, {params}:{params:Promise<{subjectId:string}>}){
    try {

        const {subjectId} = await params;
        const {name} = await req.json();

        if(!name) { 
            return new NextResponse("name is required", {status:404})
        }

        if(!subjectId) { 
            return new NextResponse("subjectId is required", {status:404})
        }

        const doessubjectexist = await db.subject.findUnique({
            where:{
                id:subjectId 
            }
        })

        if (!doessubjectexist) {
            return new NextResponse("subject not found", { status: 404 });
        }

        const createquiz = await db.quiz.create({
            data:{
                name:name as string,
                subjectId:subjectId
            }
        })

        return new NextResponse(JSON.stringify(createquiz), { status: 201 });

       
        
    } catch (error:any) {
        console.log(error.message)
        return new NextResponse("internal server error", {status:500})
        
    }
}