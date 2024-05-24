import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/firebase";
import { Chat } from "../util/interfaces";

interface ChatState {
    currentChat: Chat | null,
    isLoading: boolean,
    setCurrentChat: (chatId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
    currentChat: null,
    isLoading: false,
    setCurrentChat: async (chatId: string) => {
        set({ isLoading: true, currentChat: null })

        try {
            const chatsRef = doc(db, 'chats', chatId)
            const docSnap = await getDoc(chatsRef);

            if (docSnap.exists()) {
                set({ currentChat: docSnap.data() as Chat, isLoading: false })
                console.log(docSnap.data())
            }

        } catch (error) {
            console.error(error)
        }

    }
}));