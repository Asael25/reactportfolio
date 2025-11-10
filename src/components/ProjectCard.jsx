import { FaLaptopCode } from 'react-icons/fa';

export default function ProjectCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-purple-500 hover:scale-105">
      <div className="flex items-center gap-3 mb-4 text-purple-600">
        <FaLaptopCode size={24} />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}