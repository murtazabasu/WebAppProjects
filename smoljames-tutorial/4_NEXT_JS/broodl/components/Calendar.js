'use client'
import { baseRating, gradients } from '@/utils'
import { Fugaz_One, Open_Sans } from "next/font/google";
import React, { useState } from 'react'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400']});

const months = { 
        'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
}
const monthArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// replace data with demoData for demo mode
export const demoData = {
    "15": 2, "16": 4, "17": 1, "18": 3, "19": 5,
    "20": 2, "21": 4, "22": 1, "23": 3, "24": 5,
}

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props

    const now = new Date()
    const currMonth = now.getMonth()
    const [selectedMonth, setSelectedMonth] = useState(monthArr[currMonth])
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    const numericMonth = monthArr.indexOf(selectedMonth)
    const data = completeData?.[selectedYear]?.[numericMonth] || {}
    console.log('CALENDAR DATA:', data)

    function handleIncrementMonth(val) {
        // +1 or -1
        // if we go past december or before january, update year too
        if (numericMonth + val < 0) {
            //set month value = 11 and decrement year
            setSelectedYear(curr => curr - 1)
            setSelectedMonth(monthArr[monthArr.length - 1])
        } else if (numericMonth + val > 11) {
            // set month value = 0 and increment year
            setSelectedYear(curr => curr + 1)
            setSelectedMonth(monthArr[0])
        } else {
            setSelectedMonth(monthArr[numericMonth + val])
        }
    }

    console.log('SELECTED MONTH:', selectedMonth)    

    // Get first day of month
    const dateOfMonth = new Date(selectedYear, monthArr.indexOf(selectedMonth), 1)
    // first day of month as number (0-6)
    const firstDayOfMonth = dateOfMonth.getDay()
    const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()
    const daysToDisplay = firstDayOfMonth + daysInMonth
    console.log(dateOfMonth, firstDayOfMonth, daysInMonth, daysToDisplay)
    
    const numRows = (Math.floor(daysToDisplay / 7)) + ( daysToDisplay % 7 ? 1 : 0)
    console.log('NUM ROWS:', numRows)
    console.log({...Array(numRows).keys()})
    console.log('FIRST DAY IN ' + selectedMonth + ':', dayList[firstDayOfMonth])

    return (
    <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-5 gap-4'>
            <button onClick={() => {
                handleIncrementMonth(-1)
            }} className='mr-auto text-lg sm:text-xl duration-200 hover:opacity-60 md:text-lg text-indigo-500'>
                <i className="fa-solid fa-circle-chevron-left"></i>
            </button>
            <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient ' + fugaz.className}>{selectedMonth}, {selectedYear}</p>
            <button onClick={() => {
                handleIncrementMonth(+1)
            }} className='ml-auto text-lg sm:text-xl duration-200 hover:opacity-60 md:text-lg text-indigo-500'>
                <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
        </div>
        <div className='flex flex-col overflow-hidden gap-1
        py-4 sm:py-6 md:py-10'>
            {[...Array(numRows).keys()].map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='grid grid-cols-7'>
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            let dayIndex = (rowIndex * 7 + dayOfWeekIndex) - (firstDayOfMonth - 1)
                            let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true
                            let isToday = dayIndex === now.getDate()
                            if (!dayDisplay) {
                                return (
                                    <div className='bg-white' key={dayOfWeekIndex}/>
                                )
                            }
                            let color = demo ? 
                            gradients.indigo[baseRating[dayIndex]] : 
                            dayIndex in data ? 
                            gradients.indigo[data[dayIndex]] : 
                            'white'

                            return (
                                <div style={{background: color}} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' 
                                + (isToday ? ' border-indigo-400' : ' border-indigo-100')
                                + (color === 'white' ? ' text-indigo-400' : ' text-white')} key={dayOfWeekIndex}>
                                    <p>{dayIndex}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    </div>
    )
}