var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var distance = 40;


// Moteur de rendue / Affiche les scénes directement sur le navigateur 
var renderer = new THREE.WebGLRenderer({antialias:true}); //création d'un nouveau rendu WebGL / antialias = rend les bords des formes plus fluides
renderer.setSize(WIDTH, HEIGHT); //definir sa taille
renderer.setClearColor(0xFFFFFF, 1); // definir la couleur de fond
document.body.appendChild(renderer.domElement); // enfant du body

//Scene
var scene = new THREE.Scene(); // création de l'objet scene

//Camera
var camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 1, 1000); // 70 vitesse des images / 
camera.position.z = distance; //distance entre la caméra et le centre de la scène sur l'axe z
scene.add(camera);


for (let i = 0; i < 100; i++) {
    var boxGeometry = new THREE.DodecahedronGeometry(7);
    var basicMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0x360940 + 0x360940 });
    var cube = new THREE.Mesh(boxGeometry, basicMaterial);

    cube.position.x = Math.random() * distance * 2 - distance;
    cube.position.y = Math.random() * distance * 2 - distance;
    cube.position.z = Math.random() * distance/2 * 2 - distance;

    scene.add(cube);
}

var light = new THREE.SpotLight(0xFFFFFF); // couleur de la lumiere
light.position.set(-10, 15, 50); // défini sa position un peu à l'écart du centre de la scène, afin qu'elle puisse éclairer certaines parties des formes
scene.add(light);

function render() { 
	requestAnimationFrame(render);
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








