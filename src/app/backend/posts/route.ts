import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

export const dynamic = "force-dynamic";

export async function GET(req: Request
) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  let posts;
  if(id){
    posts = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
       });
  }else{
     posts = await prisma.post.findMany({
      include: { author: true },
    });
  }
  
  return new Response(JSON.stringify({
    success: true,
    data: posts
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function POST(request: Request) {
  try {
    const { id, title, content, authorEmail } = await request.json();
console.log(id)
    let result;
    if (id) {
      // Update existing post
      result = await prisma.post.update({
        where: { id:+id },
        data: { title, content },
      });
    } else {
      // Create new post
      result = await prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { email: authorEmail } },
        },
      });
    }
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
