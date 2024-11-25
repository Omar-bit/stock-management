import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Produits from './pages/Produit'
import ModProd from './pages/ModProd'
import Utilisateur from './pages/Utilisateur'
import ModUser from './pages/ModUser'
import Fournisseur from './pages/Fournisseur'
import ModFour from './pages/ModFour'
import Client from './pages/Client'
import ModClient from './pages/ModClient'
import Statistique from './pages/Statistique'
import Vente from './pages/Vente'
import QrCodeScanner from './components/QrCodeScanner'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/produit' element={<Produits />} />
      <Route path='/produit/:ref' element={<ModProd />} />
      <Route path='/utilisateur' element={<Utilisateur />} />
      <Route path='/utilisateur/:id' element={<ModUser />} />
      <Route path='/fournisseur' element={<Fournisseur />} />
      <Route path='/fournisseur/:id' element={<ModFour />} />
      <Route path='/client' element={<Client />} />
      <Route path='/client/:id' element={<ModClient />} />
      <Route path='/statistique' element={<Statistique />} />
      <Route path='/vente' element={<Vente />} />
      <Route path='*' element={<p>404 page not found</p>} />
    </Routes>
  )
}

export default App
