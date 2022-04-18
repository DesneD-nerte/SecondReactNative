export type User = {
    // _id: String;
    // name: String;
    // imageUri: String;
    _id: String,
    username: String,
    name: String,
    roles: Array<String>,
    email: String,
	imageUri?: String,
    faculties?: Array<String>,
    departments?: Array<String>,
    groups?: Array<String>
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




export type Audience = {
    _id: String;
    name: String;
}

export type Lesson = {
    _id: String;
    name: String;
}
export type Group = {
    _id: String;
    name: String;
}
export type Department = {
    _id: String;
    name: String;
}
export type Faculty = {
    _id: String;
    name: String;
}
export type Role = {
    _id: String;
    value: String
}

export type CurrentLesson = {
    _id: String,
    name: Lesson,
    teacher: User,
    beginDate: Date,
    endDate: Date,
    classroom: Audience,
    group: Group
}



type UserMarks = {
    _id?: String,
    username: String,
    password: String,
    name: String,
    roles: Array<Role>,
    email: String,
	imageUri?: String,
    faculties?:Array<Faculty>,
    departments?:Array<Department>,
    groups?:Array<Group>
}

export type Marks = {
    _id: String,
    user: UserMarks,
    lesson: Lesson,
    allCurrentLessons: [
        {
            _id: String,
            currentLesson: CurrentLesson,
            mark: String
        }
    ]
}