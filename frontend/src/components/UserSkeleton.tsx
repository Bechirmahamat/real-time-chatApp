import { array } from 'zod'

const UserSkeleton = () => {
    return (
        <div className='drawer-side'>
            <label
                htmlFor='my-drawer-2'
                aria-label='close sidebar'
                className='drawer-overlay'
            ></label>

            <ul className=' p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col gap-y-4 '>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((element) => {
                    return (
                        <li key={element}>
                            <div className='flex flex-col gap-4 w-full'>
                                <div className='flex gap-4 items-center'>
                                    <div className='skeleton w-12 h-12 rounded-full shrink-0'></div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='skeleton h-4 w-16'></div>
                                        <div className='skeleton h-4 w-32'></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default UserSkeleton
