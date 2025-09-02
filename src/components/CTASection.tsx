import { Button } from './ui/button';
import { motion } from 'motion/react';

interface CTASectionProps {
  onStartJourney: () => void;
}

export function CTASection({ onStartJourney }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#16213e] to-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[48px] font-bold text-[#f8fafc] mb-6">
            Ready to Transform Your Dreams?
          </h2>
          <p className="text-[20px] text-[#cbd5e1] mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands who've turned their biggest ambitions into daily actions. 
            Start your journey with Dayslide today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={onStartJourney}
              className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-12 py-4 text-[18px] font-medium"
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white px-12 py-4 text-[18px] font-medium"
            >
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-[32px] font-bold text-[#10b981] mb-2">2 min</div>
              <p className="text-[#cbd5e1] text-[14px]">Quick setup process</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[32px] font-bold text-[#3b82f6] mb-2">Free</div>
              <p className="text-[#cbd5e1] text-[14px]">No credit card required</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[32px] font-bold text-[#8b5cf6] mb-2">7 days</div>
              <p className="text-[#cbd5e1] text-[14px]">See results or money back</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}