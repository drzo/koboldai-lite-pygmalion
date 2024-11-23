const testimonials = [
  {
    quote: "Pygmalion has revolutionized how I interact with AI. The conversations feel incredibly natural.",
    author: "Sarah Johnson",
    role: "Product Designer"
  },
  {
    quote: "The customization options are amazing. I can create exactly the kind of AI companion I need.",
    author: "Michael Chen",
    role: "Software Engineer"
  },
  {
    quote: "The privacy features give me peace of mind. I know my conversations are secure.",
    author: "Emily Davis",
    role: "Content Creator"
  }
];

function TestimonialCard({ quote, author, role }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <p className="text-gray-600 mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-indigo-600"></div>
        <div className="ml-3">
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;