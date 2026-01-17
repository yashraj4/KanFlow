"use client";

import { BarChart2, CheckSquare, Layout, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();
    const navItems = [
        { icon: Layout, label: 'Board', href: '/' },
        { icon: CheckSquare, label: 'Backlog', href: '/backlog' },
        { icon: BarChart2, label: 'Reports', href: '/reports' },
        { icon: Users, label: 'Team', href: '/team' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 z-50">
            <div className="p-6 flex items-center space-x-3 text-white">
                <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
                    J
                </div>
                <span className="font-bold text-xl tracking-tight">Jira Clone</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-500/10 text-indigo-400'
                                    : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'
                                }`} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center w-full space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer text-left">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                        AD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">Admin User</span>
                        <span className="text-xs text-slate-500">Premium Plan</span>
                    </div>
                </button>
            </div>
        </aside>
    );
}
