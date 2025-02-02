let song;
let amp;
let trumpetImg; 
let trumpets = [];

function preload() {
  song = loadSound("On entend des trompettes.mp3"); 
  
  trumpetImg = loadImage("Trumpet.png"); 
}

function setup() {
  createCanvas(800, 500);
  song.play();
  amp = new p5.Amplitude();

  // Create the first trumpet (this one NEVER disappears)
  trumpets.push(new Trumpet(width / 2, height / 2, true));
}

function draw() {
  background(10, 10, 30);
  
  if (!song.isPlaying())
    fill(255, 255, 0);
textSize(32);
textAlign(CENTER);
text( "Joyeux Anniv Sarah !", width / 2, height - 50);

  // Update & display all trumpets
  for (let i = trumpets.length - 1; i >= 0; i--) {
    trumpets[i].update();
    trumpets[i].display();
    
    // If the mouse rolls over a trumpet, teleport it
    if (trumpets[i].isHovered(mouseX, mouseY)) {
      trumpets[i].teleport();
    }

    // Remove old trumpets (except the first one)
    if (!trumpets[i].permanent && trumpets[i].isGone()) {
      trumpets.splice(i, 1);
    }
  }
}

// Trumpet Class (Animated Image)
class Trumpet {
  constructor(x, y, permanent = false) {
    this.x = x;
    this.y = y;
    this.baseSize = random(100, 250); // Random starting size
    this.size = this.baseSize;
    this.alpha = 255;
    this.permanent = permanent; // If true, the trumpet never disappears
  }

  update() {
    let level = amp.getLevel();
    this.size = this.baseSize + map(level, 0, 1, 0, 100); // Animate size with sound
    
    if (!this.permanent) {
      this.alpha -= 0.5; // Gradually disappear (only for extra trumpets)
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);

    // Draw trumpet image
    tint(255, this.alpha);
    image(trumpetImg, 0, 0, this.size, this.size * 0.6);
    pop();
  }

  isHovered(mx, my) {
    return dist(mx, my, this.x, this.y) < this.size / 2;
  }

  teleport() {
    this.x = random(width);
    this.y = random(height);
  }

  isGone() {
    return this.alpha < 0;
  }
}

// Add a new animated trumpet at the click position (random size)
function mousePressed() {
  trumpets.push(new Trumpet(mouseX, mouseY));
}
