const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

const textLists = ['Hello World','This is my App','How are you?'];
let checkTexts = [];
const createText = () => {
  const p = document.getElementById('text');
  const rnd = Math.floor(Math.random() * textLists.length);
  p.textContent = '';
  checkTexts = textLists[rnd].split('').map(value => {
    const span = document.createElement('span');
    span.textContent = value;
    p.appendChild(span);
    return span;
  })
};
const keyDown = e =>{
  if(e.key === checkTexts[0].textContent){
    checkTexts[0].className = 'add-color';
    checkTexts.shift();
    if(!checkTexts.length) createText();
  }
}
const rankCheck = rank => {};
const gameOver = id => {};
const timer = () => {};
start.addEventListener('click',() => {
  createText();
  document.addEventListener('keydown',keyDown);
})