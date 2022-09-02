import { Device } from "./pages/Device";
import { Auth } from "./pages/Auth";
import { Shop } from "./pages/Shop";
import { SHOP_ROUTE, LOGIN_ROUTE, REGISTRARTION_ROUTE, DEVICE_ROUTE, BASKET_ROUTE, ADMIN_ROUTE } from"./utils/const";
import { Basket } from "./pages/Basket";
import { Admin } from "./pages/Admin";

export const publicRouts = [
    {
        path:SHOP_ROUTE,
        Component:Shop
    },
    {
        path:DEVICE_ROUTE + '/:id',
        Component:Device
    },
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:REGISTRARTION_ROUTE,
        Component:Auth
    },
]

export const authRouts = [
    {
        path:SHOP_ROUTE,
        Component:Shop
    },
    {
        path:DEVICE_ROUTE + '/:id',
        Component:Device
    },
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:REGISTRARTION_ROUTE,
        Component:Auth
    },
    {
        path:BASKET_ROUTE,
        Component:Basket
    },
    {
        path:ADMIN_ROUTE,
        Component:Admin
    },
]