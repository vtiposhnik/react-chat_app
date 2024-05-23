import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/firebase";
import { User } from "../util/interfaces";

interface UserState {
    currentUser: User | null,
    isLoading: boolean,
    fetchUserInfo: (uid: string) => void
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid: string) => {
        if (!uid) return set({ currentUser: null, isLoading: false });

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false });
            }
        } catch (err) {
            console.log(err);
            return set({ currentUser: null, isLoading: false });
        }
    }
}));