import { notFound } from "next/navigation"
import { BlogService } from "@/lib/services/blog-service"
import BlogCard from "@/components/blog-card"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await BlogService.getPostsByCategory(params.slug)
  const categories = await BlogService.getAllCategories()
  const currentCategory = categories.find((cat) => cat.slug === params.slug)

  if (!currentCategory) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{currentCategory.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{currentCategory.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
