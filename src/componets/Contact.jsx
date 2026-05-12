import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    toast.success("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-blue-800 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>

        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Have a question or feedback? We'd love to hear from you!
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          {[
            {
              icon: "📧",
              title: "Email",
              detail: "support@resyp.com",
            },
            {
              icon: "📍",
              title: "Location",
              detail: "Chennai, Tamil Nadu, India",
            },
            {
              icon: "🕐",
              title: "Working Hours",
              detail: "Mon - Fri, 9am to 6pm",
            },
          ].map((info, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm p-6 flex gap-4 items-start"
            >
              <div className="text-3xl">{info.icon}</div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  {info.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {info.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Send a Message
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className={inputClass}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* About Project + Developer */}
      <div className="max-w-5xl mx-auto px-6 pb-12 flex flex-col gap-8">
        {/* Project Info */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🍽️ About Resyp
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Resyp is a full-stack inspired recipe management web app built
            with React and powered by the DummyJSON API.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: "⚛️",
                title: "Frontend",
                detail: "React + Vite + Tailwind CSS",
              },
              {
                icon: "🌐",
                title: "API",
                detail: "DummyJSON Recipes API",
              },
              {
                icon: "🔐",
                title: "Auth",
                detail: "JWT Token Based Login",
              },
            ].map((tech, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>

                <h3 className="font-semibold text-gray-800 text-sm">
                  {tech.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {tech.detail}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">
            ✨ Features
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Browse 50+ recipes from multiple cuisines",
              "Add, edit, and delete recipes",
              "Search recipes by name or cuisine",
              "View detailed recipe with ingredients & steps",
              "Protected routes with login authentication",
              "Responsive design for mobile and desktop",
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span className="text-green-500 font-bold">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Developer */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            👨‍💻 Developer
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-blue-800 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              K
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-800">
                Kishore
              </h3>

              <p className="text-blue-800 font-medium text-sm mb-3">
                Full-Stack Developer
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Passionate about building clean and functional web applications.
                Experienced in MERN stack development with hands-on
                internship experience.
              </p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                {[
                  "React",
                  "Node.js",
                  "MongoDB",
                  "Express",
                  "Tailwind CSS",
                  "REST APIs",
                  "JWT Auth",
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex justify-center sm:justify-start gap-4">
                <a
                  href="https://github.com/Kirushonthu"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-800 transition"
                >
                  🐙 GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/kirushonthu"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-800 transition"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;