import * as THREE from 'three'
import { useEffect,useRef } from 'react'
import threescript from '../lib/threeScript.js'

export default function Home() {
  const mountRef=useRef(null)

  
  useEffect(()=>{
    const renderer=new THREE.WebGLRenderer()
    threescript(mountRef,renderer)

    return () => mountRef.current.removeChild(renderer.domElement);


  },[])
  return (

    <div ref={mountRef}>
    
     
    </div>
  )
}
