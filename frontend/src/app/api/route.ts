import { DefaultApi, Configuration } from "@/api/generated";
export const dynamic = "force-static";

const basePath =
    process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_API_BASE_URL
        ? "http://localhost:3001"
        : process.env.NEXT_PUBLIC_API_BASE_URL;

const config = new Configuration({
    basePath
});

const api = new DefaultApi(config);

export async function GET() {
    return Response.json(await api.tasksGet());
}

export async function POST(req: Request) {
    const createTaskDTO = await req.json();
    return Response.json(await api.tasksPost({ createTaskDTO }));
}

export async function PATCH(req: Request) {
    const { id } = await req.json();
    return Response.json(await api.tasksIdTogglePatch({ id }));
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    await api.tasksIdDelete({ id });
    return Response.json(JSON.stringify({ id }));
}
