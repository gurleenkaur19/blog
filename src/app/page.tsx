"use client ";
import React from "react";
import PostCard from "@/components/postCard";
import { PostType } from "@/lib/types";
import { getAllPosts } from "@/lib/action";

const Blog = async () => {
  const posts: PostType[] = (await getAllPosts()) as PostType[];

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <div key={post.id} className="w-full">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
