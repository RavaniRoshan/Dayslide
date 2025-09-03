import { useState } from 'react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onStartJourney: () => void;
}

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for exploring your purpose and getting started with goal setting',
    features: [
      'AI-powered goal discovery',
      'Basic goal hierarchy (7 levels)',
      'Daily action recommendations',
      'Progress tracking',
      'Mobile app access',
      'Community support'
    ],
    limitations: [
      'Limited to 3 goal hierarchies',
      'Basic AI insights',
      'Standard support'
    ],
    popular: false,
    cta: 'Get Started Free',
    gradient: 'linear-gradient(135deg, #30d158 0%, #00d4ff 100%)'
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For serious goal achievers who want advanced AI coaching and unlimited potential',
    features: [
      'Unlimited goal hierarchies',
      'Advanced AI coaching & insights',
      'Smart daily action optimization',
      'Detailed progress analytics',
      'Success pattern recognition',
      'Priority support',
      'Calendar integration',
      'Team collaboration tools',
      'Export & backup features',
      'Custom reminder schedules'
    ],
    limitations: [],
    popular: true,
    cta: 'Start Pro Trial',
    gradient: 'linear-gradient(135deg, #007aff 0%, #af52de 100%)'
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: 'per month',
    description: 'For organizations and power users who need the ultimate goal achievement platform',
    features: [
      'Everything in Pro',
      'Advanced team management',
      'Custom AI model training',
      'White-label solutions',
      'API access & integrations',
      'Dedicated success manager',
      'Custom onboarding',
      'Advanced security features',
      'SLA guarantees',
      'Custom reporting dashboard'
    ],
    limitations: [],
    popular: false,
    cta: 'Contact Sales',
    gradient: 'linear-gradient(135deg, #ff9500 0%, #cc0000 100%)'
  }
];

function PricingCard({ plan, onStartJourney }: { plan: typeof pricingPlans[0], onStartJourney: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-2xl transition-all duration-300 ease-apple ${
        plan.popular ? 'scale-105' : ''
      }`}
      style={{
        background: 'rgba(28, 28, 30, 0.8)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: plan.popular 
          ? '2px solid #007aff' 
          : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        transform: isHovered ? 'translateY(-8px)' : plan.popular ? 'scale(1.05)' : 'scale(1)',
        boxShadow: plan.popular 
          ? '0 12px 40px rgba(0, 122, 255, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {plan.popular && (
        <div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white text-sm font-semibold"
          style={{
            background: 'linear-gradient(135deg, #007aff 0%, #00d4ff 100%)',
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          }}
        >
          Most Popular
        </div>
      )}

      <div className="text-center mb-8">
        <h3 
          className="mb-2 title-2"
          style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 600,
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          }}
        >
          {plan.name}
        </h3>
        
        <div className="mb-4">
          <span 
            className="text-4xl font-bold"
            style={{
              color: '#ffffff',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
            }}
          >
            {plan.price}
          </span>
          {plan.period !== 'forever' && (
            <span 
              className="ml-2"
              style={{
                color: 'rgba(235, 235, 245, 0.6)',
                fontSize: '1rem',
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
              }}
            >
              {plan.period}
            </span>
          )}
        </div>
        
        <p 
          className="text-center"
          style={{
            color: 'rgba(235, 235, 245, 0.8)',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          }}
        >
          {plan.description}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <h4 
          className="font-semibold"
          style={{
            color: '#ffffff',
            fontSize: '1rem',
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          }}
        >
          What's included:
        </h4>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: '#30d158' }}
              >
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span 
                style={{
                  color: 'rgba(235, 235, 245, 0.8)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {plan.limitations.length > 0 && (
          <>
            <h4 
              className="font-semibold mt-6"
              style={{
                color: 'rgba(235, 235, 245, 0.6)',
                fontSize: '0.875rem',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
              }}
            >
              Limitations:
            </h4>
            <ul className="space-y-2">
              {plan.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start">
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0"
                    style={{ backgroundColor: 'rgba(235, 235, 245, 0.3)' }}
                  >
                    <span className="text-xs" style={{ color: 'rgba(235, 235, 245, 0.6)' }}>–</span>
                  </div>
                  <span 
                    style={{
                      color: 'rgba(235, 235, 245, 0.6)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.4,
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  >
                    {limitation}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button
        onClick={onStartJourney}
        className="w-full py-4 rounded-xl font-semibold transition-all duration-300 ease-apple"
        style={{
          background: plan.gradient,
          color: '#ffffff',
          fontSize: '1rem',
          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered ? '0 8px 24px rgba(0, 122, 255, 0.4)' : '0 4px 16px rgba(0, 122, 255, 0.3)'
        }}
      >
        {plan.cta}
      </button>

      {plan.name === 'Pro' && (
        <p 
          className="text-center mt-3"
          style={{
            color: 'rgba(235, 235, 245, 0.6)',
            fontSize: '0.75rem',
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          }}
        >
          14-day free trial • Cancel anytime
        </p>
      )}
    </motion.div>
  );
}

export function PricingSection({ onStartJourney }: PricingSectionProps) {
  return (
    <section 
      className="py-20"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #1d1d1f 50%, #2c2c2e 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-4 large-title"
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
            }}
          >
            Choose Your Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto body"
            style={{
              fontSize: '1.125rem',
              color: 'rgba(235, 235, 245, 0.8)',
              lineHeight: 1.625,
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
            }}
          >
            From free exploration to enterprise solutions, find the perfect plan to transform your dreams into daily actions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              onStartJourney={onStartJourney}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 
            className="mb-8"
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#ffffff',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
            }}
          >
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 
                className="mb-2"
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                Can I change plans anytime?
              </h4>
              <p 
                style={{
                  color: 'rgba(235, 235, 245, 0.8)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h4 
                className="mb-2"
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                Is my data secure?
              </h4>
              <p 
                style={{
                  color: 'rgba(235, 235, 245, 0.8)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                Absolutely. We use enterprise-grade encryption and never share your personal data.
              </p>
            </div>
            <div className="text-left">
              <h4 
                className="mb-2"
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                What if I need help?
              </h4>
              <p 
                style={{
                  color: 'rgba(235, 235, 245, 0.8)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                Pro and Enterprise users get priority support. Free users have access to our community.
              </p>
            </div>
            <div className="text-left">
              <h4 
                className="mb-2"
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                How does the free trial work?
              </h4>
              <p 
                style={{
                  color: 'rgba(235, 235, 245, 0.8)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                Get full Pro access for 14 days. No credit card required until you decide to continue.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}