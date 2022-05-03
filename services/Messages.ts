import { mobileURI } from "../config/config";
import $api from "../http";
import { ChatType } from "../types";

export function executeGetMessages(setChatMessages, myId, myName, id, name) {
    console.log(myId, ' : ', myName, ' : ', id, ' : ', name,);

    $api.get(`${mobileURI}/messages/getChatRoomMessages`, {params: { myId: myId, myName: myName, id: id, name: name}})
        .then((response) => {
            setChatMessages(response.data);
        })
        .catch(() => console.log("Ошибка загрузки"));
}

export function getDirectMessages(setChatMessages, chatRoom, myId, myName, id, name) {
    // console.log(myId, ' : ', myName, ' : ', id, ' : ', name,);

    $api.get(`${mobileURI}/messages/getChatRoomMessages`, {params: { myId: myId, myName: myName, id: id, name: name}})
    .then((response) => {
        if(response.data) {
            setChatMessages(response.data);
        } else {
            $api.get(`${mobileURI}/messages/checkExistingChatRoomMessages`, {params: { myId: myId, myName: myName, id: id, name: name}})
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
    
    // firstFetch.then(response => {
    //     if(response.data) {
    //         return firstFetch
    //     } else {
    //         const secondFetch = $api.get(`${mobileURI}/messages/checkExistingChatRoomMessages`, {params: { myId: myId, myName: myName, id: id, name: name}})
    //         secondFetch.then(response => {
    //             if(response.data) {
    //                 return secondFetch;
    //             } 
    //         })
    //     }
    // })
}
