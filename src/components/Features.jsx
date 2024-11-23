const features = [
  {
    icon: "🧠",
    title: "Advanced AI Models",
    description: "Access state-of-the-art language models trained on diverse datasets"
  },
  {
    icon: "💬",
    title: "Natural Conversations",
    description: "Engage in fluid, context-aware conversations that feel human-like"
  },
  {
    icon: "🔒",
    title: "Privacy Focused",
    description: "Your conversations are encrypted and never stored without permission"
  }
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 border rounded-lg hover:shadow-lg transition duration-300">
      <div className="text-indigo-600 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Features() {
  return (
    <div id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;