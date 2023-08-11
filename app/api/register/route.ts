import argon from "argon2";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await argon.hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
