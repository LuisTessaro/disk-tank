import React, { useState } from 'react'

import { FaBars } from 'react-icons/fa'

const Header = ({ }) => {
  const [open, setOpen] = useState()

  return (
    <div className="fixed top-left z-10 bg-primary p-4 flex flex-col md:flex-row text-white items-start md:items-center justify-between border-b-2 border-solid">
      <div className="flex justify-between items-center w-full">
        <h1 className="logo">DISKTANK</h1>
        <FaBars className="text-3xl cursor-pointer md:hidden" onClick={() => setOpen(!open)} />
      </div>

      <div className={`my-8 md:my-0 items-center gap-4 inline-flex w-full justify-end flex-col md:flex-row ${open ? 'inline-flex' : 'header-menu-hidden'}`}>
        <p className="underline cursor-pointer hover:text-gray-400">See Who's Online</p>
        <p className="underline cursor-pointer hover:text-gray-400">About</p>
        <p className="battlenet-color p-4 cursor-pointer text-center">Log in With Bnet</p>
      </div>
    </div>
  )
}

export default Header