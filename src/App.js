import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import queryLogo from './assets/query.png'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import queryImgLogo from './assets/queryLogo.png'
import {sendMsgToOpeanAI} from './openai'
import {createWeaviateClient, getClassDefinitionsAwait, getAllClassNames, getPropertyNamesForClass, queryAwaitWeaviate} from './weaviate'

function App() {
  const msgEnd = useRef(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([{
    text: "Ask anything",
    isBot: true
  }])

  const [isRaw, setIsRaw] = useState(false)
  let label = "Raw"

  const [limit, setLimit] = useState(1);

  const handleLimitChange = (event) => {
    const newValue = Math.round(parseFloat(event.target.value));
    
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
      setLimit(newValue);
    }
  };

  useEffect(() => {
    msgEnd.current.scrollIntoView()
  }, [messages])

  const handleSend = async () => {
    const text = input
    setInput("")
    setMessages([...messages, {text: text, isBot: false}])
    
    let client = createWeaviateClient()
    let queryResult = await queryAwaitWeaviate(client, text, limit)

    const queryPrompt = `Display the product reviews from the stringified JSON data ${queryResult}, in a structured and readable format. 
    For each review in the "Reviews_v2" list, format the information for each review in a clear and organized manner so that it is easy to read and understand.`

    if(!isRaw){
      queryResult = await sendMsgToOpeanAI(queryPrompt)
    }
    
    // const res = await sendMsgToOpeanAI(text)
    setMessages([...messages, {text: text, isBot: false}, {text: queryResult, isBot: true}]) 
  }
  
  const handleEnter = async (e) => {
      if(e.key === 'Enter')
        await handleSend()
  }
  
  const handleQuery = async (e) => {
    const text = e.target.value
    setInput("")
    setMessages([...messages, {text: text, isBot: false}])

    const res = await sendMsgToOpeanAI(text)
    setMessages([...messages, {text: text, isBot: false}, {text: res, isBot: true}]) 

  }
  
  function toggleRaw(){
     setIsRaw(!isRaw)
  }
  console.log(isRaw)

  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className="upperSideTop">
            <img src={queryLogo} alt="Logo" className="logo" />
            <span className="brand">Query QI</span>
          </div>
          <div className="upperSideBottom">
            <button className="midBtn" onClick={() => window.location.reload()}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
            <button className="query" onClick={handleQuery} value={"What is Programming"}><img src={msgIcon} alt="Query" />What is Programming</button>
            <div className='customQuery'> 
              <div className="container">
                <span className='lableText'>{label}</span>
                <div className="toggle-switch" >
                    <input type="checkbox" className="checkbox" 
                          name={label} id={label} />
                    <label className="label" htmlFor={label} onClick={toggleRaw}>
                        <span className="inner" />
                        <span className="switch" />
                    </label>
                </div>
              </div>
              <div className='limit'>
                  <label htmlFor="limit">Limit</label>
                  <input 
                    type="range"
                    id="limit"
                    name="limit"
                    min="1"
                    max="10"
                    step="1"
                    value={limit}
                    onChange={handleLimitChange}
                  />
                  <span>{limit}</span>
                </div>
             </div> 
          </div>
        
        </div>
        <div className='lowerSide'>
           <div className="listItems"><img src={home} alt="home" className="listItemsImg" />Home</div>
           <div className="listItems"><img src={saved} alt="saved" className="listItemsImg" />Saved</div>
           <div className="listItems"><img src={rocket} alt="rocket" className="listItemsImg" />Update</div>

        </div>
      </div>
      <div className='main'>
        <div className="chats">
            {messages.map((message, i) => 
                <div key ={i} className={message.isBot ? "chat bot": "chat"}>
                  <img className='chatImg' src={message.isBot ? queryImgLogo : userIcon} alt="" />
                  <pre className="txt">{message.text}</pre>
                </div>
            )}
            <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type='text' 
                   placeholder='Send a message'
                   value = {input}
                   onKeyDown={handleEnter}
                   onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" className='sendIcon'/>
            </button>
          </div>
          <p>Gives most relevent products with their reviews.</p>
        </div>

      </div>
   
    
    </div>
  )
}

export default App;
