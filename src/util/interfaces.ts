export interface User {
    id: string,
    username: string,
    email: string
}
export interface userChat {
    chatId: string,
    lastMessage: string,
    partnerId: string,
    user: User
}
export interface Chat {
    chatId: string,
    createdAt: Date,
    messages: []
}
