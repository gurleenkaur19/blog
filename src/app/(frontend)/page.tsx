"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogPostCardType, ResponseType } from "@/lib/types";
import { BlogCard } from "@/components/custom/BlogCard";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPostCardType[]>([]);
  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
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
        <h1 className="text-4xl font-bold text-center my-8">Blog List</h1>
        <div className=" space-y-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogList;
