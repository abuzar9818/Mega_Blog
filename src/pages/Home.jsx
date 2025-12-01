import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Landing view before there are any posts
  if (posts.length === 0 && !authStatus) {
    const sampleCards = [
      {
        title: "Designing the perfect morning routine",
        image:
          "https://images.pexels.com/photos/4050295/pexels-photo-4050295.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        title: "How to stay productive as a creator",
        image:
          "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        title: "Building a blog with React & Appwrite",
        image:
          "https://images.pexels.com/photos/2706379/pexels-photo-2706379.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ];

    return (
      <div className="w-full min-h-screen py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-300/80 mb-4 font-semibold">
              Welcome to MegaBlog
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover &amp; write{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                stories that matter
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Sign up to create beautiful, rich-text articles with images,
              manage your posts, and share your ideas with the world.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {sampleCards.map((card, index) => (
              <div
                key={card.title}
                className="group rounded-2xl overflow-hidden bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 shadow-2xl shadow-slate-900/50 hover:-translate-y-2 hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Create your own article like this once you sign in.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-300 text-sm sm:text-base">
              Start by creating your first article and make this space your own.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // After login: nicer heading plus list of posts (or empty-state hint)
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-slate-800/50">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent py-4">
              {authStatus ? "Your latest posts" : "Latest posts"}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Browse everything that&apos;s been published on MegaBlog.
            </p>
          </div>
          {authStatus && (
            <a
              href="/add-post"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105"
            >
              <span className="mr-2">✍️</span>
              Write a new post
            </a>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="w-full py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No posts yet
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                You haven&apos;t published any posts yet. Click{" "}
                <span className="font-semibold text-blue-300">"Write a new post"</span>{" "}
                to create your first article.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {posts.map((post) => (
              <div key={post.$id} className="transform transition-all hover:scale-105">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;