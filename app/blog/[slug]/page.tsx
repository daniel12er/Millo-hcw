import { notFound } from "next/navigation"
import { BlogService } from "@/lib/services/blog-service"
import BlogPost from "@/components/blog-post"
import RelatedPosts from "@/components/related-posts"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await BlogService.getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await BlogService.getPostsByCategory(post.blog_categories?.slug || "")

  return (
    <div className="min-h-screen pt-20">
      <BlogPost post={post} />
      <RelatedPosts posts={relatedPosts.filter((p) => p.id !== post.id).slice(0, 3)} />
    </div>
  )
}
