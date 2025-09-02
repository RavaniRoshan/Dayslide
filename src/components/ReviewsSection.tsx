import { motion } from 'motion/react';

const reviews = [
  {
    name: "Sarah Chen",
    role: "Entrepreneur",
    content: "Dayslide transformed my scattered business ideas into a clear 5-year roadmap. I finally know what to work on today.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Software Developer",
    content: "The ONE Thing methodology clicked for me. I went from overwhelmed to focused, one daily action at a time.",
    rating: 5
  },
  {
    name: "Emily Johnson",
    role: "Creative Director",
    content: "Breaking down my creative dreams into actionable steps made them feel achievable for the first time.",
    rating: 5
  },
  {
    name: "David Park",
    role: "Marketing Manager",
    content: "The goal wizard helped me discover what I really wanted, not just what I thought I should want.",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Consultant",
    content: "I love how it connects my big life vision to what I'm doing right now. It keeps me motivated daily.",
    rating: 5
  },
  {
    name: "Alex Kumar",
    role: "Product Manager",
    content: "Finally, a system that doesn't just track tasks but helps me understand why they matter.",
    rating: 5
  },
  {
    name: "Maria Gonzalez",
    role: "Designer",
    content: "The purpose discovery process was eye-opening. I realized I was chasing the wrong goals.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Freelancer",
    content: "Dayslide gave me clarity on my career direction. The daily actions feel purposeful now.",
    rating: 5
  },
  {
    name: "Rachel Adams",
    role: "Teacher",
    content: "The progressive breakdown from someday to right now is brilliant. It makes everything feel possible.",
    rating: 5
  }
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="min-w-[320px] bg-[#1e293b]/80 backdrop-blur-sm border border-[#3b82f6]/20 rounded-lg p-6 mx-3">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mr-4">
          <span className="text-white font-medium">{review.name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div>
          <h4 className="text-[#f8fafc] font-medium">{review.name}</h4>
          <p className="text-[#cbd5e1] text-[14px]">{review.role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className="text-[#f59e0b] text-[16px]">★</span>
        ))}
      </div>
      <p className="text-[#cbd5e1] text-[14px] leading-relaxed">"{review.content}"</p>
    </div>
  );
}

function ScrollingRow({ reviews, direction, speed }: { 
  reviews: typeof reviews; 
  direction: 'left' | 'right'; 
  speed: number; 
}) {
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];
  
  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? [-1600, 0] : [0, -1600],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

export function ReviewsSection() {
  const row1 = reviews.slice(0, 3);
  const row2 = reviews.slice(3, 6);
  const row3 = reviews.slice(6, 9);

  return (
    <section className="py-20 bg-gradient-to-b from-[#16213e] to-[#1a1a2e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="text-center">
          <h2 className="text-[40px] font-bold text-[#f8fafc] mb-4">
            Trusted by Goal-Oriented Individuals
          </h2>
          <p className="text-[18px] text-[#cbd5e1] max-w-2xl mx-auto">
            See how Dayslide has helped thousands transform their dreams into daily actions
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <ScrollingRow reviews={row1} direction="left" speed={20} />
        <ScrollingRow reviews={row2} direction="right" speed={25} />
        <ScrollingRow reviews={row3} direction="left" speed={18} />
      </div>
    </section>
  );
}