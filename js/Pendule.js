var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var distance = 100;

let r1 = 200;
let r2 = 200;
let m1 = 20;
let m2 = 20;
let a1 = 3.14/2;
let a2 = 3.14/2;
let a1_v = 0;
let a2_v = 0;
let g = 1; 
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let points = [];



var renderer = new THREE.WebGLRenderer({antialias:true}); 
renderer.setSize(WIDTH, HEIGHT); 
renderer.setClearColor(0x000000, 1); 
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 1, 1000); // 70 vitesse des images / 
camera.position.z = distance; //distance entre la caméra et le centre de la scène sur l'axe z
scene.add(camera);

var light = new THREE.SpotLight(0xFFFFFF); 
light.position.set(-10, 15, 50); 
scene.add(light);

var SphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
var basicMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF });
var basicMaterial2 = new THREE.MeshLambertMaterial({color: 0xFD3e30 });
var Sphere1 = new THREE.Mesh(SphereGeometry, basicMaterial);
var Sphere2 = new THREE.Mesh(SphereGeometry, basicMaterial2);

Sphere1.position.x = x1;
Sphere1.position.y = y1;
Sphere2.position.x = x2;
Sphere2.position.y = y2;

scene.add(Sphere1);
scene.add(Sphere2);

function render() { 
    requestAnimationFrame(render);

    let num1 = -g * (2 * m1 + m2) * Math.sin(a1) ; 
    let num2 = -m2 * g * Math.sin( a1 - 2 * a2) ;
    let num3 = -2 * Math.sin(a1 - a2) * m2 ;
    let num4 = a2_v*a2_v*r2 + a1_v*a1_v * r1 * Math.cos(a1 -a2) ;
    let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2)) ;
    let a1_a =  ( num1 + num2 + num3 * num4) / den ;                         // acceleration 1 


    num1 = 2 * Math.sin(a1-a2) ;
    num2 = (a1_v*a1_v*r1*(m1+m2));
    num3 = g * (m1 + m2) * Math.cos(a1);
    num4 = a2_v*a2_v*r2*m2*Math.cos(a1-a2);
    den = r2 * (2 *  m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2)) ;

    let a2_a = (num1*(num2+num3+num4)) / den;                         // acceleration 2

    let x1 = -(r1 * Math.sin(a1))/8;
    let y1 = -(r1 * Math.cos(a1))/8;

    let x2 = x1 + -(r2 * Math.sin(a2))/8;
    let y2 = y1 + -(r2 * Math.cos(a2))/8;

    Sphere1.position.x = x1;
    Sphere1.position.y = y1;
    Sphere2.position.x = x2;
    Sphere2.position.y = y2;

    // console.log(line)

    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

	renderer.render(scene, camera);
}
render();


camera.lookAt(scene.position);

document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    let mouseX = event.clientX - WIDTH/2;
    let mouseY = event.clientY - HEIGHT/2;
    camera.position.x = ( mouseX - camera.position.x )*0.05;
    camera.position.y = - ( mouseY - camera.position.y )*0.05;
    camera.position.z = distance;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}



