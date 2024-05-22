import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import Notification from './components/Notification'

const routesSignedIn = (
  <Routes>
    <Route path='/' element={<HomePage />} />
  </Routes>
)
const unauthorized = (
  <Routes>
    <Route path='/' element={<AuthPage />} />
  </Routes>
)

function App() {
  const currentUser = null;

  return (<section>
    {currentUser ? routesSignedIn : unauthorized}
    <Notification />
  </section>)
}

export default App