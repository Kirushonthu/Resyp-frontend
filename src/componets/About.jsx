function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-blue-800 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-3">About Resyp</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Your go-to platform for discovering, managing, and exploring delicious recipes from around the world.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Resyp was built to make cooking accessible and fun for everyone. Whether you're a home cook or a food enthusiast,
            we bring thousands of recipes to your fingertips — organized, searchable, and easy to follow.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Recipes", value: "50+", icon: "🍽️" },
            { label: "Cuisines", value: "10+", icon: "🌍" },
            { label: "Happy Users", value: "1000+", icon: "😊" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-800">{stat.value}</div>
              <div className="text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💡 What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Fresh Content", desc: "Recipes sourced from diverse cuisines updated regularly.", icon: "🌿" },
              { title: "Easy to Use", desc: "Simple and clean interface so you can focus on cooking.", icon: "✨" },
              { title: "Community First", desc: "Built for food lovers who want to share and discover.", icon: "🤝" },
              { title: "Always Free", desc: "Access all recipes without any subscription or fees.", icon: "🎁" },
            ].map((val, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-3xl">{val.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{val.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default About; 