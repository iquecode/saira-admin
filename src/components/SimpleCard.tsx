
type SimpleCardProps = {
    title: string,
    text: string,
    action?: any;
    backgroud?: string,
}

export function SimpleCard({title, text, action}:SimpleCardProps) {
    return (
        <>
            <div className="p-6 
                            w-full 
                            md:max-w-md 
                            bg-white 
                            rounded-lg 
                            border 
                            border-gray-200 
                            shadow-md 
                            hover:bg-gray-100 
                            dark:bg-gray-800 
                            dark:border-gray-700 
                            dark:hover:bg-gray-700
                            cursor-pointer
                            "
                    onClick={action}
            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-zinc-50">{title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{text}</p>
            </div>
        </>
    )
}