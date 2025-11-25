export type QuestionType = 'text' | 'textarea' | 'choice' | 'phone' | 'email';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface BriefConfig {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const COMMON_QUESTIONS: Question[] = [
  {
    id: 'name',
    text: "What is your full name?",
    type: 'text',
    placeholder: "John Doe",
    required: true
  },
  {
    id: 'email',
    text: "What is your email address?",
    type: 'email',
    placeholder: "john@example.com",
    required: true
  }
];

const END_QUESTIONS: Question[] = [
  {
    id: 'budget',
    text: "What is your estimated budget for this project?",
    type: 'choice',
    options: ["< $1k", "$1k - $5k", "$5k - $10k", "$10k+"],
    required: true
  },
  {
    id: 'timeline',
    text: "What is your expected timeline?",
    type: 'choice',
    options: ["ASAP", "1-2 Months", "3-6 Months", "Flexible"],
    required: true
  },
  {
    id: 'phone',
    text: "Finally, please provide your phone number so we can reach you directly.",
    type: 'phone',
    placeholder: "+1 (555) 000-0000",
    required: true
  }
];

export const BRIEFS: Record<string, BriefConfig> = {
  'branding': {
    id: 'branding',
    title: 'Brand Identity & Logo',
    description: 'Let\'s define the soul of your business.',
    questions: [
      ...COMMON_QUESTIONS,
      {
        id: 'brand_name',
        text: "What is the exact brand name?",
        type: 'text',
        placeholder: "Brand Name",
        required: true
      },
      {
        id: 'brand_values',
        text: "What are your core brand values?",
        type: 'textarea',
        placeholder: "Trust, Innovation, Sustainability...",
        required: true
      },
      {
        id: 'style_preference',
        text: "Which style best describes your vision?",
        type: 'choice',
        options: ["Minimal & Modern", "Classic & Luxury", "Playful & Colorful", "Tech & Futuristic"],
        required: true
      },
      {
        id: 'deliverables',
        text: "What items do you need?",
        type: 'textarea',
        placeholder: "Logo, Business Cards, Letterhead, Brand Guidelines...",
        required: true
      },
      ...END_QUESTIONS
    ]
  },
  'social-media': {
    id: 'social-media',
    title: 'Social Media Strategy',
    description: 'Elevate your digital presence and engagement.',
    questions: [
      ...COMMON_QUESTIONS,
      {
        id: 'platforms',
        text: "Which platforms are we focusing on?",
        type: 'choice',
        options: ["Instagram & TikTok", "LinkedIn & Twitter", "YouTube", "All of the above"],
        required: true
      },
      {
        id: 'goal',
        text: "What is the primary goal?",
        type: 'choice',
        options: ["Brand Awareness", "Lead Generation", "Community Building", "Sales"],
        required: true
      },
      {
        id: 'content_type',
        text: "What type of content do you need?",
        type: 'textarea',
        placeholder: "Reels, Carousel posts, Stories, Banners...",
        required: true
      },
      ...END_QUESTIONS
    ]
  },
  'ui-ux': {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Help us understand your product and user needs.',
    questions: [
      ...COMMON_QUESTIONS,
      {
        id: 'product_type',
        text: "What type of product are we designing?",
        type: 'choice',
        options: ["Mobile App", "Web Application", "Website", "Dashboard", "Other"],
        required: true
      },
      {
        id: 'target_audience',
        text: "Who is your target audience?",
        type: 'textarea',
        placeholder: "Describe age, profession, habits...",
        required: true
      },
      {
        id: 'competitors',
        text: "List 2-3 main competitors or inspirations.",
        type: 'textarea',
        placeholder: "Links to websites or app names...",
        required: false
      },
      {
        id: 'features',
        text: "What are the core features of the product?",
        type: 'textarea',
        placeholder: "User login, payment gateway, search, etc...",
        required: true
      },
      ...END_QUESTIONS
    ]
  },
  'packaging': {
    id: 'packaging',
    title: 'Packaging Design',
    description: 'Creating the physical experience for your product.',
    questions: [
      ...COMMON_QUESTIONS,
      {
        id: 'product_desc',
        text: "What is the product inside the package?",
        type: 'textarea',
        required: true
      },
      {
        id: 'material',
        text: "Do you have a preferred packaging material?",
        type: 'choice',
        options: ["Cardboard Box", "Pouch/Bag", "Glass Bottle", "Sustainable/Eco", "Not sure yet"],
        required: true
      },
      {
        id: 'print_specs',
        text: "Are there specific print constraints or die-lines?",
        type: 'text',
        placeholder: "e.g., 4-color process, foil stamping...",
        required: false
      },
      ...END_QUESTIONS
    ]
  },
  'graphic-design': {
    id: 'graphic-design',
    title: 'General Graphic Design',
    description: 'Tell us about your visual communication needs.',
    questions: [
      ...COMMON_QUESTIONS,
      {
        id: 'project_type',
        text: "What are you looking to create?",
        type: 'choice',
        options: ["Marketing Materials", "Presentation Deck", "Infographics", "Other"],
        required: true
      },
      {
        id: 'content',
        text: "Do you already have the text/copy ready?",
        type: 'choice',
        options: ["Yes, it's ready", "No, I need help with copy", "Partial draft"],
        required: true
      },
      ...END_QUESTIONS
    ]
  }
};