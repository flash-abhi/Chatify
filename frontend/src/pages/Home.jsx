import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import getMessages from '../customhooks/getMessages'

const Home = () => {
  getMessages();
  return (
    <div className=' w-full h-[100vh] flex '>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home