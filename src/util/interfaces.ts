export interface User {
    id: string,
    username: string,
    email: string,
    pfp: string
}
export interface userChat {
    chatId: string,
    lastMessage: string,
    recipientId: string,
}
export interface userChatExtended {
    0: userChat,
    user: User | null
}
export interface Chat {
    chatId: string,
    createdAt: Date,
    messages: []
}
