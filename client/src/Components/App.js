import React, { useEffect } from "react";
import {Route,Routes } from "react-router-dom";
import Header from "./Header/Header";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions'
import Landing from "./Landing";
const Dashboard=()=>(
  <h2>Dashboard</h2>
)




const SurveyNew=()=>(
  <h2>SurveyNew</h2>
)

function App({fetchUser}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); // Replace 'state.user' with the actual path in your state
  console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  console.log(process.env.NODE_ENV)

  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);
  return (
    <>    
        <div className="container">
       <Header/>
       <Routes>
       <Route path="/survey" element={<SurveyNew/>}/>
        <Route path="/" element={<Landing/>}/>
        </Routes>
        </div>
    </>
  );
}

export default App;
