import { api } from "../../../services/api";

export async function getUserWithOrderId(orderId: string) {

    const id = 'orderid' + orderId;
    const response = await api.post('model/user/get-user', {
        id,
    });

    return response;


}