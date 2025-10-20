import { useAuth } from "../context/AuthContext"
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils"

function StatsCard(props){
    const {lg, title, children} = props
    return (
        <div className={'card stat-card ' + (lg ? ' col-span-2 ' : '')}>
            <h4>{title}</h4>
            {children}
        </div>
    )
}

export default function Stats(){
    const {globalData} = useAuth()
    /*dummy data for now - will be calculated later */
    const stats = calculateCoffeeStats(globalData)

    const caffeineLevel = calculateCurrentCaffeineLevel(globalData)
    const warningLevel = caffeineLevel < statusLevels['low'].maxLevel ? 
        'low': 
        caffeineLevel < statusLevels['moderate'].maxLevel ?
            'moderate' : 'high' 
    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-chart-simple"></i>
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatsCard lg title="Active Caffeine Level">
                    <div className="status-grid">
                        <p><span className="stat-text">{caffeineLevel} mg</span></p>
                        <h5 style={{color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background}}>{warningLevel}</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatsCard>
                <StatsCard title="Daily Caffeine">
                    <p>
                        <span className="stat-text">
                            {stats.daily_caffeine}
                        </span>
                        mg
                    </p>
                </StatsCard>
                <StatsCard title="Avg # of Coffees">
                    <p>
                        <span className="stat-text">
                            {stats.average_coffees}
                        </span>
                    </p>
                </StatsCard>
                <StatsCard title="Daily Cost ($)">
                    <p>$ <span className="stat-text">
                            {stats.daily_cost}
                        </span>
                    </p>
                </StatsCard>
                <StatsCard title="Total Cost ($)">
                    <p>$ <span className="stat-text">
                            {stats.total_cost}
                        </span>
                    </p>
                </StatsCard>
                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number of Purchase</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(globalData).map((coffee, coffeeIndex) => {
                            return (
                                <tr key={coffeeIndex}>
                                    <td>{coffee.coffeeName}</td>
                                    <td>{coffee.count}</td>
                                    <td>{coffee.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}