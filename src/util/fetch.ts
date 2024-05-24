// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// export async function fetchUsers() {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     const users = []
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       users.push(doc.data())
//     });

//     return users
// }