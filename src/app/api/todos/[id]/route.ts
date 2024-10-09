import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export interface Segments {
  params: {
    id: string;
  };
}

const UUIDschema = yup.object({
  id: yup.string().uuid().required(),
});

export async function GET(request: Request, { params }: Segments) {
  try {
    const { id } = await UUIDschema.validate(params);

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return NextResponse.json({ status: "failed", message: `TO-DO with id ${id} does not exist` }, { status: 404 });
    }

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

const putSchema = yup.object({
  description: yup.string().optional().min(3),
  complete: yup.boolean().optional().default(false),
});

export async function PUT(request: Request, { params }: Segments) {
  try {
    const { id } = await UUIDschema.validate(params);

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return NextResponse.json({ status: "failed", message: `TO-DO with id ${id} does not exist` }, { status: 404 });
    }

    const { complete, description } = await putSchema.validate(await request.json());

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        complete,
        description,
      },
    });

    return NextResponse.json({
      status: "success",
      todo: updatedTodo,
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
