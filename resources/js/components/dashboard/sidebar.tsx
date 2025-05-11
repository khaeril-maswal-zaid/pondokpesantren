import Link from "next/link"
import { LayoutDashboard, FileText, Calendar, Layers, FolderGit2, FileQuestion, UserPlus } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-white flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="bg-black text-white p-2 rounded">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-bold text-lg">Laravel Starter Kit</span>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-2">Platform</p>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link href="/blog" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <FileText size={18} />
              <span>Blog</span>
            </Link>
            <Link href="/agenda" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <Calendar size={18} />
              <span>Agenda</span>
            </Link>
            <Link href="/struktur" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <Layers size={18} />
              <span>Struktur</span>
            </Link>
            <Link
              href="/pendaftaran"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700"
            >
              <UserPlus size={18} />
              <span>Pendaftaran Santri Baru</span>
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-4 space-y-1">
          <Link href="/repository" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
            <FolderGit2 size={18} />
            <span>Repository</span>
          </Link>
          <Link
            href="/documentation"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700"
          >
            <FileQuestion size={18} />
            <span>Documentation</span>
          </Link>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2 p-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">TU</span>
            </div>
            <span>Test User</span>
          </div>
        </div>
      </div>
    </div>
  )
}
