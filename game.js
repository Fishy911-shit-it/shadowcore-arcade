// Matter.js aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

let engine = Engine.create();
let world = engine.world;

// Renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false,
        background: '#87ceeb'
    }
});
Render.run(render);

// Ground and hills
let ground = Bodies.rectangle(400, 390, 1600, 40, { isStatic: true });
let hill1 = Bodies.rectangle(600, 350, 200, 20, { isStatic: true, angle: -0.4 });
let hill2 = Bodies.rectangle(900, 300, 250, 20, { isStatic: true, angle: 0.3 });
let hill3 = Bodies.rectangle(1300, 350, 300, 20, { isStatic: true, angle: -0.2 });

World.add(world, [ground, hill1, hill2, hill3]);

// Car body and wheels
let carBody = Bodies.rectangle(200, 300, 120, 30, { friction: 0.05, density: 0.002 });
let wheelA = Bodies.circle(170, 320, 20, { friction: 0.8, density: 0.002 });
let wheelB = Bodies.circle(230, 320, 20, { friction: 0.8, density: 0.002 });

// Axles
let axleA = Constraint.create({ bodyA: carBody, pointA: {x:-30,y:15}, bodyB: wheelA, stiffness: 0.5, damping:0.1 });
let axleB = Constraint.create({ bodyA: carBody, pointA: {x:30,y:15}, bodyB: wheelB, stiffness: 0.5, damping:0.1 });

World.add(world, [carBody, wheelA, wheelB, axleA, axleB]);

// Camera follow
(function followCar() {
    render.options.hasBounds = true;
    render.bounds.min.x = carBody.position.x - 400;
    render.bounds.max.x = carBody.position.x + 400;
    render.bounds.min.y = 0;
    render.bounds.max.y = 400;
    requestAnimationFrame(followCar);
})();

// Controls
document.addEventListener("keydown", e => {
    if(e.key === "ArrowRight"){
        Body.applyForce(wheelA, wheelA.position, {x:0.02, y:0});
        Body.applyForce(wheelB, wheelB.position, {x:0.02, y:0});
    }
    if(e.key === "ArrowLeft"){
        Body.applyForce(wheelA, wheelA.position, {x:-0.02, y:0});
        Body.applyForce(wheelB, wheelB.position, {x:-0.02, y:0});
    }
    if(e.key === "r"){
        location.reload();
    }
});

// Run engine
Engine.run(engine);