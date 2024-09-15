import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "@!#$%&"

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random()* str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass) 

  },[length, numberAllowed, charAllowed, setPassword])
  
  const copytoclipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full h-24 max-w-md mx-auto shadow-md rounded-lg px-4 py- 3 my-8 text-orange-500 bg-gray-800'>
        <h1 className=' text-white text-center py-2'>Password Generator</h1>
        <div className=' flex shadow rounded-lg overflow-hidden mb-4 gap-2'>
          <input 
            type = "text" 
            value = {password}
            className = 'outline-none w-full py-1 px-3 rounded-lg'
            placeholder = 'password'
            readOnly 
            ref={passwordRef} 
          />
          <button onClick={copytoclipboard} className='rounded-xl bg-gradient-to-br from-[#0083FE] to-[#00FFF0] px-4 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#0083FE]/50'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type = "range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='felx items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=> {
                setNumberAllowed((prev)=>!prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={()=>{
                setCharAllowed((prev)=> !prev);
              }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
