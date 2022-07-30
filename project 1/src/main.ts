import './style.css'

const canvas = document.getElementById('canvas1') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const select = document.getElementById('select') as HTMLSelectElement

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

const animations = ['Idle', 'Mid-Air', 'Fall', 'Run', 'Staggered', 'Sit', 'Roll', 'Bite', 'Faint', 'Get Hit']

for (const animationNameIndex in animations) {
  const option = document.createElement('option')
  option.value = animationNameIndex
  option.innerHTML = animations[animationNameIndex]
  select.appendChild(option)
}

const SPRITE_WIDTH = 575
const SPRITE_HEIGHT = 523
const STAGGER_FRAMES = 5

let frameX = 0
let frameY = 0
let gameFrame = 0

let spriteCount = 0
spriteCount = returnYCount(frameY, spriteCount)

select.onchange = e => {
  frameY = +(e.target as HTMLSelectElement).value
  spriteCount = returnYCount(frameY, spriteCount)
}


function animate(): void {
  if (frameX > spriteCount) frameX = 0
  gameFrame++
  if (gameFrame % STAGGER_FRAMES == 0) frameX++
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  // ctx.fillRect(50, 50, 100, 100)
  ctx.drawImage(playerImage, frameX * SPRITE_WIDTH, frameY * SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT)
  requestAnimationFrame(animate)
}

animate();

function returnYCount(frameY: number, spriteCount: number) {
  switch (frameY) {
    case 0:
    case 1:
    case 2:
    case 6:
    case 7:
      spriteCount = 4
      break;
    case 3:
      spriteCount = 7
      break;
    case 4:
      spriteCount = 9
      break;
    case 5:
      spriteCount = 3
      break;
    case 8:
      spriteCount = 10
      break;
    case 9:
      spriteCount = 2
      break;

    default:
      break;
  }
  return spriteCount
}