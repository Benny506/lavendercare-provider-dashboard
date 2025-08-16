import React, { useState, useEffect } from 'react'
import DateRangePicker from '@/components/DateRangePicker'
import TopDivider from '@/components/TopDivider'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { Download } from 'lucide-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const sampleData = [
    { name: 'Dr. Grace Bello', New: 70, Ongoing: 45, Closed: 40 },
    { name: 'Dr. Emeka Obi', New: 50, Ongoing: 18, Closed: 22 },
    { name: 'Nurse Lillian James', New: 33, Ongoing: 35, Closed: 37 },
    { name: 'Dr. David Okorie', New: 20, Ongoing: 82, Closed: 42 },
    { name: 'Therapist Aisha Lawal', New: 40, Ongoing: 15, Closed: 70 },
    { name: 'Doula Funke Adeyemi', New: 15, Ongoing: 14, Closed: 100 },
    { name: 'Dr. Chuka Nwosu', New: 57, Ongoing: 53, Closed: 94 },
    { name: 'Dr. Ade', New: 15, Ongoing: 38, Closed: 40 },
    { name: 'Nurse Titi', New: 57, Ongoing: 95, Closed: 83 },
    { name: 'Therapist Vivian', New: 52, Ongoing: 95, Closed: 30 },
    { name: 'Doctor Anun', New: 54, Ongoing: 55, Closed: 64 },
    { name: 'Nurse Adebayo', New: 43, Ongoing: 15, Closed: 88 },
]

const Insights = () => {
    const [data, setData] = useState(sampleData)

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <TopDivider />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
                <DateRangePicker />
                <Button className="flex items-center gap-2 px-4 py-2 bg-white border-gray-400 text-black rounded-md focus:outline-none">
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Export</span>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Summary Cards */}
                <div className="flex-1 bg-white rounded-xl p-6">
                    <p className="text-md font-medium">Average Consultations per Doctor</p>
                    <div className="flex items-start gap-4 py-4">
                        <p className="font-bold text-3xl">25</p>
                    </div>
                    <hr className="bg-[#D2C3EF] h-0.5 border-none" />
                    <div className='flex items-center gap-2 text-primary-600'>
                        <p className="text-lg font-extrabold mt-3 cursor-pointer">View Full Report</p>
                        <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl" />
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-xl p-6">
                    <p className="text-md font-medium">High‑Risk Case Trends</p>
                    <div className="flex items-start gap-4 py-4">
                        <p className="font-bold text-3xl">12</p>
                    </div>
                    <hr className="bg-[#D2C3EF] h-0.5 border-none" />
                    <div className='flex items-center gap-2 text-primary-600'>
                        <p className="text-lg font-extrabold mt-3 cursor-pointer">View Full Report</p>
                        <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl" />
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-xl p-6">
                <p className="text-md font-medium mb-4">Consultations per Doctor</p>
                {data && data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={data}
                            margin={
                                isSmallScreen
                                    ? { top: 20, right: 10, left: -25, bottom: 40 }
                                    : { top: 20, right: 30, left: 0, bottom: 50 }
                            }
                            barCategoryGap="20%"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                interval={0}
                                angle={
                                    isSmallScreen ? -75 : 340
                                }
                                textAnchor="end"
                                height={
                                    isSmallScreen ? 80 : 60
                                }
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} />
                            {/* Grouped bars with custom colors */}
                            <Bar dataKey="New" fill="#38A169" />
                            <Bar dataKey="Ongoing" fill="#319795" />
                            <Bar dataKey="Closed" fill="#6B46C1" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-64 flex items-center justify-center text-gray-400">
                        <p className="text-2xl font-bold">NO DATA</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Insights
