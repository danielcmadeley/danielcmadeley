export function Header() {
  return (
    <header className="mb-12">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-light tracking-wider text-gray-200">
          DANIEL CHARLES MADELEY
        </h1>
        <p className="text-sm tracking-wider">
          <span className="text-gray-500">DESIGN</span>
          <span className="mx-2 text-gray-600">{'//'}</span>
          <span className="text-gray-500">ENGINEER</span>
        </p>
      </div>

      <div className="mt-12 max-w-4xl space-y-2">
        <p className="text-sm tracking-wide leading-relaxed">
          <span className="text-gray-600">&ldquo;BRIDGING </span>
          <span className="text-gray-300">CLASSICAL MECHANICS</span>
          <br />
          <span className="text-gray-600">AND </span>
          <span className="text-gray-300">COMPUTER SCIENCE </span>
          <span className="text-gray-600">TO</span>
          <br />
          <span className="text-gray-600">ENGINEER IMPACTFUL SOLUTIONS</span>
          <br />
          <span className="text-gray-600">FOR </span>
          <span className="text-gray-300">REAL-WORLD </span>
          <span className="text-gray-600">&rdquo;</span>
        </p>
      </div>
    </header>
  )
}
