import React from 'react';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Prod from './../components/Prod';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProd from '../components/AddProd';
import Label from '../components/Label';
import { BsQrCode } from 'react-icons/bs';
import QrCodeScanner from '../components/QrCodeScanner';
import { BsList } from 'react-icons/bs';
import { IoGridSharp } from 'react-icons/io5';
import { FaCartShopping } from 'react-icons/fa6';
import DatalistInput from 'react-datalist-input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Produits() {
  const navigate = useNavigate();

  const [addProdPopup, setAddProdPopup] = React.useState(false);
  const [prodLabelPopup, setProdLabelPopup] = React.useState(false);
  const [QrPopup, setQrPopup] = React.useState(false);
  const [vendrePopup, setVendrePopup] = React.useState(false);
  const [originalProducts, setOriginalProducts] = React.useState([]);
  const [products, setProducts] = React.useState(originalProducts || []);
  const [labelData, setLabelData] = React.useState({});
  const [prodData, setProdData] = React.useState({});
  const [filter, setFilter] = React.useState('');
  const [remise, setRemise] = React.useState('0');
  const [prixTot, setPrixTot] = React.useState(0);
  const [prixDonnee, setPrixDonnee] = React.useState(0);
  const [tot, setTot] = React.useState(0);
  const [client, setClient] = React.useState('');
  const [clients, setClients] = React.useState([]);
  const [view, setView] = useState('list');
  const [fournisseurs, setFournisseurs] = React.useState([]);
  // Add a new state for wishlist
  const [wishlist, setWishlist] = useState([]);
  const [wishlistState, setWishlistState] = React.useState(false);
  async function addVente() {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + '/api/ventes/addVente',
        {
          client: client ? client : '1',
          remise: remise,
          produits: wishlist.map((item) => ({
            ref: item.ref,
            qte: item.quantity,
            prix: item.prix,
          })),
          prixDonnee: prixDonnee,
          tot: tot,
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      if (data.status === 'ok') {
        toast.success('vente a été ajouté avec succées', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        toast.error('probleme de l ajout de la vente!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getAllClients() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/clients/getAll',
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      if (data.status === 'ok') {
        setClients(data.data);
      } else {
       navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllProducts() {
    try {
      var { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/produits/getAll',
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      setOriginalProducts(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getAllFounisseurs() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/fournisseurs/getAll',
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      if (data.status === 'ok') {
        setFournisseurs(data.data);
      } else {
         navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Function to handle adding and removing from the wishlist
  function handleWishlist(prod) {
    const prodClicked = wishlist.find((item) => item.ref === prod.ref);
    if (prodClicked) {
      handleQuantityChange(prodClicked.ref, prodClicked.quantity + 1);
    } else {
      setWishlist([...wishlist, { ...prod, quantity: 1 }]);
    }
  }
  function handleQuantityChange(prodRef, quantity) {
    setWishlist(
      wishlist.map((item) =>
        item.ref === prodRef ? { ...item, quantity: quantity } : item
      )
    );
  }
  function handleDeleteFromWL(prodRef) {
    setWishlist(wishlist.filter((item) => item.ref !== prodRef));
  }
  async function deleteProd(ref) {
    try {
      var { data } = await axios.delete(
        import.meta.env.VITE_SERVER_ADRESS + '/api/produits/delete/' + ref,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error('probleme de retirer le produit!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
    if (data && data.status === 'ok') {
      const filteredProds = originalProducts.filter((prod) => ref !== prod.ref);
      setOriginalProducts(filteredProds);
      toast.success('produit a été retirer avec succées', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }
  function prepareLabel(prod) {
    setProdLabelPopup(true);
    setLabelData(prod);
  }
  function prepareVendre(prod) {
    setVendrePopup(true);
    setProdData(prod);
  }

  React.useEffect(() => {
    if (filter === '') {
      setProducts(originalProducts);
    } else {
      setProducts(
        originalProducts.filter(
          (prod) =>
            prod.nom.substring(0, filter.length).toUpperCase() ===
              filter.toUpperCase() ||
            prod.ref.substring(0, filter.length).toUpperCase() ===
              filter.toUpperCase()
        )
      );
    }
  }, [filter, originalProducts]);
  React.useEffect(() => {
    let somme = 0;
    for (let prod of wishlist) {
      somme += prod.prix * prod.quantity;
    }
    setTot(somme);
    somme = somme -  remise;
    setPrixTot(somme);
    setPrixDonnee(somme);
  }, [wishlist, remise]);
  React.useEffect(() => {
    getAllProducts();
    getAllFounisseurs();
    getAllClients();
  }, []);
  return (
    <>
      <Layout>
        <div className='relative  bg-third p-2 w-[100%] h-[90vh] rounded-3xl lg:h-[80vh]  lg:w-[73%]   lg:py-5 overflow-y-scroll	shadow-xl'>
          {/*HEADER*/}
          <h2 className='text-center text-2xl font-bold text-forth '>
            Produits
          </h2>
          {(localStorage.getItem('role') === 'admin' ||
            localStorage.getItem('role') === 'vendeur') && (
            <AiFillPlusCircle
              className='text-3xl  text-primary rounded-full cursor-pointer bg-third shadow-md absolute right-5 top-5 hidden md:block '
              onClick={() => setAddProdPopup(true)}
            />
          )}
          <div
            className='hidden md:block  z-20 cursor-pointer  absolute lg:fixed top-23 left-28'
            onClick={() => setWishlistState((prev) => !prev)}
          >
            <div className='relative -bottom-2 -left-2 h-5 w-5 p-3 rounded-full flex items-center justify-center bg-signM text-[white]'>
              {wishlist.length}
            </div>
            <FaCartShopping className='text-3xl text-primary' />
          </div>
          {/*Search Bar*/}
          <div className='relative left-[50%] translate-x-[-50%]   mt-5 flex items-stretch justify-center'>
            <input
              type='text'
              className=' rounded-l-lg outline-none text-center bg-[#dfdede] border-2 border-secondary w-48 md:w-auto px-2 py-1'
              placeholder='rechercher par ref/nom'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div
              className='flex justify-center items-center bg-secondary rounded-r-lg p-1 cursor-pointer'
              onClick={() => setQrPopup(true)}
            >
              <BsQrCode className='text-xl text-third' />
            </div>
          </div>
          {/* VIEW */}
          <div className=' flex items-center gap-3 w-[90%] mx-auto '>
            <BsList
              className={`text-xl ${
                view === 'list' ? 'text-secondary' : 'text-aux'
              } hover:text-secondary cursor-pointer transition-all `}
              onClick={() => setView('list')}
            />
            <IoGridSharp
              className={`text-xl text-${
                view === 'grid' ? 'secondary' : 'aux'
              } hover:text-secondary cursor-pointer transition-all `}
              onClick={() => setView('grid')}
            />
          </div>
          {/*PRODUCTS*/}
          <div
            className={`prods mt-7  	 ${
              view === 'list'
                ? 'flex flex-col items-center justify-center gap-3 '
                : ' grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3	  gap-5'
            }    `}
          >
            {products.map((prod, index) =>
              prod.status ? (
                <Prod
                  view={view}
                  key={index}
                  prod={{ ...prod }}
                  deleteProd={deleteProd}
                  prepareLabel={prepareLabel}
                  prepareVendre={prepareVendre}
                  handleWishlist={handleWishlist}
                />
              ) : null
            )}
          </div>
          {/* Wishlist display */}
          {wishlistState && (
            <div className='wishList fixed top-[23vh] h-[65vh] left-[5.55vw] z-20 bg-forth border-2 border-secondary rounded-md  w-[21.5vw] text-third hidden md:flex flex-col items-center py-3 mb-1 gap-2'>
              <div className='w-full flex flex-col gap-2 items-center overflow-scroll h-[50vh]'>
                {wishlist.length === 0 ? (
                  <p>wishlist actuellement vide.</p>
                ) : (
                  <>
                    <h5>Prix Total: {prixTot}TND</h5>
                    <DatalistInput
                      placeholder='Client:  passagé'
                      onSelect={(item) => {
                        event.preventDefault();
                        setClient(item.id);
                      }}
                      items={clients.map((clii) => {
                        return { id: clii.id, value: clii.nom };
                      })}
                    />

                    {wishlist.map((item) => (
                      <div
                        key={item.ref}
                        className=' bg-[white]  w-[90%] rounded-md p-2 flex items-stretch justify-between shadow-md '
                      >
                        <img
                          src={
                            import.meta.env.VITE_SERVER_ADRESS +
                            '/uploads/' +
                            item.img
                          }
                          alt={item.nom}
                          className='w-20 h-20  rounded-xl border border-primary'
                        />
                        <div className='flex flex-col items-center justify-between text-sm text-[black]'>
                          <h3>{item.nom}</h3>

                          <p>Quantite:</p>
                          <input
                            className='w-10 text-[black] font-semibold rounded-md p-1 text-center'
                            type='number'
                            min='1'
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.ref, e.target.value)
                            }
                          />
                        </div>
                        <button
                          className='text-[red]'
                          onClick={() => handleDeleteFromWL(item.ref)}
                        >
                          X
                        </button>
                        {/* You can add other item details if needed */}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className='absolute bg-forth bottom-2 flex flex-col items-center w-full gap-2'>
                <div className='flex flex-col w-[90%] justify-center '>
                  <label htmlFor=''>prix donnée</label>
                  <input
                    type='number'
                    placeholder='TND'
                    value={prixDonnee}
                    onChange={(e) => setPrixDonnee(e.target.value)}
                    className='px-2 py-1 rounded-md text-[black] w-[100%]'
                  />
                </div>
                <div className='flex flex-col w-[90%] justify-center '>
                  <label htmlFor=''>remise</label>
                  <input
                    type='number'
                    placeholder='remise '
                    value={remise}
                    onChange={(e) => setRemise(e.target.value)}
                    className='px-2 py-1 rounded-md text-[black] w-[100%]'
                  />
                </div>
                <button
                  className=' w-[90%] px-3 py-1  bg-secondary text-forth font-semibold rounded-lg transition-all hover:bg-forth hover:text-secondary hover:shadow-xl'
                  onClick={addVente}
                >
                  Vendre
                </button>
              </div>
            </div>
          )}
          {/*ADD PROD POP UP OPEN ICON */}
          <div className='sticky w-[100%] bg-third -bottom-2 h-28 flex justify-center items-center   left-0  md:hidden'>
            <AiFillPlusCircle
              className='text-5xl text-primary bg-third   '
              onClick={() => setAddProdPopup(true)}
            />
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

      {addProdPopup && (
        <AddProd
          setAddProdPopup={setAddProdPopup}
          setOriginalProducts={setOriginalProducts}
          originalProducts={originalProducts}
          fournisseurs={fournisseurs}
          toast={toast}
          getAllProducts={getAllProducts}
        />
      )}

      {/*PROD LABEL POP UP */}

      {prodLabelPopup && (
        <Label setProdLabelPopup={setProdLabelPopup} labelData={labelData} />
      )}

      {QrPopup && (
        <QrCodeScanner setFilter={setFilter} setQrPopup={setQrPopup} />
      )}
    </>
  );
}

export default Produits;
