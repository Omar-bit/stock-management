import React from 'react'
import Layout from './../Layout'
import { AiFillPlusCircle } from 'react-icons/ai'
import User from './../components/User'
import axios from 'axios'
import AddUser from '../components/AddUser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

function Utilisateur() {
  const navigate = useNavigate()

  const [addUserPopup, setAddUserPopup] = React.useState(false)
  const [users, setUsers] = React.useState([])
  async function getAllUsers() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/utilisateurs/getAll',
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )

      if (data.status === 'ok') {
        setUsers(data.data)
      } else {
        navigate(`/`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getAllUsers()
  }, [])
  async function deleteUser(id) {
    try {
      var data = await axios.delete(
        import.meta.env.VITE_SERVER_ADRESS + '/api/utilisateurs/delete/' + id,
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
      const filteredUsers = users.filter((user) => id !== user.id)
      setUsers(filteredUsers)
      toast.success('utilisateur a été retirer avec succées', {
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
      toast.error("probleme de retirer l'utilisateurs!", {
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
  return (
    <>
      {' '}
      <Layout>
        <div className='relative  bg-third p-2 w-[100%] h-[90vh] rounded-3xl lg:h-[80vh]  lg:w-[73%]   lg:py-5 overflow-y-scroll	shadow-xl'>
          {/*HEADER*/}
          <h2 className='text-center text-2xl font-bold text-forth '>
            Utilisateurs
          </h2>

          <AiFillPlusCircle
            className='text-3xl  text-primary rounded-full cursor-pointer bg-third shadow-md absolute right-5 top-5  md:block '
            onClick={() => setAddUserPopup(true)}
          />

          {/*USERS*/}
          <div className='prods mt-7 flex flex-col justify-center items-center gap-3  '>
            {users?.map((user, index) =>
              user.status ? (
                <User key={index} user={{ ...user }} deleteUser={deleteUser} />
              ) : null
            )}
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
      {addUserPopup && (
        <AddUser
          setAddUserPopup={setAddUserPopup}
          setUsers={setUsers}
          users={users}
          toast={toast}
          getAllUsers={getAllUsers}
        />
      )}
    </>
  )
}

export default Utilisateur
/*
setAddProdPopup={setAddProdPopup}
          setProducts={setProducts}
          products={products}
          fournisseurs={fournisseurs}
          toast={toast}*/
