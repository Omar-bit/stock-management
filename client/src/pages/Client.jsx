import React from 'react';
import Layout from './../Layout';
import { AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cli from '../components/Cli';

import AddClient from '../components/AddClient';
import { useNavigate } from 'react-router-dom';

function Client() {
  const navigate = useNavigate();

  const [addClientPopup, setAddClientPopup] = React.useState(false);
  const [clients, setClients] = React.useState([]);
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
  async function deleteClient(id) {
    try {
      var data = await axios.delete(
        import.meta.env.VITE_SERVER_ADRESS + '/api/clients/delete/' + id,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    if (data.data.status === 'ok') {
      const filteredClients = clients.filter((client) => id !== client.id);
      setClients(filteredClients);
      toast.success('client a été retirer avec succées', {
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
      toast.error('probleme de retirer cette client!', {
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
  React.useEffect(() => {
    getAllClients();
  }, []);
  return (
    <>
      <Layout>
        <div className='relative  bg-third p-2 w-[100%] h-[90vh] rounded-3xl lg:h-[80vh]  lg:w-[73%]   lg:py-5 overflow-y-scroll	shadow-xl'>
          {/*HEADER*/}
          <h2 className='text-center text-2xl font-bold text-forth '>
            Clients
          </h2>
          {(localStorage.getItem('role') === 'admin' ||
            localStorage.getItem('role') === 'vendeur') && (
            <AiFillPlusCircle
              className='text-3xl  text-primary rounded-full cursor-pointer bg-third shadow-md absolute right-5 top-5  md:block '
              onClick={() => setAddClientPopup(true)}
            />
          )}
          {/*Clients*/}
          <div className='prods mt-7 flex flex-col justify-center items-center gap-3  '>
            {clients.map((client, index) => {
              console.log(client);
              return (
                <Cli
                  key={index}
                  client={{ ...client }}
                  deleteClient={deleteClient}
                />
              );
            })}
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
        {/* ADD PROD POP UP */}
        {addClientPopup && (
          <AddClient
            setAddClientPopup={setAddClientPopup}
            setClients={setClients}
            clients={clients}
            toast={toast}
          />
        )}
      </Layout>
    </>
  );
}

export default Client;
