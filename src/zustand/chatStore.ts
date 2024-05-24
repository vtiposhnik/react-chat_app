import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/firebase";
import { Chat } from "../util/interfaces";

interface ChatState {
    currentChat: Chat | null,
    currentChatId: string,
    isLoading: boolean,
    setCurrentChatId: (chatId: string) => void,
    setCurrentChat: (chatId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
    currentChat: null,
    isLoading: false,
    currentChatId: 'default',
    setCurrentChatId: (chatId: string) => set({currentChatId: chatId}),
    setCurrentChat: async (chatId: string) => {
        set({ isLoading: true, currentChat: null , currentChatId: chatId})

        try {
            const chatsRef = doc(db, 'chats', chatId)
            const docSnap = await getDoc(chatsRef);

            if (docSnap.exists()) {
                set({ currentChat: docSnap.data() as Chat, isLoading: false , currentChatId: chatId})
                console.log(docSnap.data())
            }

        } catch (error) {
            console.error(error)
        }

    }
}));