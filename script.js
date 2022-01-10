const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

const textLists = ['Hello World','This is my App','How are you?'];
const createText = () => {
  const p = document.getElementById('text');
  const rnd = Math.floor(Math.random() * textLists.length);
  p.textContent = '';
  textLists[rnd].split('').map(value => {
    const span = document.createElement('span');
    span.textContent = value;
    p.appendChild(span);
  })
};
const keyDown = e => {};
const rankCheck = rank => {};
const gameOver = id => {};
const timer = () => {};
start.addEventListener('click',() => {
  createText();
  document.addEventListener('keydown',keyDown);
});
const keyDown = e =>{
  console.log(e);
}