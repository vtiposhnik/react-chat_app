import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/firebase";
import { User } from "../util/interfaces";

interface UserState {
    currentUser: User | null,
    isLoading: boolean,
    fetchUserInfo: (uid: string) => void,
    fetchUsers: () => Promise<User[]>
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
                set({ currentUser: docSnap.data() as User, isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false });
            }
        } catch (err) {
            console.log(err);
            return set({ currentUser: null, isLoading: false });
        }
    },
    fetchUsers: async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users: User[] = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data() as User)
        });
    
        return users
    }
}));