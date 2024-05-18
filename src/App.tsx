import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

const routesSignedIn = (
  <Routes>
      <Route path='/' element={<HomePage />} />
  </Routes>
)

function App() {
  const currentUser = 'exists'

  return currentUser ? routesSignedIn : (<AuthPage />)
}

export default App