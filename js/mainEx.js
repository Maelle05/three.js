var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// Moteur de rendue / Affiche les scénes directement sur le navigateur 
var renderer = new THREE.WebGLRenderer({antialias:true}); //création d'un nouveau rendu WebGL / antialias = rend les bords des formes plus fluides
renderer.setSize(WIDTH, HEIGHT); //definir sa taille
renderer.setClearColor(0xF05F57, 1); // definir la couleur de fond
document.body.appendChild(renderer.domElement); // enfant du body

//Scene
var scene = new THREE.Scene(); // création de l'objet scene

//Camera 
var camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT); // 70 vitesse des images / 
camera.position.z = 50; //distance entre la caméra et le centre de la scène sur l'axe z
scene.add(camera);

//Géométrie
var boxGeometry = new THREE.BoxGeometry(10, 10, 10); //Cube simple de 10 x 10 x 10 
var torusGeometry = new THREE.TorusGeometry(7, 1, 6, 20); //radius, tube diameter, radial segment count, et tubular segment count
var dodecahedronGeometry = new THREE.DodecahedronGeometry(7);

// La géométrie elle-même ne suffit pas
// Matériau
var basicMaterial = new THREE.MeshBasicMaterial({color: 0x360940});
var phongMaterial = new THREE.MeshPhongMaterial({color: 0xFF9500});
var lambertMaterial = new THREE.MeshLambertMaterial({color: 0xEAEFF2});

// Engrener / applique le matériau à une géométrie, maillage 
var cube = new THREE.Mesh(boxGeometry, basicMaterial);
var torus = new THREE.Mesh(torusGeometry, phongMaterial);
var dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);

//Ajout du cube à la scène
scene.add(cube);
scene.add(torus);
scene.add(dodecahedron);

cube.rotation.set(0.4, 0.2, 0);
cube.position.x = -25;

dodecahedron.position.x = 25;

// Lumière : avoir les veritables couleurs/brillances de MeshPhong et MeshLamber
var light = new THREE.PointLight(0xFFFFFF); // couleur de la lumiere
light.position.set(-10, 15, 50); // défini sa position un peu à l'écart du centre de la scène, afin qu'elle puisse éclairer certaines parties des formes
scene.add(light);

var t = 0;
//Rendu de la scene
function render() { // À chaque nouvelle image, la fonction render est appelée et le renderer rend la scene visioné par la caméra
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	/////////////////////////////////Animation////////////////////////////////
	// Rotation Cube
	cube.rotation.y += 0.01;
	// Mise à l'échelle Anneau
	t += 0.01;
	torus.scale.y = Math.abs(Math.sin(t));
	//Muvement
	dodecahedron.position.y = -7*Math.sin(t*2);
}
render();

