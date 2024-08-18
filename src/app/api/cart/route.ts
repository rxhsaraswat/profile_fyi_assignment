import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import prisma from '@/libs/prisma';
import { authOptions } from '@/libs/auth';


export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("Session in GET /api/cart:", session); // Debugging log
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
  });
  return NextResponse.json(cartItems);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, name, price, image } = await req.json();

  try {
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: productId,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        userId: session.user.id,
        productId: productId,
        name,
        price,
        image,
        quantity: 1,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error in POST /api/cart:", error);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, quantity } = await req.json();

  try {
    const cartItem = await prisma.cartItem.update({
      where: { id: id },
      data: { quantity: quantity },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error in PUT /api/cart:", error);
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  console.log("Attempting to delete item with id:", id);

  try {
    const deletedItem = await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });
    console.log("Successfully deleted item:", deletedItem);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/cart:", error);
    return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 });
  }
}
