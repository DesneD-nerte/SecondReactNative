export type User = {
    // _id: String;
    // name: String;
    // imageUri: String;
    _id: String,
    username: String,
    name: String,
    roles: Array<String>,
    email: String,
	imageUri?: String
}

export type Message = {
    _id?: String;
    content: String;
    createdAt: Date;/////Number
    user: User;
}

export type ChatRoom = {
    _id?: String;
    users: User[];
    lastMessage: Message;
}

export type ChatType = {
	_id?: String;
	users: Array<User>;
	messages: Array<Message>;
}

export type News = {
	name: string,
	content: string,
	createdAt: Date
}
