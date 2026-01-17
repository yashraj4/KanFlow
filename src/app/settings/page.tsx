import { Sidebar } from "@/components/Sidebar";
import { Bell, Globe, Mail, Shield, User } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex bg-white h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col h-full bg-slate-50/50">
                <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-xl font-bold text-slate-900">Settings</h1>
                </header>

                <div className="p-8 flex-1 overflow-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                {/* Sidebar */}
                                <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
                                    <nav className="space-y-1">
                                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg">
                                            <User className="h-4 w-4" />
                                            Profile
                                        </a>
                                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                                            <Bell className="h-4 w-4" />
                                            Notifications
                                        </a>
                                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                                            <Shield className="h-4 w-4" />
                                            Security
                                        </a>
                                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                                            <Globe className="h-4 w-4" />
                                            Language & Region
                                        </a>
                                    </nav>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-8">
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Public Profile</h2>
                                    <p className="text-slate-500 text-sm mb-6">Manage how you appear to other users.</p>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6">
                                            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                                                AD
                                            </div>
                                            <div>
                                                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                                                    Change Avatar
                                                </button>
                                                <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size 800K.</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 max-w-lg">
                                            <div className="grid gap-2">
                                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                                <input type="text" defaultValue="Admin User" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
                                            </div>

                                            <div className="grid gap-2">
                                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                    <input type="email" defaultValue="admin@example.com" className="flex h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
                                                </div>
                                            </div>

                                            <div className="grid gap-2">
                                                <label className="text-sm font-medium text-slate-700">Job Title</label>
                                                <input type="text" defaultValue="Product Manager" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
                                            </div>

                                            <div className="grid gap-2">
                                                <label className="text-sm font-medium text-slate-700">Bio</label>
                                                <textarea className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" defaultValue="Managing the team workflow and productivity." />
                                            </div>

                                            <div className="pt-4 flex gap-3">
                                                <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                                    Save Changes
                                                </button>
                                                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
