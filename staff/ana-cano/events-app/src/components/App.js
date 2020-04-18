import './App.css'
import './App.sass'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import { registerUser, authenticateUser, retrieveUser, createEvent, retrievePublishedEvents } from '../logic'
// import { sayHello } from '../logic'

function App() {
  const [view, setView] = useState('login')
  const [error, setError] = useState('error')
  const [name, setName] = useState('name')

  // const changeView = view => setView(view)
  const handleRegister = (name, surname, email, password) => {
    (async () => {
      try {
        await registerUser(name, surname, email, password)
        setView('login')
      } catch ({ message }) {
        setError(message)
      }
    })()
  }

  const handleGoToLogin = () => ( setView('login'))

  const handleLogin = (email, password) => {
    (async () => {
      try {
        const token = await authenticateUser(email, password)
        const user = await retrieveUser(token)
        setLoggedIn(true)
        sessionStorage.setItem('token', token)
      } catch ({ message }) {
        setError(message)
      }
    })()
  }

  const handleGoToRegister = () => { setView('register') }

  const handleCreateEvent = () => {
    (async () => {
      try {
        const token = sessionStorage.getItem('token')
        const response = await createEvent(token, 'Event from event-app', 'Event-app description', 'Event-app', new Date())
        console.log('create event', response)
      } catch ({ message }) {
        setError(message)
      }
    })()
  }


  const handleRetrievePublishedEvents = () => {
    (async () => {
      try {
        const token = sessionStorage.getItem('token')
        const events = await retrievePublishedEvents(token)
        console.log(events)
      } catch ({message}) {
        console.log(message)
      }
    })()
  }
  return <div className="App">
    <Page name={page}/>

    {page === 'register' && <Register onSubmit={handleRegister} goToLogin={handleGoToLogin} />}
    {page === 'login' && <Login onSubmit={handleLogin} goToRegister={handleGoToRegister} />}

    <button onClick={handleCreateEvent}>Create event</button>
    <button onClick={handleRetrievePublishedEvents}>Retrieve events</button>
  </div>
}

export default App
