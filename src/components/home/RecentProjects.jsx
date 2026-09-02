import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecentProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Brand Identity Design',
      category: 'Graphics Design',
      image: 'Modern brand identity design with logo and color palette',
    },
    {
      id: 2,
      title: 'Explainer Animation',
      category: 'Animation',
      image: 'Colorful explainer animation storyboard and characters',
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'Modern e-commerce website on laptop and mobile devices',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-[#1044ff] uppercase tracking-wider">
              Recent Work
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              Featured Projects
            </h2>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="hidden md:flex rounded-full">
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer bg-white rounded-[2.5rem] p-4 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-white hover:border-[#1044ff]"
            >
              <Link to={`/portfolio/${project.id}`}>
                <div className="relative overflow-hidden rounded-[2rem] mb-4 aspect-[4/3]">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={project.title} src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0020bf]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2">
                      View Case Study <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#eb7444] text-xs font-bold uppercase tracking-wider mb-3 border-2 border-[#1044ff]">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1044ff] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
          <Button asChild variant="outline" className="rounded-full w-full">
            <Link to="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;