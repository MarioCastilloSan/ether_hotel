import React from 'react'
import ProjectItem from '../components/ProjectItem'
import {ProjectList} from '../helpers/ProjectList.js'
import '../styles/Proyectos.css'



function Proyectos() {
  return (
    <div className='projects'>

        <h1> Habitaciones</h1>
        <div className='projectList'>
        {ProjectList.map((project,idx)=>{
            return(
                <ProjectItem  id={idx} name={project.name} image={project.image} price={project.price}/>
            );
        })}
        </div>
    </div>
  );
}


export default Proyectos;