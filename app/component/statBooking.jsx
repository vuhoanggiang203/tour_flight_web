'use client'
import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts'

export default function BookingChart() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('month')
  const [type, setType] = useState('tour')
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`/api/stat/booking?filter=${filter}&type=${type}`)
    const json = await res.json()
    console.log(json)
    setData(json.map(item => ({
     label: filter === 'month'
  ? `${item.name.split('-')[1]}/${item.name.split('-')[0]}` // "03/2024"
  : `Năm ${item.name}`,
      count: item.count
    })))
  }
  fetchData()
}, [filter, type])


  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Thống kê  </h2>
        <div className="flex gap-4">
          <select
  className="
    block
    w-full
    px-4
    py-2
    pr-8             
    leading-tight
    bg-white
    border border-gray-300
    rounded-md
    shadow-sm        
    focus:outline-none
    focus:ring-2    
    focus:ring-blue-500
    focus:border-blue-500
    appearance-none  
    text-gray-700
    cursor-pointer
  "
  value={type}
  onChange={e => setType(e.target.value)}
>
  
  <option value="tour">Tour</option>
  <option value="flight">Vé máy bay</option>
</select>

          <select
            className="border rounded px-2 py-1"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
