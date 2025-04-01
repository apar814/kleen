
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';

const BlogPost = ({ title, excerpt, image, category, date, author, slug }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-kleen-card">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center mb-3">
          <span className="text-xs font-medium bg-kleen-mint/10 text-kleen-mint px-2 py-1 rounded-full">{category}</span>
          <div className="flex items-center text-kleen-gray/60 text-xs ml-auto">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-kleen-gray/70 mb-4 flex-1 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-sm text-kleen-gray/70">
            <User className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
          <Link to={`/blog/${slug}`}>
            <Button variant="ghost" size="sm" className="font-medium text-kleen-mint hover:text-kleen-mint hover:bg-kleen-mint/10">
              Read more
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const featuredPost = {
    title: "The Hidden Dangers in Everyday Products - What to Look Out For",
    excerpt: "From parabens to phthalates, learn about the common ingredients lurking in your everyday products that could be impacting your health and how to avoid them.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Health & Wellness",
    date: "June 15, 2023",
    author: "Dr. Sarah Johnson",
    slug: "hidden-dangers-everyday-products"
  };

  const blogPosts = [
    {
      title: "Clean Beauty 101: A Beginner's Guide to Non-Toxic Skincare",
      excerpt: "Navigate the complex world of clean beauty with our comprehensive guide to non-toxic skincare ingredients and product recommendations.",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Beauty",
      date: "May 28, 2023",
      author: "Emma Richards",
      slug: "clean-beauty-101"
    },
    {
      title: "The Truth About 'Natural' and 'Organic' Labels",
      excerpt: "Not all natural and organic products are created equal. Learn how to decode product labels and avoid greenwashing in your shopping.",
      image: "https://images.unsplash.com/photo-1582615787034-53a541618c1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Education",
      date: "May 12, 2023",
      author: "Michael Torres",
      slug: "truth-about-natural-organic-labels"
    },
    {
      title: "Creating a Non-Toxic Home: Room by Room Guide",
      excerpt: "Transform your living space into a healthier environment with our comprehensive guide to eliminating toxins from every room in your home.",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Lifestyle",
      date: "April 30, 2023",
      author: "Jessica Wu",
      slug: "non-toxic-home-guide"
    },
    {
      title: "The Science Behind Phthalates and Why You Should Avoid Them",
      excerpt: "A deep dive into the research on phthalates, their presence in everyday products, and the potential health impacts they may have.",
      image: "https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Science",
      date: "April 18, 2023",
      author: "Dr. Robert Chen",
      slug: "science-behind-phthalates"
    },
    {
      title: "Clean Eating: Avoiding Food Additives and Preservatives",
      excerpt: "Learn which food additives and preservatives may be harmful and how to choose cleaner, healthier options for you and your family.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Nutrition",
      date: "April 5, 2023",
      author: "Maria Sanchez",
      slug: "clean-eating-avoiding-additives"
    },
    {
      title: "Safer Alternatives to Common Household Cleaners",
      excerpt: "Discover effective, non-toxic alternatives to conventional cleaning products that will keep your home clean without the harmful chemicals.",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Home",
      date: "March 22, 2023",
      author: "Thomas Green",
      slug: "safer-household-cleaners"
    }
  ];

  const categories = ["All", "Health & Wellness", "Beauty", "Home", "Nutrition", "Science", "Lifestyle", "Education"];

  return (
    <DashboardLayout 
      title="Kleen Blog" 
      description="Articles, guides, and resources for cleaner, healthier living"
    >
      <div className="grid gap-8">
        {/* Featured Post */}
        <section className="bg-white rounded-xl overflow-hidden shadow-kleen-card">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center mb-3">
                <span className="text-xs font-medium bg-kleen-mint/10 text-kleen-mint px-2 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <span className="text-xs text-kleen-gray/60 ml-2">
                  {featuredPost.date}
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4">{featuredPost.title}</h2>
              <p className="text-kleen-gray/70 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-kleen-gray/70">
                  <User className="h-4 w-4 mr-1" />
                  <span>{featuredPost.author}</span>
                </div>
                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button className="bg-kleen-mint hover:bg-kleen-mint/90">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category, index) => (
              <Button 
                key={index} 
                variant={index === 0 ? "default" : "outline"} 
                className={index === 0 ? "bg-kleen-mint hover:bg-kleen-mint/90" : ""}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </section>
        
        {/* Pagination */}
        <section className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-kleen-mint/10 text-kleen-mint border-kleen-mint">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="bg-kleen-sage/30 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
          <p className="text-kleen-gray/70 mb-6 max-w-lg mx-auto">
            Join our newsletter to receive the latest articles, tips, and resources for cleaner living.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kleen-mint/50"
            />
            <Button className="bg-kleen-mint hover:bg-kleen-mint/90 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
