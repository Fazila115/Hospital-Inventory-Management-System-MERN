import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ chartData }) => {
    // Prepare data in Recharts format
    const data = [
        { name: 'Items', value: chartData.totalItems || 0 },
        { name: 'Suppliers', value: chartData.totalSuppliers || 0 },
        { name: 'Low Stock', value: chartData.lowStockCount || 0 },
        { name: 'Out of Stock', value: chartData.outStockCount || 0 },
    ];

    const COLORS = ['#F59E0B', '#14B8A6', '#6366F1', '#F43F5E'];

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
            <h3 className="text-cyan-700 font-semibold mb-4 text-lg">
                Recent Activity
            </h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
