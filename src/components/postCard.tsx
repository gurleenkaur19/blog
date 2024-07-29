"use client";

import { PostType } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"; // Assuming you have Card components in "./ui/card"
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { deletePost } from "@/lib/action";

const PostCard = ({ post }: { post: PostType }) => {
  const { data: session } = useSession();

  return (
    <Card className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>
          <Link
            href={`./blog/${post.id}`}
            className="text-xl font-semibold text-blue-600 hover:underline"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
        <p className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      {session && (
        <CardFooter className="flex justify-end gap-2">
          <Link href={`./blog/update/${post.id}`}>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Update
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={async () => {
              await deletePost(post.id);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
