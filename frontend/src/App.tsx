import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Login, Register } from './pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/sign-up',
        element: <Register />,
    },
])
function App() {
    return <RouterProvider router={router} />
}

export default App
