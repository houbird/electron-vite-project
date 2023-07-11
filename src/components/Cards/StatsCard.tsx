function LittleCard ({ title, icon, value, description }: any) {
  return (
    <div className="stats bg-white dark:bg-gray-800 shadow rounded-md grid-flow-col overflow-x-auto ">
      <div className="stat w-full grid-cols-1 inline-grid px-6 py-4 gap-1">
        <div className="stat-figur row-start-1 row-span-3 col-start-2 place-self-center justify-self-center">{icon}</div>
        <div className="stat-title col-start-1 whitespace-nowrap text-gray-400 dark:text-gray-400">{title}</div>
        <div className={'stat-value col-start-1 whitespace-nowrap text-4xl font-extrabold text-'}>{value}</div>
        <div className={'stat-desc col-start-1 whitespace-nowrap text-xs  '}>{description}</div>
      </div>
    </div>
  )
}
export default LittleCard
