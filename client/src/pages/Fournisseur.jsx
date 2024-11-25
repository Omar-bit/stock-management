import React from 'react'
import Layout from './../Layout'
import { AiFillPlusCircle } from 'react-icons/ai'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Four from '../components/Four'
import AddFour from '../components/AddFour'
import { useNavigate } from 'react-router-dom'

function Fournisseur() {
  const navigate = useNavigate()

  const [addFourPopup, setAddFourPopup] = React.useState(false)
  const [fournisseurs, setFournisseurs] = React.useState([])
  async function getAllFounisseurs() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/fournisseurs/getAll',
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      if (data.status === 'ok') {
        setFournisseurs(data.data)
      } else {
        navigate(`/`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteFour(id) {
    try {
      var data = await axios.delete(
        import.meta.env.VITE_SERVER_ADRESS + '/api/fournisseurs/delete/' + id,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      console.log(data)
    } catch (err) {
      console.log(err)
    }
    if (data.data.status === 'ok') {
      const filteredFours = fournisseurs.filter((four) => id !== four.id)
      setFournisseurs(filteredFours)
      toast.success('fournisseur a été retirer avec succées', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast.error('probleme de retirer cette fournisseur!', {
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
  React.useEffect(() => {
    getAllFounisseurs()
  }, [])
  return (
    <>
      <Layout>
        <div className='relative  bg-third p-2 w-[100%] h-[90vh] rounded-3xl lg:h-[80vh]  lg:w-[73%]   lg:py-5 overflow-y-scroll	shadow-xl'>
          {/*HEADER*/}
          <h2 className='text-center text-2xl font-bold text-forth '>
            Fournisseurs
          </h2>
          {localStorage.getItem('role') === 'admin' && (
            <AiFillPlusCircle
              className='text-3xl  text-primary rounded-full cursor-pointer bg-third shadow-md absolute right-5 top-5  md:block '
              onClick={() => setAddFourPopup(true)}
            />
          )}
          {/*Fournisseurs*/}
          <div className='prods mt-7 flex flex-col justify-center items-center gap-3  '>
            {fournisseurs.map((four, index) => (
              <Four key={index} four={{ ...four }} deleteFour={deleteFour} />
            ))}
          </div>
        </div>

        {/*NOTIFICATION*/}
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
      </Layout>
      {/* ADD PROD POP UP */}
      {addFourPopup && (
        <AddFour
          getAllFounisseurs={getAllFounisseurs}
          fournisseurs={fournisseurs}
          toast={toast}
          setAddFourPopup={setAddFourPopup}
        />
      )}
    </>
  )
}

export default Fournisseur
