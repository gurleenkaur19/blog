import { Button } from "@/components/ui/button";
import { getPostById } from "@/lib/action";
import { PostType } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const post: PostType = (await getPostById(params.id)) as PostType;
  if (!post) {
    notFound();
  }
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{post.content}</p>
        <div className="flex space-x-4">
          <Link
            href={`/blog/update/${post.id}`}
            className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Edit Post
          </Link>

          <Link
            href="/"
            className="inline-block px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
