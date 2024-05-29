import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Login, Register } from './pages'
import ProtectedRoute from './pages/ProtectedRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
        children: [{}],
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
