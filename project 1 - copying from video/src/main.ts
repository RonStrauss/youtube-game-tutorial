import "./style.css";

let playerState = 'Idle'


const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const dropdown = document.getElementById('animations') as HTMLSelectElement

dropdown.addEventListener('change', function (){
  playerState = this.value
})
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

// const select = document.getElementById('select') as HTMLSelectElement

const playerImage = new Image();
playerImage.src = "shadow_dog.png";

// const animations = ['Idle', 'Mid-Air', 'Fall', 'Run', 'Staggered', 'Sit', 'Roll', 'Bite', 'Faint', 'Get Hit']

// for (const animationNameIndex in animations) {
//   const option = document.createElement('option')
//   option.value = animationNameIndex
//   option.innerHTML = animations[animationNameIndex]
//   select.appendChild(option)
// }

const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimations: { [stateName: string]: Frames } = {};
const animationsStates = [
	{
		name: "Idle",
		frames: 7,
	},
	{
		name: "Jump",
		frames: 7,
	},
	{
		name: "Fall",
		frames: 7,
	},
	{
		name: "Run",
		frames: 9,
	},
	{
		name: "Dizzy",
		frames: 11,
	},
	{
		name: "Sit",
		frames: 5,
	},
	{
		name: "Roll",
		frames: 7,
	},
	{
		name: "Bite",
		frames: 7,
	},
	{
		name: "K.O.",
		frames: 12,
	},
	{
		name: "Get Hit",
		frames: 4,
	},
];
animationsStates.forEach((state, i) => {
	let frames: Frames = {
		loc: [],
	};
	for (let j = 0; j < state.frames; j++) {
		let positionX = j * spriteWidth;
		let positionY = i * spriteHeight;
		frames.loc.push({ x: positionX, y: positionY });
	}
	spriteAnimations[`${state.name}`] = frames;
});
console.log(spriteAnimations);

// let spriteCount = 0
// spriteCount = returnYCount(frameY, spriteCount)

// select.onchange = e => {
//   frameY = +(e.target as HTMLSelectElement).value
//   spriteCount = returnYCount(frameY, spriteCount)
// }

function animate(): void {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
let frameX = spriteWidth * position;
let frameY = spriteAnimations[playerState].loc[position].y
	// if (frameX > spriteCount) frameX = 0
	// if (gameFrame % STAGGER_FRAMES == 0) frameX++
	// ctx.fillRect(50, 50, 100, 100)
	ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

	gameFrame++;
	requestAnimationFrame(animate);
}

animate();

// function returnYCount(frameY: number, spriteCount: number) {
//   switch (frameY) {
//     case 0:
//     case 1:
//     case 2:
//     case 6:
//     case 7:
//       spriteCount = 4
//       break;
//     case 3:
//       spriteCount = 7
//       break;
//     case 4:
//       spriteCount = 9
//       break;
//     case 5:
//       spriteCount = 3
//       break;
//     case 8:
//       spriteCount = 10
//       break;
//     case 9:
//       spriteCount = 2
//       break;

//     default:
//       break;
//   }
//   return spriteCount
// }

type Frames = { loc: { x: number; y: number }[] };
