import { Sidebar } from "@/components/Sidebar";
import { Mail, MoreHorizontal, UserPlus } from "lucide-react";

const teamMembers = [
    { id: 1, name: "Admin User", role: "Product Owner", email: "admin@example.com", avatar: "AD", color: "from-indigo-500 to-purple-500" },
    { id: 2, name: "Sarah Miller", role: "Frontend Developer", email: "sarah@example.com", avatar: "SM", color: "from-emerald-500 to-teal-500" },
    { id: 3, name: "Alex Lee", role: "UI/UX Designer", email: "alex@example.com", avatar: "AL", color: "from-amber-500 to-orange-500" },
    { id: 4, name: "John Doe", role: "Backend Engineer", email: "john@example.com", avatar: "JD", color: "from-blue-500 to-cyan-500" },
    { id: 5, name: "Emily Chen", role: "QA Engineer", email: "emily@example.com", avatar: "EC", color: "from-rose-500 to-pink-500" },
    { id: 6, name: "David Kim", role: "DevOps", email: "david@example.com", avatar: "DK", color: "from-violet-500 to-fuchsia-500" },
];

export default function TeamPage() {
    return (
        <div className="flex bg-white h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col h-full bg-slate-50/50">
                <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-xl font-bold text-slate-900">Team Members</h1>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Invite Member
                    </button>
                </header>

                <div className="p-8 flex-1 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow group relative">
                                <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>

                                <div className={`h-20 w-20 rounded-full bg-gradient-to-tr ${member.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4`}>
                                    {member.avatar}
                                </div>

                                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                                <p className="text-sm text-indigo-600 font-medium mb-4">{member.role}</p>

                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                    <Mail className="h-3 w-3" />
                                    {member.email}
                                </div>

                                <div className="flex gap-2 w-full mt-auto">
                                    <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-2 rounded-lg text-sm font-medium transition-colors">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Invite Card */}
                        <button className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:bg-indigo-50/20 transition-all group min-h-[280px]">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors mb-4">
                                <UserPlus className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">Invite New Member</h3>
                            <p className="text-sm text-slate-500">Collaborate with your team</p>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
