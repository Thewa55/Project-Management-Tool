import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT } from '../actions/types';
import axios from 'axios';


export default function UpdateProject(){
  
  const [singleProject, setSingleProject] = useState({})
  const dispatch = useDispatch()

  const project = useSelector(state => ({
    project: state.projects
  }))

  async function getProject() {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1)
    console.log(id)
    const res = await axios.get(`http://localhost:8080/api/project/${id}/`)
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    })
    setSingleProject(res.data)
  }

  useEffect(() => {
    getProject()
  }, [])
  
  return(
    <div>
      <h1>Welcome to the UpdateProject page for project</h1>
    </div>
  )
}