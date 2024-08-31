import React from 'react'
import './Stats.css'

export default function Stats({ title, value}) {
    return (
        <div className="stat-div">
            <p className="stat-title">{title}</p>
            <p className="stat-value">{value}</p>
        </div>
    )
}
