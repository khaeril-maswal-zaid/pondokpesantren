import { Link } from '@inertiajs/react';
import { Calendar, FileQuestion, FileText, FolderGit2, Layers, LayoutDashboard, UserPlus } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white">
            <div className="flex items-center gap-2 border-b p-4">
                <div className="rounded bg-black p-2 text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-lg font-bold">Laravel Starter Kit</span>
            </div>

            <div className="flex flex-1 flex-col">
                <div className="p-4">
                    <p className="mb-2 text-sm text-gray-500">Platform</p>
                    <nav className="space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100">
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/blog" className="flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100">
                            <FileText size={18} />
                            <span>Blog</span>
                        </Link>
                        <Link href="/agenda" className="flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100">
                            <Calendar size={18} />
                            <span>Agenda</span>
                        </Link>
                        <Link href="/struktur" className="flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100">
                            <Layers size={18} />
                            <span>Struktur</span>
                        </Link>
                        <Link href="/pendaftaran" className="flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100">
                            <UserPlus size={18} />
                            <span>Pendaftaran Santri Baru</span>
                        </Link>
                    </nav>
                </div>

                <div className="mt-auto space-y-1 p-4">
                    <Link href="/repository" className="flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100">
                        <FolderGit2 size={18} />
                        <span>Repository</span>
                    </Link>
                    <Link href="/documentation" className="flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100">
                        <FileQuestion size={18} />
                        <span>Documentation</span>
                    </Link>
                </div>

                <div className="border-t p-4">
                    <div className="flex items-center gap-2 p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                            <span className="text-sm font-medium">TU</span>
                        </div>
                        <span>Test User</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
