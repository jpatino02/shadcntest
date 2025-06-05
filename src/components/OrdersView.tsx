import { orderColumns } from "@/app/orders/columns";
import { DataTable } from "./DataTable";
import { SheetForm } from "./SheetForm";

export async function OrdersView() {
    const fixedLeft = ["Order.id"];
    const fixedRight = ["actions"];

    const response = await fetch("http://localhost:3000/api/orders");
    const ordersData = await response.json();

    console.log("Datos obtenidos:", ordersData);
    return (
        <div className="container mx-auto py-10">
            <SheetForm />
            <DataTable
                columns={orderColumns}
                data={ordersData}
                fixedLeft={fixedLeft}
                fixedRight={fixedRight}
                title="Orders"
            />
        </div>
    );
}
