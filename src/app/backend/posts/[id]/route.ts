export const dynamic = "force-dynamic";

export default function DELETE(req:Request){
    return Response.json({
        success: true,
        data: []
    })
}