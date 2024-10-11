import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json({ status: "failed", message: "Pagination limit must be a number" }, { status: 400 });
  }

  if (isNaN(skip)) {
    return NextResponse.json({ status: "failed", message: "Pagination offset must be a number" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({ take: take, skip: skip });

  return NextResponse.json({
    status: "success",
    todos,
  });
}

const postSchema = yup.object({
  description: yup.string().required().min(3),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(await request.json());
    const todo = await prisma.todo.create({ data: { complete, description } });

    return NextResponse.json({
      status: "success",
      todo,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        error,
      },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });

    return NextResponse.json({
      status: "success",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        error,
      },
      { status: 400 }
    );
  }
}
