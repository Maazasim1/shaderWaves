import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import waterShader from '../shaders/vertex.glsl'
import waterFragment from '../shaders/fragment.glsl'
import { Mesh } from 'three'




export default function threescript(mountRef,renderer){
     // Scene
     const scene = new THREE.Scene()
     //Light

     const ambientLight=new THREE.AmbientLight('white',1)
     scene.add(ambientLight)

     //Plane
      const waterGeometry=new THREE.PlaneBufferGeometry(10,10,512,512)
      const waterMaterial=new THREE.ShaderMaterial(
      {
         vertexShader:waterShader,
         fragmentShader:waterFragment,
         uniforms:{
            uTime:{value:0},
            
            
            uSmallWavesElevation:{value:0.15},
            uSmallWavesFrequency:{value:3},
            uSmallWavesWSpeed:{value:0.2},
            uSmallWavesIterations:{value:4.0},
            
            uBigWavesFrequency:{value:new THREE.Vector2(4,1.5)},
            uBigWavesElevation:{value:0.2},
            uBigWavesSpeed:{value:0.75},
            
            uDepthColor:{value:new THREE.Color('#186691')},
            uSurfaceColor:{value:new THREE.Color('#9bd8ff')}
         }      }
      )
      const water=new THREE.Mesh(
         waterGeometry,
         waterMaterial
      )
      water.rotation.x=-Math.PI/2
      scene.add(water)
     //Size
     const sizes = {
       width: window.innerWidth,
       height: window.innerHeight
     }
     window.addEventListener('resize', () => {
       // Update sizes
       sizes.width = window.innerWidth
       sizes.height = window.innerHeight
 
       // Update camera
       camera.aspect = sizes.width / sizes.height
       camera.updateProjectionMatrix()
 
       // Update renderer
       renderer.setSize(sizes.width, sizes.height)
       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 
     })
 
     /**
  * Camera
  */
     // Base camera
     const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
     //camera.position.x=2
     camera.position.z=2
     camera.position.y=1
     camera.lookAt(water.position)
     scene.add(camera)
 
 
     /**
      * Renderer
      */
     renderer.setSize(sizes.width, sizes.height)
     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
     renderer.setClearColor('#262837')
     renderer.shadowMap.enabled = true
 
     mountRef.current.appendChild(renderer.domElement);
 
     // Controls
     const controls = new OrbitControls(camera, renderer.domElement)
     controls.enableDamping = true
 
     /**
  * Animate
  */
 
 const clock = new THREE.Clock()

function tick(){
   
   
   const elapsedTime = clock.getElapsedTime()
   
   //Update uniforms
   waterMaterial.uniforms.uTime.value=elapsedTime       
        
        // // Update controls
        controls.update()
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    
}
 
 tick()
}