import { motion } from 'motion/react';

const features = [
  {
    title: "AI-Powered Goal Analysis",
    description: "Advanced AI analyzes your detailed vision and creates a personalized pathway from dreams to daily actions",
    icon: "🧠",
    benefits: [
      "Comprehensive vision analysis in 30 seconds",
      "Personalized goal hierarchy generation",
      "Context-aware action recommendations"
    ]
  },
  {
    title: "Smart Daily Actions",
    description: "AI-optimized actions that adapt to your energy level, available time, and success patterns",
    icon: "⚡",
    benefits: [
      "Real-time action optimization",
      "Success probability scoring",
      "Adaptive difficulty scaling"
    ]
  },
  {
    title: "Intelligent Progress Tracking",
    description: "AI-powered insights track your patterns and provide personalized recommendations",
    icon: "📊",
    benefits: [
      "Pattern recognition and insights",
      "Predictive success analytics",
      "Personalized motivation messages"
    ]
  },
  {
    title: "Dynamic Plan Refinement",
    description: "Your plan evolves with you through continuous AI refinement based on feedback and progress",
    icon: "🔄",
    benefits: [
      "Real-time plan adjustments",
      "Feedback-driven improvements",
      "Continuous learning optimization"
    ]
  }
];

const timeHorizons = [
  { label: "Someday Goals", description: "Life Vision", color: "#8b5cf6" },
  { label: "5-Year Goals", description: "Long-term Direction", color: "#3b82f6" },
  { label: "1-Year Goals", description: "Annual Targets", color: "#10b981" },
  { label: "Monthly Goals", description: "Focused Sprints", color: "#f59e0b" },
  { label: "Weekly Goals", description: "Action Blocks", color: "#ef4444" },
  { label: "Daily Actions", description: "Concrete Steps", color: "#8b5cf6" },
  { label: "Right Now", description: "Immediate Action", color: "#3b82f6" }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-[#f8fafc] mb-4">
            AI-Powered Features for
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
              {' '}Smart Goal Achievement
            </span>
          </h2>
          <p className="text-[18px] text-[#cbd5e1] max-w-3xl mx-auto">
            Experience the future of goal setting with AI that understands your vision, 
            analyzes your patterns, and creates a personalized success pathway just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#3b82f6]/20 rounded-lg p-8 hover:border-[#3b82f6]/40 transition-all duration-300"
            >
              <div className="text-[40px] mb-4">{feature.icon}</div>
              <h3 className="text-[24px] font-bold text-[#f8fafc] mb-4">{feature.title}</h3>
              <p className="text-[#cbd5e1] mb-6 leading-relaxed">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-[#cbd5e1] text-[14px]">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* The ONE Thing Methodology */}
        <div className="text-center mb-12">
          <h2 className="text-[40px] font-bold text-[#f8fafc] mb-4">
            Based on "The ONE Thing" Methodology
          </h2>
          <p className="text-[18px] text-[#cbd5e1] max-w-3xl mx-auto mb-12">
            Progressive goal breakdown from macro to micro timeframes, helping you focus on what matters most at every level
          </p>
        </div>

        <div className="relative">
          {/* Timeline Visualization */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#8b5cf6] via-[#3b82f6] to-[#10b981]" />
          
          <div className="space-y-12">
            {timeHorizons.map((horizon, index) => (
              <motion.div
                key={horizon.label}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#3b82f6]/20 rounded-lg p-6">
                    <h3 className="text-[20px] font-bold text-[#f8fafc] mb-2">{horizon.label}</h3>
                    <p className="text-[#cbd5e1]">{horizon.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex w-12 h-12 rounded-full border-4 border-[#1a1a2e] flex-shrink-0 items-center justify-center z-10" 
                     style={{ backgroundColor: horizon.color }}>
                  <span className="text-white font-bold text-[14px]">{index + 1}</span>
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}