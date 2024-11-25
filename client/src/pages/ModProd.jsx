import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaLessThan } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ModProd() {
  const navigate = useNavigate()

  const ref = useParams().ref

  const [nom, setNom] = React.useState('')
  const [qte, setQte] = React.useState(0)
  const [img, setImg] = React.useState(null)
  const [prix, setPrix] = React.useState(0)
  const [prixAchat, setPrixAchat] = React.useState(0)

  async function getProd() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/produits/getProd/' + ref,
        { headers: { token: localStorage.getItem('token') } }
      )
      console.log(data);
      if (data.status === 'ok') {
        setQte(data.data.qte)
        setNom(data.data.nom)
        setPrix(data.data.prix)
        setPrixAchat(data.data.prix_achat)
      } else {
        navigate(`/`)
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function modifierProd() {
    event.preventDefault()
    const formData = new FormData()
    formData.append('img', img)
    formData.append('nom', nom)
    formData.append('qte', qte)
    formData.append('prix', prix)
    formData.append('prixAchat', prixAchat)

    try {
      var { data } = await axios.put(
        import.meta.env.VITE_SERVER_ADRESS + '/api/produits/modify/' + ref,
        formData,
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
      navigate(`/produit`)
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
  React.useEffect(() => {
    getProd()
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
          <Link to={'/produit'}>
            {' '}
            <FaLessThan className='absolute -left-1 text-forth cursor-pointer' />
          </Link>

          <h1 className='text-forth font-bold text-lg'>Modifier produit</h1>
        </header>
        <div className='field'>
          <label htmlFor=''>Ref</label>
          <input
            type='text'
            disabled
            value={ref}
            onChange={(e) => setRef(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Nom</label>
          <input
            type='text'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Qte</label>
          <input
            type='number'
            value={qte}
            onChange={(e) => setQte(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Prix de vente</label>
          <input
            type='number'
            value={prix}
            min={0}
            onChange={(e) => setPrix(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Prix d'achat</label>
          <input
            type='number'
            value={prixAchat}
            min={0}
            onChange={(e) => setPrixAchat(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Image</label>
          <input
            type='file'
            className='custom-file-input'
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <button onClick={modifierProd}>Modifier</button>
      </form>
    </>
  )
}

export default ModProd
