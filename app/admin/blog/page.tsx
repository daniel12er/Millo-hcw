"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BlogService } from "@/lib/services/blog-service"
import type { BlogPost } from "@/lib/database"

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await BlogService.getAllPosts()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await BlogService.deletePost(id)
        fetchPosts()
      } catch (error) {
        console.error("Error deleting post:", error)
      }
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus size={16} className="mr-2" />
          New Post
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="w-32 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={post.featured_image || "/placeholder.svg"}
                    alt={post.title}
                    width={128}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <div className="flex gap-2">
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          <Eye size={16} className="mr-2" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant={post.is_published ? "default" : "secondary"}>
                      {post.is_published ? "Published" : "Draft"}
                    </Badge>
                    {post.blog_categories && <Badge variant="outline">{post.blog_categories.name}</Badge>}
                  </div>

                  <p className="text-sm text-gray-500">
                    {post.is_published ? "Published" : "Created"}:{" "}
                    {new Date(post.published_at || post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found.</p>
        </div>
      )}
    </div>
  )
}
