import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useUserStore } from './zustand/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'
import Settings from './pages/Settings'

const routesSignedIn = (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/settings' element={<Settings />} />
  </Routes>
)
const unauthorized = (
  <Routes>
    <Route path='/' element={<AuthPage />} />
  </Routes>
)

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    console.log(currentUser)

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading === true) return <div className="loading">Loading...</div>

  return (
    <section>
      {currentUser ? routesSignedIn : unauthorized}
      <Notification />
    </section>
  )
}

export default App