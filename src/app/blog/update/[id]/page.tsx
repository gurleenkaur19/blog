import React from "react";
import { PostType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/lib/action";
import { notFound } from "next/navigation";
import UpdateBlog from "@/components/updateBlog";

const UpdatePostPage = async ({
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Update Post</h1>
      <UpdateBlog post={post} />
    </div>
  );
};

export default UpdatePostPage;
