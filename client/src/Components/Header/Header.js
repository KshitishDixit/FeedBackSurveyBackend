import React, { useEffect,useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import Payments from '../Checkout/Payments';

const Header = () => {
    const auth=useSelector(state=>state.auth)
    console.log(auth?.credits)
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const renderContent=()=>{
        switch(auth){
            case null:
                return
                
                
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                )
                
            default:
                return(<>
                 
      <li key="1" onClick={openModal}> <a>Add Credits</a></li>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },}}
        contentLabel="Example Modal"
      >
        <IoCloseSharp onClick={closeModal} style={{fontSize:"30px",cursor:'pointer'}}/>
        <Payments/>
       {/* <SplitPayments/> */}
      </Modal>
      <li key="3" style={{margin:'0 10px'}}>Credits: {auth?.credits}</li>
      <li key="2"><a href="/api/logout">Logout</a></li>
                </>
                )
                
        }
    }

    
  return (
    <>
    <nav>
    <div className="nav-wrapper">
      <Link to={auth ? '/survey' : '/'} className="brand-logo">Emaily</Link>
      <ul className="right">
        <li>{renderContent()}</li>
        
      </ul>
    </div>
  </nav>
    </>
  )
}

export default Header