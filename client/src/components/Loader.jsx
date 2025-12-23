import React from 'react'

const Loader = () => {
  return (
    <div>
      <div className="flex flex-row justify-center gap-2 mt-20 min-h-screen">
        <div className="w-6 h-6 rounded-full bg-red-500 animate-bounce" />
        <div className="w-6 h-6 rounded-full bg-red-500 animate-bounce" />
        <div className="w-6 h-6 rounded-full bg-red-500 animate-bounce" />
      </div>
    </div>
  )
}

export default Loader;
