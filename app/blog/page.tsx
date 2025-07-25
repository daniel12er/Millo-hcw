import { BlogService } from "@/lib/services/blog-service"
import BlogCard from "@/components/blog-card"
import BlogHero from "@/components/blog-hero"
import BlogCategories from "@/components/blog-categories"

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([BlogService.getAllPosts(), BlogService.getAllCategories()])

  return (
    <div className="min-h-screen pt-20">
      <BlogHero />

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <BlogCategories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}
