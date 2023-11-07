import { SetStateAction, useEffect, useState } from 'react'
import './App2.css'
import { data } from './data'
const App2 = () =>{
    // console.log(JSON.parse(data))
    const answers = ['4','dog']    
    const [uA, setUa] = useState([])
    const [color, setColor] = useState(false)
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [userInput, setUserInput] = useState('')
    const [userResponses, setUserResponses] = useState([]);
    useEffect(()=>{
        const d = data.nodes.filter((da)=>da.type !== 'processNode' && da.type!== 'input')
        const questionLabels = d.map((ds) => ds.data.label);
        setQuestions(questionLabels);

    },[]) 

    console.log(questions.length)


    if (currentQuestion === questions.length){
        questions[questions.length-1] = `${answers} and your answers: ${uA}`
        console.log(questions[questions.length-1])
    }
// questions.slice(0,questions.length-1).map(a=> console.log(a))
// answers.map((a,index)=>console.log(a[index]))




    const handleSubmit = (e) =>{
        e.preventDefault();
        if (userInput.trim() !== '') {
        setUserResponses([...userResponses, userInput]);  

        setCurrentQuestion(currentQuestion+1)        
        userInput === '' ? setColor(false) : setColor(true)
            setUa([...uA, userInput])
        }
        
        setUserInput('');
    }     
       
    console.log(uA)
     


    // console.log(questions)
    const handleInputChange = (e) =>{
        e.preventDefault()
        setUserInput(e.target.value)        
    }    
    console.log(userResponses)

    const currentQuestionData = questions[currentQuestion];

    return(
        <>
        {/* currentQuestion === questions.length ? (
            <p>{questions[questions.length - 1]}</p>
        ) : ( */}
        <div className="container-chat">
        {
            questions.slice(0, currentQuestion).map((question, index) => (
            <div key={index} className="question">
                <span className="p">{question}</span>
                <div className="user-response">
                <span style={{
                    background: color === true? 'aquamarine' : 'none'
                }} className="p1">{userResponses[index]}</span>
                </div>
            </div>
            ))
        }


        </div>

        <hr />
        <form action="" onSubmit={handleSubmit}>
            <input type="text"  disabled={currentQuestion === questions.length} className="input" onChange={handleInputChange} value={userInput} />
            <button>Send</button>
        </form>
        </>
    )
}

export default App2