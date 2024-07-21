"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogPostCardType, ResponseType } from "@/lib/types";
import { BlogCard } from "@/components/custom/BlogCard";
import { useRouter } from "next/navigation";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPostCardType[]>([]);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id)); // Remove deleted post from the state
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    const apiCall = async () => {
      const res = await fetch("/backend/posts");
      const data: ResponseType = await res.json();
      if (data.success) setPosts(data.data);
      else console.log(data.message);
    };
    apiCall();
  }, []);

  return (
    <>
      <Head>
        <title>Blog List</title>
      </Head>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center my-8">
          <h1 className="text-4xl font-bold text-center">Blog List</h1>
          <button
            onClick={() => router.push("/create")} // Adjust the route as needed
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create New Post
          </button>
        </div>
        <div className="space-y-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogList;
