import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample data for view
const samplePost = {
  id: "1",
  title: "Getting Started with Next.js",
  slug: "getting-started-with-nextjs",
  content:
    "Next.js is a React framework that enables server-side rendering and generating static websites. It's a great choice for building modern web applications.\n\nIn this tutorial, we'll cover the basics of Next.js and how to get started with it. We'll also look at some of the key features that make Next.js a popular choice for building React applications.\n\nNext.js provides a great developer experience with features like:\n\n- Server-side rendering\n- Static site generation\n- API routes\n- File-based routing\n- Built-in CSS and Sass support\n- Code splitting and bundling\n- Fast refresh\n\nThese features make Next.js a powerful framework for building modern web applications.",
  category: "Development",
  status: "Published",
  date: "2023-05-15",
  author: "John Doe",
  readTime: "5 min read",
  featuredImage: "/placeholder.svg",
}

export default function ViewBlogPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the post data based on the ID
  const post = samplePost

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

      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Post Preview</h2>
          <Link href={`/blog/${params.id}/edit`}>
            <Button>Edit Post</Button>
          </Link>
        </div>

        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-[300px] object-cover rounded-lg mb-6"
            />

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
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
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
