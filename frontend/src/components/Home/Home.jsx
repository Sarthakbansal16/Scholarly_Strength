import React from 'react'
import ImageUploader from './ImageUploader'
import MotivationalQuotes from './MotivationalQuotes'

function Home() {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-slate-700">
      <h1 className="text-xl font-serif font-bold text-white mt-16 mb-16">
          Upload some of your Memories here to make this page more Lovable.
        </h1>
        <ImageUploader/>
      </div>
      <div className="w-1/2 bg-slate-700 text-white">
        <MotivationalQuotes/>
      </div>
    </div>
  )
}

export default Home