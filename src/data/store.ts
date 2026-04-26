// Feedback type
export interface Feedback {
  id: string;
  type: 'request' | 'issue' | 'suggestion';
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: number;
  status: 'pending' | 'read' | 'resolved';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  articleCount?: number;
}

export interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  readTime: number;
  image: string;
  featured?: boolean;
  content?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const categories: Category[] = [
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car repairs, maintenance, and troubleshooting guides',
    image: '/category-automotive.jpg',
    articleCount: 45,
  },
  {
    id: 'gardening',
    name: 'Gardening',
    description: 'Plant care, landscaping, and growing techniques',
    image: '/category-gardening.jpg',
    articleCount: 38,
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description: 'Recipes, techniques, and kitchen tips',
    image: '/category-cooking.jpg',
    articleCount: 52,
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, hardware, and digital skills',
    image: '/category-technology.jpg',
    articleCount: 41,
  },
  {
    id: 'home-repair',
    name: 'Home Repair',
    description: 'Fixes, improvements, and DIY projects',
    image: '/category-homerepair.jpg',
    articleCount: 33,
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Wellness, fitness, and self-care guides',
    image: '/category-health.jpg',
    articleCount: 29,
  },
];

/* export const articles: Article[] = [
  // Featured Articles
  {
    id: 'repair-car-tyre-lexus',
    title: 'How to Repair a Car Tyre on Lexus ES350',
    description: 'Complete guide to changing and repairing tyres on your Lexus ES350 with step-by-step instructions and safety tips.',
    category: 'Automotive',
    categoryId: 'automotive',
    readTime: 15,
    image: '/HowToNew/article-tyre-repair.jpg',
    featured: true,
    content: [
      'Step 1: Find a safe location to park your vehicle on level ground.',
      'Step 2: Engage the parking brake and turn on hazard lights.',
      'Step 3: Locate the spare tyre, jack, and lug wrench in your trunk.',
      'Step 4: Loosen the lug nuts slightly before jacking up the car.',
      'Step 5: Position the jack under the designated jacking point.',
      'Step 6: Raise the vehicle until the tyre is off the ground.',
      'Step 7: Remove the lug nuts and take off the flat tyre.',
      'Step 8: Mount the spare tyre and hand-tighten the lug nuts.',
      'Step 9: Lower the car and tighten the lug nuts in a star pattern.',
      'Step 10: Check tyre pressure and drive to a repair shop.',
    ],
  },
  {
    id: 'plant-grow-corn',
    title: 'How to Plant and Grow Corn in Your Backyard',
    description: 'From seed selection to harvest - everything you need to know about growing sweet corn at home.',
    category: 'Gardening',
    categoryId: 'gardening',
    readTime: 12,
    image: '/HowToNew/article-corn-planting.jpg',
    featured: true,
    content: [
      'Step 1: Choose a sunny location with at least 6-8 hours of direct sunlight.',
      'Step 2: Prepare the soil by tilling and adding compost.',
      'Step 3: Select corn varieties suited for your climate zone.',
      'Step 4: Plant seeds 1-2 inches deep and 4-6 inches apart.',
      'Step 5: Space rows 24-30 inches apart for proper pollination.',
      'Step 6: Water consistently, keeping soil moist but not waterlogged.',
      'Step 7: Fertilize when plants reach 12 inches tall.',
      'Step 8: Watch for pests and diseases, treat as needed.',
      'Step 9: Harvest when silks turn brown and kernels are plump.',
      'Step 10: Enjoy fresh corn within hours of picking for best flavor.',
    ],
  },
  {
    id: 'cook-perfect-rice',
    title: 'How to Cook Perfect Rice Every Time',
    description: 'Master the art of fluffy, perfectly cooked rice with these simple techniques and tips.',
    category: 'Cooking',
    categoryId: 'cooking',
    readTime: 8,
    image: '/HowToNew/article-rice-cooking.jpg',
    featured: true,
    content: [
      'Step 1: Rinse rice thoroughly until water runs clear.',
      'Step 2: Use the right ratio: 1 cup rice to 1.5-2 cups water.',
      'Step 3: Bring water to a boil before adding rice.',
      'Step 4: Add a pinch of salt for flavor.',
      'Step 5: Reduce heat to low and cover tightly.',
      'Step 6: Simmer for 18-20 minutes without lifting the lid.',
      'Step 7: Remove from heat and let stand for 5-10 minutes.',
      'Step 8: Fluff with a fork to separate grains.',
      'Step 9: Serve immediately for best texture.',
      'Step 10: Store leftovers in an airtight container.',
    ],
  },
  {
    id: 'build-custom-pc',
    title: 'How to Build a Custom PC from Scratch',
    description: 'Step-by-step guide to assembling your own gaming or workstation PC with component selection tips.',
    category: 'Technology',
    categoryId: 'technology',
    readTime: 45,
    image: '/HowToNew/article-pc-build.jpg',
    featured: true,
    content: [
      'Step 1: Plan your build and select compatible components.',
      'Step 2: Gather tools: screwdriver, zip ties, and thermal paste.',
      'Step 3: Install the CPU onto the motherboard carefully.',
      'Step 4: Mount the CPU cooler with proper thermal paste application.',
      'Step 5: Install RAM modules in the correct slots.',
      'Step 6: Mount the motherboard in the case with standoffs.',
      'Step 7: Install the power supply and route cables.',
      'Step 8: Install storage drives (SSD/HDD).',
      'Step 9: Install the graphics card in the PCIe slot.',
      'Step 10: Connect all power and data cables.',
      'Step 11: Power on and install your operating system.',
    ],
  },
  // Latest Articles
  {
    id: 'change-brake-pads-toyota',
    title: 'How to Change Brake Pads on Toyota Camry',
    description: 'Save money on maintenance by learning to replace brake pads yourself safely.',
    category: 'Automotive',
    categoryId: 'automotive',
    readTime: 20,
    image: '/HowToNew/article-brake-pads.jpg',
  },
  {
    id: 'grow-tomatoes-containers',
    title: 'How to Grow Tomatoes in Containers',
    description: 'Perfect for small spaces - grow delicious tomatoes on your balcony or patio.',
    category: 'Gardening',
    categoryId: 'gardening',
    readTime: 10,
    image: '/HowToNew/article-tomatoes.jpg',
  },
  {
    id: 'make-pizza-dough',
    title: 'How to Make Homemade Pizza Dough',
    description: 'Create restaurant-quality pizza at home with this easy dough recipe.',
    category: 'Cooking',
    categoryId: 'cooking',
    readTime: 25,
    image: '/HowToNew/article-pizza-dough.jpg',
  },
  {
    id: 'setup-home-wifi',
    title: 'How to Set Up a Home WiFi Network',
    description: 'Get your home connected with this comprehensive networking guide.',
    category: 'Technology',
    categoryId: 'technology',
    readTime: 15,
    image: '/HowToNew/article-wifi.jpg',
  },
  {
    id: 'fix-leaky-faucet',
    title: 'How to Fix a Leaky Faucet',
    description: 'Stop that annoying drip and save water with this simple repair guide.',
    category: 'Home Repair',
    categoryId: 'home-repair',
    readTime: 12,
    image: '/HowToNew/article-faucet.jpg',
  },
  {
    id: 'morning-yoga-routine',
    title: 'How to Start a Morning Yoga Routine',
    description: 'Begin your day with energy and focus through these gentle yoga poses.',
    category: 'Health',
    categoryId: 'health',
    readTime: 8,
    image: '/HowToNew/article-yoga.jpg',
  },
  {
    id: 'detail-car-interior',
    title: 'How to Detail Your Car Interior',
    description: 'Make your car look like new with professional detailing techniques.',
    category: 'Automotive',
    categoryId: 'automotive',
    readTime: 30,
    image: '/HowToNew/article-car-detail.jpg',
  },
  {
    id: 'propagate-succulents',
    title: 'How to Propagate Succulents',
    description: 'Multiply your succulent collection with these easy propagation methods.',
    category: 'Gardening',
    categoryId: 'gardening',
    readTime: 6,
    image: '/HowToNew/article-succulents.jpg',
  },
]; */