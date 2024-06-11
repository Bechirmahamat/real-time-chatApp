import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import GlobalContextProvider from './GlobalContext.tsx'
import { SocketContextProvider } from './SocketContext.tsx'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 60 * 1000,
        },
    },
})
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
            <SocketContextProvider>
                <App />
            </SocketContextProvider>
        </GlobalContextProvider>
        <Toaster />
    </QueryClientProvider>
)
