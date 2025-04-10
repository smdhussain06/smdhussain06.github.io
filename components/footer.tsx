export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 md:py-8 border-t border-brand-orange/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0">
            <a href="#" className="text-lg md:text-xl font-bold text-gradient">
              SMDHussain
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="opacity-70 text-xs md:text-sm">&copy; {currentYear} Mohammed Hussain. All Rights Reserved.</p>
            <p className="text-xs opacity-50 mt-1">AI-Powered Design Alchemist</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
