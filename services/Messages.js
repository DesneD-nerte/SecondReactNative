import { mobileURI } from "../config/config";
import $api from "../http";

export function executeGetMessages(setChatMessages, myId, myName, id, name) {
    console.log(myId, ' : ', myName, ' : ', id, ' : ', name,);

    $api.get(`${mobileURI}/messages/getChatRoomMessages`, {params: { myId: myId, myName: myName, id: id, name: name}})
        .then((response) => {
            setChatMessages(response.data);
        })
        .catch(() => console.log("Ошибка загрузки"));
}

