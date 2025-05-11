import BlogPostModal from '@/components/dashboard/blog-post-modal';
import BlogTable from '@/components/dashboard/blog-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Filter, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ blogs }: { blogs: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} button={<BlogPostModal />}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="border-b p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium">Blog Ubay Bin Kaab</h2>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                    <Input type="search" placeholder="Search posts..." className="w-[250px] pl-8" />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <BlogTable dataBlog={blogs} />
                </div>
            </div>
        </AppLayout>
    );
}
