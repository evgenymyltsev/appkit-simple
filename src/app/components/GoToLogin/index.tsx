'use client'

export const GoToLogin = () => {
  return (
    <button
      className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={() => (window.location.href = '/')}
    >
      Go to auth page
    </button>
  )
}
