
interface Props {
  title: string
  children?: React.ReactNode
  topMargin?: string
  TopSideButtons?: React.ReactNode
}

function TitleCard ({ title, children, topMargin = 'mt-6', TopSideButtons }: Props) {
  return (
          <div className={` relative flex rounded-md
           focus:outline-2 focus:outline-offset-2 bg-white dark:bg-gray-800 flex-col w-full p-6 bg-base-100 shadow-xl transition-all  ${topMargin}`}>

            {/* Title for Card */}
              <h2 className={`mb-0 ${TopSideButtons ? 'inline-block' : ''}`}>
                {title}

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
                }
              </h2>

              <hr/>

              {/** Card Body */}
              <div className='h-full w-full pb-6 bg-base-100'>
                  {children}
              </div>
          </div>

  )
}

export default TitleCard
