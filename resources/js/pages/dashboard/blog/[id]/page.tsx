import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Image, Tag, User } from 'lucide-react';

// Sample data for view
const samplePost = {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    content:
        "Next.js is a React framework that enables server-side rendering and generating static websites. It's a great choice for building modern web applications.\n\nIn this tutorial, we'll cover the basics of Next.js and how to get started with it. We'll also look at some of the key features that make Next.js a popular choice for building React applications.\n\nNext.js provides a great developer experience with features like:\n\n- Server-side rendering\n- Static site generation\n- API routes\n- File-based routing\n- Built-in CSS and Sass support\n- Code splitting and bundling\n- Fast refresh\n\nThese features make Next.js a powerful framework for building modern web applications.",
    category: 'Development',
    status: 'Published',
    date: '2023-05-15',
    author: 'John Doe',
    readTime: '5 min read',
    featuredImage: '/placeholder.svg',
};

export default function ViewBlogPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch the post data based on the ID
    const post = samplePost;

    return (
        <div className="p-6">
            <div className="mb-6">
                <Link href="/blog">
                    <Button variant="ghost" className="gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog List
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-medium">Post Preview</h2>
                    <Link href={`/blog/${params.id}/edit`}>
                        <Button>Edit Post</Button>
                    </Link>
                </div>

                <div className="p-6">
                    <div className="mx-auto max-w-3xl">
                        <Image
                            src={post.featuredImage || '/placeholder.svg'}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="mb-6 h-[300px] w-full rounded-lg object-cover"
                        />

                        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

                        <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Tag className="h-4 w-4" />
                                <span>{post.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none">
                            {post.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
