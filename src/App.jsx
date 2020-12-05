import React, {useState, useCallback, useEffect} from 'react';
import './assets/styles/style.css'
import {db} from './Firebase/index'
import {AnswersList, Chats} from './components/index'
import FormDialog from './components/Forms/FormDialog';

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);
  
  const addChats = useCallback((chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }, [setChats]);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    });
    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }

  const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
    switch(true){
      case(nextQuestionId === 'contact'):
        handleClickOpen();
        break;

      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;

      default:
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500)
        break;
    }
  }, [answers]);

  useEffect(() =>  {
    (async() => {
      const initDataset = {};
      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          // const id = doc.id
          // const data = doc.data()
          // dataset[id] = data
          initDataset[doc.id] = doc.data()
        })
      });
      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })();
  }, []);

  useEffect(() => {
      const scrollArea = document.getElementById('scroll-area')
      if (scrollArea){
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
  })

  return (
    <div>
      <section className = "c-section">
        <div className = "c-box">
          <Chats chats={chats} />
          <AnswersList answers={answers} select={selectAnswer} />
          <FormDialog open={open} handleClose={handleClose} />
        </div>
      </section>

    </div>
  );
}
export default App;


        






    





//     

// }

// export default App;