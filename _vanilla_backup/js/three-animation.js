// Initialize Three.js scene
let scene, camera, renderer;
let devSymbol;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Set up camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;
    
    // Create developer symbol group
    devSymbol = new THREE.Group();
    
    // Create left angle bracket <
    const leftBracketPoints = [
        new THREE.Vector3(-10, -15, 0),
        new THREE.Vector3(-20, 0, 0),
        new THREE.Vector3(-10, 15, 0)
    ];
    const leftBracketGeometry = new THREE.BufferGeometry().setFromPoints(leftBracketPoints);
    const leftBracketMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4a90e2,
        linewidth: 3
    });
    const leftBracket = new THREE.Line(leftBracketGeometry, leftBracketMaterial);
    leftBracket.position.x = -15;
    devSymbol.add(leftBracket);
    
    // Create slash /
    const slashPoints = [
        new THREE.Vector3(-5, -15, 0),
        new THREE.Vector3(5, 15, 0)
    ];
    const slashGeometry = new THREE.BufferGeometry().setFromPoints(slashPoints);
    const slashMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4a90e2,
        linewidth: 3
    });
    const slash = new THREE.Line(slashGeometry, slashMaterial);
    devSymbol.add(slash);
    
    // Create right angle bracket >
    const rightBracketPoints = [
        new THREE.Vector3(10, -15, 0),
        new THREE.Vector3(20, 0, 0),
        new THREE.Vector3(10, 15, 0)
    ];
    const rightBracketGeometry = new THREE.BufferGeometry().setFromPoints(rightBracketPoints);
    const rightBracketMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4a90e2,
        linewidth: 3
    });
    const rightBracket = new THREE.Line(rightBracketGeometry, rightBracketMaterial);
    rightBracket.position.x = 15;
    devSymbol.add(rightBracket);
    
    // Add the symbol to the scene
    scene.add(devSymbol);
    
    // Set up renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Add renderer to DOM
    const container = document.getElementById('canvas-container');
    if (container) {
        container.appendChild(renderer.domElement);
    }
    
    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.01;
    mouseY = (event.clientY - windowHalfY) * 0.01;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // Very minimal rotation for subtle movement
    devSymbol.rotation.y += 0.001;
    
    // Subtle movement based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

