import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/firebase";
import { User } from "../util/interfaces";

interface UserState {
    currentUser: User | null,
    recipientUser: User | null,
    isLoading: boolean,
    setRecipientUser: (user: User | undefined) => void,
    fetchUserInfo: (uid: string) => void,
    fetchUsers: () => Promise<User[]>,
    getUserById: (uid: string) => Promise<User | undefined>
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    recipientUser: null,
    isLoading: true,
    setRecipientUser: (user) => {
        if (user) {
            set({ recipientUser: user })
        }
    },
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
    },
    getUserById: async (uid: string) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data(), "USER");
                return docSnap.data() as User
            } else {
                throw new Error("User not found, it happened in your store!")
            }
        } catch (err) {
            console.log(err);
        }
    }
}));