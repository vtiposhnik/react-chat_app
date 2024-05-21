import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

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

  return currentUser ? routesSignedIn : unauthorized
}

export default App