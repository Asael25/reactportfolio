export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-600">Surya Asael</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><a href="#about" className="hover:text-purple-500">Tentang</a></li>
          <li><a href="#projects" className="hover:text-purple-500">Proyek</a></li>
          <li><a href="#contact" className="hover:text-purple-500">Kontak</a></li>
        </ul>
      </div>
    </nav>
  );
}