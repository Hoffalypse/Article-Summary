import { hoff } from '../assets/'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mt-2 mb-10'>
        <img src={hoff} alt="Summarizer Logo"
        className='w-40 object-contain'/>
        <button 
        type='button' 
        onClick={() => window.open('https://github.com/Hoffalypse/Article-Summary')}
        className='black_btn'>
          Open Source
        </button>

      </nav>
      <h1 className='head_text'>
        Summarize Articles with <br
        className='max-md:hidden'/>
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with HoffNotes, an open-source article summarizer that transforms lengthy articles into clear and concise summaries. Just enter the URL below and instantly see a summary of that article!
      </h2>
    </header>
  )
}

export default Hero
