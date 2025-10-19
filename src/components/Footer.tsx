interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
              Sikh Museum
            </h3>
            <p className={`mt-4 max-w-2xl text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The Sikh Museum is a living space for tradition, Gurmat, and community practice—placing miniature Kangra painting,
              sculpture, and contemporary media side by side so visitors can experience seva, chardi kala, and shared memory in
              every gallery.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
              Contact
            </h3>
            <address className={`not-italic text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>8 Meurants Lane, Glenwood NSW 2768, Australia</p>
              <p className="mt-2">
                <a href="tel:+61433580539" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  0433 580 539
                </a>
              </p>
              <p>
                <a href="mailto:info@asaltd.org.au" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  info@asaltd.org.au
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className={`mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm md:flex-row ${isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
          <p>© 2024 Sikh Museum. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className={`${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>Privacy Policy</a>
            <a href="#" className={`${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
