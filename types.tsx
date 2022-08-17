export type User = {
    _id: string;
    username: string;
    name: string;
    roles: Array<string>;
    email: string;
    imageUri?: string;
    faculties?: Array<string>;
    departments?: Array<string>;
    groups?: Array<string>;
};

export type Message = {
    _id?: string;
    content: string;
    createdAt: Date;
    user: User;
    isVisible: boolean;
};

export type ChatRoom = {
    _id?: string;
    users: User[];
    lastMessage: Message;
    countBadge: number; //!!!!!!
};

export type ChatType = {
    _id?: string;
    users: Array<User>;
    messages: Array<Message>;
};

export type News = {
    name: string;
    content: string;
    createdAt: Date;
};

export type Audience = {
    _id: string;
    name: string; ////////////////
};

export type Lesson = {
    _id: string;
    name: string;
};
export type Group = {
    _id: string;
    name: string;
};
export type Department = {
    _id: string;
    name: string;
};
export type Faculty = {
    _id: string;
    name: string;
};
export type Role = {
    _id: string;
    value: string;
};

export type CurrentLesson = {
    _id: string;
    name: Lesson;
    teachers: User[]; ///////////teacher: User
    beginDate: Date;
    endDate: Date;
    classroom: Audience;
    group: Group;
};

type UserMarks = {
    _id?: String;
    username: String;
    password: String;
    name: String;
    roles: Array<Role>;
    email: String;
    imageUri?: String;
    faculties?: Array<Faculty>;
    departments?: Array<Department>;
    groups?: Array<Group>;
};

export type Marks = {
    _id: String;
    user: UserMarks;
    lesson: Lesson;
    allCurrentLessons: [
        {
            _id: String;
            currentLesson: CurrentLesson;
            mark: String;
        }
    ];
};
