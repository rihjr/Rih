// Recomeçado com trator, celeiro, avião, prédios, estradas e árvores (sem pessoas e sem vaca)
let tractor = { x: -100, y: 340, speed: 1.2 }, plane = { x: -100, y: 60, speed: 2 };
let clouds = [];

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 4; i++) {
    clouds.push({ x: random(width), y: random(20, 100), speed: random(0.2, 0.5) });
  }
}

function draw() {
  let t = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
  background(lerpColor(color(135, 206, 250), color(100), t));

  drawClouds();
  fill(lerpColor(color(255, 204, 0), color(80), t));
  noStroke(); ellipse(100, 80, 80);
  fill(lerpColor(color(34, 139, 34), color(60), t));
  rect(0, height * 0.75, width, height * 0.25);

  drawDirtPaths(1 - t);
  drawTrees(1 - t);
  drawBarn(1 - t);

  if (t < 0.8) {
    drawTractor();
    tractor.x += tractor.speed;
    if (tractor.x > width) tractor.x = -100;
  }

  if (t > 0.5) {
    drawPlane();
    plane.x += plane.speed;
    if (plane.x > width + 100) plane.x = -100;
  }

  drawBuildings(t);

  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Deslize o mouse da esquerda para a direita →", width / 2, 30);
}

function drawTractor() {
  fill(0, 102, 0);
  rect(tractor.x, tractor.y - 20, 60, 20);
  rect(tractor.x + 10, tractor.y - 40, 30, 20);
  fill(0);
  ellipse(tractor.x + 10, tractor.y, 20);
  ellipse(tractor.x + 50, tractor.y, 30);
}

function drawPlane() {
  fill(200);
  rect(plane.x, plane.y, 60, 10);
  triangle(plane.x, plane.y, plane.x - 10, plane.y + 5, plane.x, plane.y + 10);
  rect(plane.x + 40, plane.y - 5, 5, 20);
}

function drawClouds() {
  for (let c of clouds) {
    fill(255, 255, 255, 180);
    noStroke();
    ellipse(c.x, c.y, 40, 30);
    c.x += c.speed;
    if (c.x > width + 50) c.x = -50;
  }
}

function drawBuildings(t) {
  let buildingColor = lerpColor(color(200), color(50), t);
  let count = int(map(t, 0, 1, 0, 4));
  for (let i = 0; i < count; i++) {
    let x = width - 100 * (i + 1);
    let h = 100 + i * 30;
    fill(buildingColor);
    rect(x, height - h, 60, h);
    fill(255, 255, 0, 200);
    for (let wy = height - h + 10; wy < height - 10; wy += 20) {
      for (let wx = x + 10; wx < x + 50; wx += 20) {
        rect(wx, wy, 10, 10);
      }
    }
  }
}

function drawBarn(alpha) {
  push();
  fill(178, 34, 34, 255 * alpha);
  rect(100, 220, 80, 80);
  triangle(100, 220, 140, 180, 180, 220);
  fill(255, 255, 255, 255 * alpha);
  rect(125, 260, 20, 40);
  pop();
}

function drawTrees(alpha) {
  let trees = [250, 300, 350];
  for (let x of trees) {
    fill(101, 67, 33, 255 * alpha);
    rect(x, 280, 20, 60);
    fill(34, 139, 34, 255 * alpha);
    ellipse(x + 10, 270, 50);
  }
}

function drawDirtPaths(alpha) {
  stroke(139, 69, 19, 255 * alpha);
  strokeWeight(20);
  noFill();
  beginShape();
  vertex(100, height);
  vertex(140, height * 0.75);
  vertex(160, height * 0.75);
  endShape();

  beginShape();
  vertex(300, height);
  vertex(340, height * 0.75);
  vertex(360, height * 0.75);
  endShape();
  noStroke();
}
