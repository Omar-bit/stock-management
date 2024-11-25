import React from 'react'
import Nav from './components/Nav'
function Layout({ children }) {
  return (
    <div className='w-[95%] mx-auto flex justify-between  items-center mt-[7vh] lg:mt-[10vh]     lg:w-[90%]   '>
      <Nav />
      {children}
    </div>
  )
}

export default Layout
