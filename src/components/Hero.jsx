import { logo } from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mt-2 mb-10'>
        <img src={logo} alt="Summarizer Logo"
        className='w-28 object-contain'/>
        <button 
        type='button' 
        onClick={() => window.open('https://github.com/Hoffalypse/Article-Summary')}
        className='black_btn'>
          GitHub
        </button>

      </nav>
      <h1 className='head_text'>
        Summarize Articles with <br/>
        <span className='orange_gradient'>OpenAi GPT-4</span>
      </h1>
    </header>
  )
}

export default Hero
