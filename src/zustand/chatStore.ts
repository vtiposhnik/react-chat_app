import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/firebase";
import { userChat } from "../util/interfaces";

interface ChatState {
    usersChats: [userChat] | null,
    currentChatId: string,
    isLoading: boolean,
    getUsersChats: (userId: string) => Promise<[userChat] | undefined>
    setCurrentChatId: (chatId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
    usersChats: null,
    isLoading: false,
    currentChatId: '',
    getUsersChats: async (userId: string) => {
        const userDocRef = doc(db, "userChats", userId)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
            const user = userDocSnap.data()
            set({ usersChats: user.chats })
            return user.chats as [userChat]
        }
    },
    setCurrentChatId: (chatId: string) => set({ currentChatId: chatId })
}));