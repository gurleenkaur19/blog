"use server";

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { PostType } from "@/lib/types";
import { getServerSession } from "next-auth";
import { authConfig } from "./authConfig";
import { revalidatePath } from "next/cache";
export async function isLoggedIn() {
  const session = await getServerSession(authConfig);
  console.log(session);
  if (session) {
    return true;
  } else {
    return false;
  }
}

export async function createPost(data: {
  title: string;
  content: string;
  email: string;
}) {
  if (!data.title || !data.content || !data.email) {
    throw new Error("All fields are required");
  }
  try {
    const author = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!author) {
      throw new Error("User not found");
    }
    await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: { connect: { id: author.id } },
      },
    });
  } catch (error) {
    console.log(error);
    console.error("Database Error:", error);
    throw new Error("Failed to create post");
  }
  revalidatePath("/");
  redirect("/");
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });

    return posts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    return post;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post");
  }
}

export async function updatePost(post: PostType) {
  try {
    await prisma.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        content: post.content,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update post");
  }
  redirect(`/blog/${post.id}`);
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete post");
  }
  revalidatePath("/");
  redirect("/");
}
