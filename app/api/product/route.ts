import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const url = new URL(request.url)
    const productId = url.searchParams.get("productId")

     if (!productId) {
        return NextResponse.json(
            {
                error: "Missing productId parameter"
            },
            {
                status: 400
            }
        );
    }

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(productId)
            }
        })

        return NextResponse.json(
            product,
            {
                status: 200
            })
    } catch (error) {
        console.error('Error fetching product:', error)
        return NextResponse.json(
            {
                error: 'Failed to fetch product'
            },
            {
                status: 500
            }
        )
    }

}