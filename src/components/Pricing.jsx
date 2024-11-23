const plans = [
  {
    name: "Basic",
    price: "0",
    features: ["100 messages per day", "Basic AI models"],
    highlighted: false
  },
  {
    name: "Pro",
    price: "29",
    features: ["Unlimited messages", "Advanced AI models", "Custom personalities"],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom solutions", "Dedicated support", "SLA guarantee"],
    highlighted: false
  }
];

function PricingCard({ name, price, features, highlighted }) {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-lg ${highlighted ? 'border-2 border-indigo-600' : ''}`}>
      <h3 className="text-xl font-semibold mb-4">{name}</h3>
      <p className="text-4xl font-bold mb-6">
        {price === "Custom" ? price : `$${price}`}
        {price !== "Custom" && <span className="text-gray-500 text-lg">/month</span>}
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        {name === "Enterprise" ? "Contact Sales" : "Get Started"}
      </a>
    </div>
  );
}

function Pricing() {
  return (
    <div id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;