-- Insert sample blog categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Crafting Tips', 'crafting-tips', 'Tips and techniques for handcrafting'),
('Behind the Scenes', 'behind-the-scenes', 'Stories from our workshop'),
('Product Stories', 'product-stories', 'The story behind our products'),
('Ethiopian Culture', 'ethiopian-culture', 'Ethiopian cultural heritage and traditions'),
('Sustainability', 'sustainability', 'Our commitment to sustainable practices');

-- Insert sample products
INSERT INTO public.products (name, description, price, category, image_url, stock_quantity) VALUES
('Traditional Kenbet', 'Handwoven traditional Ethiopian bag made with premium materials. Perfect for daily use and special occasions.', 1500.00, 'bag', '/placeholder.svg?height=400&width=400', 25),
('Elegant Znte', 'Beautifully crafted bag with intricate patterns, representing Ethiopian artistry at its finest.', 2500.00, 'bag', '/placeholder.svg?height=400&width=400', 15),
('Comfort Shoes', 'Handmade shoes combining traditional Ethiopian design with modern comfort technology.', 1000.00, 'shoes', '/placeholder.svg?height=400&width=400', 30),
('Traditional Shoes', 'Authentic Ethiopian footwear crafted using time-honored techniques passed down through generations.', 1000.00, 'shoes', '/placeholder.svg?height=400&width=400', 20),
('Home Decor Set', 'Complete set of handcrafted home decoration items to bring Ethiopian elegance to your space.', 3000.00, 'home-decor', '/placeholder.svg?height=400&width=400', 10),
('Handwoven Rugs', 'Traditional Ethiopian rugs perfect for homes and hotels, featuring authentic patterns and colors.', 1500.00, 'home-decor', '/placeholder.svg?height=400&width=400', 12),
('Ceremonial Bag', 'Special occasion bag with gold threading and traditional Ethiopian symbols.', 3500.00, 'bag', '/placeholder.svg?height=400&width=400', 8),
('Wedding Shoes', 'Elegant handcrafted shoes designed specifically for Ethiopian wedding ceremonies.', 2000.00, 'shoes', '/placeholder.svg?height=400&width=400', 15);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, featured_image, author_id, category_id, tags, is_published, published_at) VALUES
('The Art of Ethiopian Handcrafting', 'art-of-ethiopian-handcrafting', 
'Ethiopian handcrafting is more than just creating beautiful objects – it''s about preserving centuries-old traditions and cultural heritage. In this post, we explore the rich history of Ethiopian craftsmanship and how modern artisans are keeping these traditions alive.

## A Rich Heritage

Ethiopia has a long and proud tradition of handcrafting that dates back thousands of years. From the ancient kingdoms of Aksum to the present day, Ethiopian artisans have been creating beautiful and functional items that reflect the country''s rich cultural diversity.

## Traditional Techniques

Our artisans use traditional techniques that have been passed down through generations. These methods not only create beautiful products but also ensure that each piece is unique and carries the soul of its creator.

## Modern Applications

While we honor traditional methods, we also embrace modern design sensibilities to create products that appeal to contemporary tastes while maintaining their authentic Ethiopian character.',
'Discover the rich tradition of Ethiopian handcrafting and how modern artisans preserve ancient techniques.',
'/placeholder.svg?height=600&width=800',
NULL,
4,
ARRAY['crafting', 'tradition', 'ethiopia', 'heritage'],
true,
NOW() - INTERVAL '7 days'),

('Behind the Scenes: Creating the Perfect Kenbet', 'creating-perfect-kenbet',
'Take a journey into our workshop and discover the meticulous process behind creating our signature Kenbet bags. From selecting the finest materials to the final finishing touches, every step is a labor of love.

## Material Selection

The journey begins with carefully selecting the finest materials. We source our threads and fabrics from trusted suppliers who share our commitment to quality and sustainability.

## The Weaving Process

Our master weavers spend hours creating the intricate patterns that make each Kenbet unique. This process requires not only skill but also patience and dedication.

## Quality Control

Every Kenbet undergoes rigorous quality control to ensure it meets our high standards. We check everything from the strength of the weave to the precision of the finishing.',
'Go behind the scenes and see how our master craftsmen create the perfect Kenbet bag.',
'/placeholder.svg?height=600&width=800',
NULL,
2,
ARRAY['kenbet', 'process', 'craftsmanship', 'quality'],
true,
NOW() - INTERVAL '5 days'),

('Sustainable Crafting: Our Environmental Commitment', 'sustainable-crafting-commitment',
'At Millo Handcraft, we believe in creating beautiful products while protecting our environment. Learn about our sustainable practices and commitment to eco-friendly crafting.

## Eco-Friendly Materials

We prioritize the use of natural, biodegradable materials in our products. Our dyes are plant-based, and we avoid synthetic materials whenever possible.

## Waste Reduction

Our workshop operates on a zero-waste principle. Every scrap of material is either reused in other products or composted.

## Community Impact

By working with local artisans and suppliers, we support our community while reducing our carbon footprint through shorter supply chains.',
'Learn about our commitment to sustainable crafting and environmental responsibility.',
'/placeholder.svg?height=600&width=800',
NULL,
5,
ARRAY['sustainability', 'environment', 'eco-friendly', 'community'],
true,
NOW() - INTERVAL '3 days'),

('5 Tips for Caring for Your Handcrafted Items', 'caring-for-handcrafted-items',
'Handcrafted items require special care to maintain their beauty and longevity. Here are our top 5 tips for keeping your Millo Handcraft products in perfect condition.

## 1. Proper Storage

Store your handcrafted items in a cool, dry place away from direct sunlight. Use breathable storage bags to prevent moisture buildup.

## 2. Gentle Cleaning

Clean your items gently with appropriate methods for each material. Avoid harsh chemicals that can damage natural fibers.

## 3. Regular Maintenance

Inspect your items regularly for signs of wear and address any issues promptly to prevent further damage.

## 4. Professional Care

For valuable or delicate items, consider professional cleaning and restoration services.

## 5. Handle with Care

Remember that handcrafted items are unique and irreplaceable. Handle them with the care they deserve.',
'Essential tips for maintaining and caring for your precious handcrafted items.',
'/placeholder.svg?height=600&width=800',
NULL,
1,
ARRAY['care', 'maintenance', 'tips', 'handcrafted'],
true,
NOW() - INTERVAL '1 day');
