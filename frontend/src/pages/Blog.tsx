import { useState } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import BlogCard from '@/components/BlogCard';
import blogImage from '@/assets/blog-1.jpg';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      title: 'The Future of UI/UX Design: Trends to Watch in 2025',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: blogImage,
      date: 'Jan 15, 2025',
      readTime: '5 min',
      category: 'Design Trends'
    },
    {
      title: 'Building Responsive Web Applications with React and TypeScript',
      excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: blogImage,
      date: 'Dec 28, 2024',
      readTime: '8 min',
      category: 'Development'
    },
    {
      title: 'Color Theory in Digital Design: A Comprehensive Guide',
      excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      image: blogImage,
      date: 'Dec 20, 2024',
      readTime: '6 min',
      category: 'Design Theory'
    },
    {
      title: 'Optimizing User Experience Through Performance',
      excerpt: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
      image: blogImage,
      date: 'Dec 10, 2024',
      readTime: '7 min',
      category: 'UX Research'
    },
    {
      title: 'Modern CSS Techniques for Better Web Layouts',
      excerpt: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
      image: blogImage,
      date: 'Nov 25, 2024',
      readTime: '4 min',
      category: 'CSS'
    },
    {
      title: 'Accessibility in Web Design: Best Practices and Guidelines',
      excerpt: 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.',
      image: blogImage,
      date: 'Nov 15, 2024',
      readTime: '9 min',
      category: 'Accessibility'
    }
  ];

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-hero font-bold mb-6 text-gradient">
            Blog & Insights
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Thoughts on design, development, and digital creativity
          </p>
        </div>
      </section>

      {/* Search and Stats */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 shadow-soft"
              />
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{blogPosts.length} Articles</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Regular Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-hero font-bold mb-8 animate-fade-in">Featured Article</h2>
            <div className="bg-card-gradient rounded-2xl overflow-hidden shadow-medium animate-scale-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative aspect-video lg:aspect-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-primary text-primary-foreground">
                    {blogPosts[0].category}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gradient">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {blogPosts[0].excerpt.substring(0, 200)}...
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime} read</span>
                    </div>
                  </div>
                  <button className="text-primary hover:text-accent font-semibold transition-smooth">
                    Read Full Article →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-hero font-bold">Recent Articles</h2>
            <p className="text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">
                No articles found matching your search
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-primary hover:text-accent font-semibold transition-smooth"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <div 
                  key={index} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-hero font-bold mb-4">Categories</h2>
            <p className="text-muted-foreground">
              Explore articles by topic
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="px-6 py-3 text-base font-medium transition-bounce hover:scale-105 hover:shadow-soft animate-fade-in cursor-pointer hover:bg-primary hover:text-primary-foreground"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;