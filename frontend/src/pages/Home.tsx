import { Conversations, Messages, OpenSide } from '../components'
import { useGetConversation } from './../../hooks/queryAndMutation'

const Home = () => {
    const { data: conversations, isFetching, isError } = useGetConversation()

    return (
        <div className='drawer lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col '>
                <div className='w-full z-10 lg:hidden h-16 bg-neutral flex justify-end items-center px-4 bg sticky top-0'>
                    <OpenSide />
                </div>
                {/* Page content here */}
                <Messages />
            </div>
            <Conversations isLoading={isFetching} data={conversations} />
        </div>
    )
}
export default Home
// {
//     /* <label
//                     htmlFor='my-drawer-2'
//                     className='btn btn-primary drawer-button lg:hidden'
//                 >
//                     Open drawer
//                 </label> */
// }
