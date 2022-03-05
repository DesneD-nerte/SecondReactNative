export type User = {
    _id: String;
    name: String;
    imageUri: String;
}

export type Message = {
    _id: String;
    content: String;
    createdAt: Number;
    user: User;
}

export type ChatRoom = {
    _id: String;
    users: User[];
    lastMessage: Message;
}