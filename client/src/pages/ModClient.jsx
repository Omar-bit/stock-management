import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaLessThan } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Pop from '../components/popup/Pop'
import { useNavigate } from 'react-router-dom'

function ModClient() {
  const navigate = useNavigate()

  const [nom, setNom] = React.useState('')

  const [tel, setTel] = React.useState(0)
  const id = useParams().id
  async function modifierClient() {
    event.preventDefault()
    try {
      var { data } = await axios.put(
        import.meta.env.VITE_SERVER_ADRESS + '/api/clients/modify/' + id,
        { nom, tel },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
    if (data.status === 'ok') {
      return redirect('/client')
    } else {
      toast.error('probleme de modification!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }
  async function getClient() {
    try {
      var { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/clients/getClient/' + id,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )

      if (data.useState == 'ko') {
        navigate(`/`)
      } else {
        console.log(data)
        setNom(data.data.nom)

        setTel(data.data.tel_client)
      }
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    getClient()
  }, [])
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />

      <form
        className='form absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] bg-third rounded-md p-4'
        action=''
      >
        <header className='flex w-full justify-center items-center relative'>
          <Link to={'/client'}>
            {' '}
            <FaLessThan className='absolute -left-1 text-forth cursor-pointer' />
          </Link>

          <h1 className='text-forth font-bold text-lg'>Modifier client</h1>
        </header>
        <div className='field'>
          <label htmlFor=''>Nom</label>
          <input
            type='text'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Tel</label>
          <input
            type='number'
            value={tel}
            max={9999999}
            onChange={(e) => {
              if (e.target.value.length <= 8) setTel(e.target.value)
            }}
          />
        </div>

        <button onClick={modifierClient}>Modifier</button>
      </form>
    </>
  )
}

export default ModClient
