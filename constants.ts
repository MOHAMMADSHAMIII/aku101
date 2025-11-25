import { 
  Palette, 
  Monitor, 
  PenTool, 
  Search, 
  CheckCircle 
} from "lucide-react";

export interface Project {
  id: number;
  title: string;
  client: string;
  category: string;
  image: string;
  gallery?: string[];
  description: string;
  fullDescription: string;
  tags: string[];
  link?: string;
}

export type Language = 'en' | 'fa';

const SHARED_PROJECT_IMAGES = {
    1: { image: "https://s6.uupload.ir/files/12_439u.jpg", gallery: ["https://s6.uupload.ir/files/12_439u.jpg"] },
    2: { image: "https://s6.uupload.ir/files/6_k1mh.jpg", gallery: ["https://s6.uupload.ir/files/6_k1mh.jpg", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop"] },
    3: { image: "https://s6.uupload.ir/files/8_upy5.jpg", gallery: ["https://s6.uupload.ir/files/8_upy5.jpg", "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop"] },
    4: { image: "https://s6.uupload.ir/files/11_uek.jpg", gallery: ["https://s6.uupload.ir/files/11_uek.jpg", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop"] },
    5: { image: "https://s6.uupload.ir/files/3_4fw6.jpg", gallery: ["https://s6.uupload.ir/files/3_4fw6.jpg", "https://images.unsplash.com/photo-1486406141726-eda3203fe5a9?q=80&w=1600&auto=format&fit=crop"] },
    6: { image: "https://s6.uupload.ir/files/2_flpr.jpg", gallery: ["https://s6.uupload.ir/files/2_flpr.jpg", "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600&auto=format&fit=crop"] }
};

export const CONTENT = {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      process: 'Process',
      contact: 'Contact',
      letstalk: "Let's Talk",
      startProject: "Start Project",
      menuTitle: "Menu",
    },
    hero: {
      featured: "Featured Work",
      headline: "Turning your ideas into captivating visual experiences",
      viewCase: "View Case Study",
      client: "Client",
    },
    about: {
      title: "About Us",
      services: "Services",
      headline: "Bridging dreams &",
      headlineSuffix: "digital reality.",
      skills: ["UI/UX Design", "Brand Identity", "Graphic Design", "Packaging Design"],
    },
    portfolio: {
      label: "Selected Works",
      title: "Our Latest",
      titleSuffix: "Masterpieces.",
      viewAll: "View All Projects",
      tech: "Technologies",
      viewLive: "View Live Project",
    },
    process: {
      label: "How We Work",
      title: "From Idea to",
      titleSuffix: "Execution",
      steps: [
        { id: 1, title: "Discovery", desc: "Consultation to understand your goals.", icon: Monitor },
        { id: 2, title: "Research", desc: "Competitor analysis and moodboarding.", icon: Search },
        { id: 3, title: "Design", desc: "Execution and refinement based on feedback.", icon: Palette },
        { id: 4, title: "Delivery", desc: "Final assets handover and support.", icon: CheckCircle }
      ]
    },
    testimonials: {
      label: "Testimonials",
      title: "Voices of",
      titleSuffix: "Satisfaction.",
      desc: "Don't just take our word for it. Here is what our partners have to say about the collaboration.",
      items: [
        { id: 1, name: "Ali Rezaei", role: "CEO at Techno", text: "Working with Aku was fantastic. They delivered exactly what we had in mind, with quality exceeding our expectations." },
        { id: 2, name: "Sara Ahmadi", role: "Marketing Director", text: "The branding they created for our cafe completely transformed our business image. Highly recommended!" },
        { id: 3, name: "James Wilson", role: "Product Lead", text: "From concept to final delivery, the process was smooth and the results were world-class. A truly creative partner." },
        { id: 4, name: "Emily Carter", role: "Founder at Bloom", text: "The attention to detail in the UI design was impeccable. Our user engagement increased by 40% after the launch." },
        { id: 5, name: "Mohammad Karimi", role: "CTO at NextGen", text: "Professional, timely, and incredibly creative. Aku Design Studio is now our go-to agency for all digital products." }
      ]
    },
    clients: {
      label: "Trusted by Innovative Companies"
    },
    contact: {
      title: "Let's work",
      titleSuffix: "together.",
      desc: "Ready to transform your digital presence? We are here to help you realize your vision.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Email Address",
      projectPlaceholder: "Select Project Type",
      msgPlaceholder: "Tell us about your project...",
      send: "Send Message",
      copyright: "© 2024 Aku Design Studio. Crafted with passion.",
      privacy: "Privacy",
      terms: "Terms",
      options: ["Web Design", "Branding", "Development"]
    },
    projects: [
      {
        id: 1,
        title: "Royal\nAcademy",
        client: "Royal Academy",
        category: "Education",
        ...SHARED_PROJECT_IMAGES[1],
        description: "A prestigious platform for art and design education.",
        fullDescription: "We designed the digital experience for Royal Academy, focusing on accessibility to art history and modern design courses. The interface prioritizes clarity and artistic inspiration.",
        tags: ["Web Design", "Education", "Art"],
        link: "https://www.royalacademy.org.uk/"
      },
      {
        id: 2,
        title: "Medup\nBusiness Coach",
        client: "Medup",
        category: "Consulting",
        ...SHARED_PROJECT_IMAGES[2],
        description: "Personal branding and coaching platform.",
        fullDescription: "Medup required a professional yet approachable brand identity. We created a clean, trust-building visual language that highlights the coach's expertise and success stories.",
        tags: ["Branding", "Web Design", "Identity"],
        link: "https://medup.ir/"
      },
      {
        id: 3,
        title: "VARA\nArchitecte Group",
        client: "VARA Group",
        category: "Architecture",
        ...SHARED_PROJECT_IMAGES[3],
        description: "Minimalist portfolio for architectural excellence.",
        fullDescription: "VARA Architecte Group needed a site that served as a digital gallery for their structures. We utilized negative space and sophisticated typography to let the work speak for itself.",
        tags: ["Web Design", "Architecture", "Minimal"],
        link: "https://www.vara-architects.com/"
      },
      {
        id: 4,
        title: "Skoda\nAuto Iran",
        client: "Skoda",
        category: "Automotive",
        ...SHARED_PROJECT_IMAGES[4],
        description: "Official digital presence for Skoda's market entry.",
        fullDescription: "A comprehensive digital strategy and website design for Skoda Auto Iran, focusing on model showcasing, specifications, and dealership location services.",
        tags: ["Web Design", "Corporate", "Automotive"],
        link: "https://skodair.com/"
      },
      {
        id: 5,
        title: "Karan\nDeniz Aria",
        client: "Karan Deniz Aria",
        category: "Corporate",
        ...SHARED_PROJECT_IMAGES[5],
        description: "Corporate identity and website development.",
        fullDescription: "We established a strong corporate identity for Karan Deniz Aria, reflecting their professionalism and industry standing through a cohesive design system.",
        tags: ["Branding", "Corporate", "Web Design"],
        link: "https://karandeniz.com/"
      },
      {
        id: 6,
        title: "Fiore\nKitchen System",
        client: "Fiore",
        category: "Interior Design",
        ...SHARED_PROJECT_IMAGES[6],
        description: "Modern catalog for premium kitchen systems.",
        fullDescription: "Fiore's project involved creating a digital catalog that highlights the textures, materials, and functionality of their modern kitchen systems.",
        tags: ["Web Design", "Interior", "Catalog"],
        link: "https://fiorekitchen.com/"
      }
    ]
};

export const CLIENTS = [
    { name: "Google", logo: "G" },
    { name: "Spotify", logo: "S" },
    { name: "Airbnb", logo: "A" },
    { name: "Nike", logo: "N" },
    { name: "Apple", logo: "A" },
    { name: "Uber", logo: "U" },
    { name: "Netflix", logo: "N" },
    { name: "Tesla", logo: "T" },
];