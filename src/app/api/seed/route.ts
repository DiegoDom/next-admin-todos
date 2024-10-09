import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [{ description: "Aprender NextJS" }, { description: "Aprender PostgresQL" }, { description: "Aprender Remix" }, { description: "Aprender Docker", complete: true }, { description: "Aprender Python" }],
  });

  return NextResponse.json({
    status: "Seed executed successfully",
  });
}
