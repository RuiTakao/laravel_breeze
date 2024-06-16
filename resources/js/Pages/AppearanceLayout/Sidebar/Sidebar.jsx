import React from "react"
import Layout from "./Layout"

export default function Sidebar({ layout }) {
    return (
        <div className='h-screen bg-gray-100 w-64 fixed right-0 top-0 shadow-lg'>
            <ul className="pt-16">
                <li className="px-4 py-4 border-b border-slate-300">
                    <Layout layout={layout} />
                </li>
            </ul>
        </div>
    )
}