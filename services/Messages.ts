import { mobileURI } from "../config/config";
import $api from "../http";
import { ChatType } from "../types";

export function executeGetMessages(setChatMessages, myId, id) {
    $api.get(`${mobileURI}/messages/getChatRoomMessages`, {params: { myId: myId, id: id, skip: 0}})
        .then((response) => {
            setChatMessages(response.data);
        })
        .catch(() => console.log("Ошибка загрузки"));
}

export function getDirectMessages(setChatMessages, chatRoom, myId, id, countSkipMessages) {
    $api.get(`${mobileURI}/messages/getChatRoomMessages`, {params: { myId: myId, id: id, skip: countSkipMessages}})
    .then((response) => {
        if(response.data) {
            setChatMessages(response.data);
        } else {
            $api.get(`${mobileURI}/messages/checkExistingChatRoomMessages`, {params: { myId: myId, id: id}})
            .then(response => {
                if(!response.data) {
                    setChatMessages(chatRoom);
                    $api.post(mobileURI + '/messages/addRoom', {chatRoom: chatRoom})
                    .catch(err => {
                        console.log("Ошибка создания новой беседы");
                    })
                }
            })
        }
    })
    .catch((err) => console.log(err));
}
