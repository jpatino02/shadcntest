import { NextResponse } from "next/server";

export async function GET() {
    try {
        const ordersResponse = await fetch(
            "https://dev.meteorcloud.net/api/orders"
        );

        if (!ordersResponse.ok) {
            throw new Error(
                `Error al obtener órdenes: ${ordersResponse.status}`
            );
        }

        const orders = await ordersResponse.json();
        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error en la API:", error);
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
