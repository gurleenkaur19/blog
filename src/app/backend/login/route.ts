import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    // check login and password
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return Response.json({ success: false, message: "InValid" });
    }
    if (user.password != password) {
      return Response.json({ success: false, message: "Invalid" });
    }

    return Response.json({ success: true, data: user });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}