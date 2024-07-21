import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Get id from params
  try {
    await prisma.post.delete({
      where: { id: parseInt(params.id) },
    });
    return Response.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}