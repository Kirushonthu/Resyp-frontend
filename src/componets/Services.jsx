function Services() {
  const services = [
    {
      icon: "🔍",
      title: "Recipe Discovery",
      desc: "Browse and search through a wide collection of recipes filtered by cuisine, rating, and more.",
    },
    {
      icon: "➕",
      title: "Add Your Own",
      desc: "Create and add your own recipes to the collection with name, cuisine, rating, and image.",
    },
    {
      icon: "✏️",
      title: "Edit Recipes",
      desc: "Update any recipe details anytime — keep your collection fresh and accurate.",
    },
    {
      icon: "🗑️",
      title: "Delete Recipes",
      desc: "Remove recipes you no longer need with a simple and safe delete confirmation.",
    },
    {
      icon: "📖",
      title: "Recipe Details",
      desc: "View full recipe details including ingredients, step-by-step instructions, calories, and more.",
    },
    {
      icon: "🔐",
      title: "Secure Access",
      desc: "Your account is protected with secure login and token-based authentication.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-blue-800 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-3">Our Services</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Everything you need to discover and manage your favorite recipes in one place.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Services;