const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const flex = document.getElementById('flex');
const good = document.getElementById('good');
const bad = document.getElementById('bad');
const rest = document.getElementById('rest');

const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer',];
next.textContent = `first>>　${textLists[0]}`;
let checkTexts = [];
let index = 0;
const retryCheck = () => {
  let msg = `【結果】\n 成功タイプ数:${score}　　失敗タイプ数:${miss} \n タイプ成功率:` + (100*score/(score+miss)) + `OK:Retry　　Cancel:Quit`;
  return msg;
}
function gameOver() {
  const result = confirm(retryCheck());
  if (result === true) {
    window.location.reload();
  }
}
const createText = (i) => {
  const text = document.getElementById('text');
  text.textContent = '';
  checkTexts = textLists[i].split('').map(value => {
    const span = document.createElement('span');
    span.textContent = value;
    text.appendChild(span);
    return span;
  })
  if(i > 0){
    prev.textContent = textLists[i - 1];
  }
  if(i < textLists.length - 1){
    next.textContent = textLists[i + 1];
  }else{
    next.textContent = "練習終了";
  }
};
let score = 0;
let miss = 0;
const keyDown = e =>{
  if(e.key === checkTexts[0].textContent){
    wrap.style.backgroundColor = '#666';
    checkTexts[0].style = 'color:#777;';
    checkTexts.shift();
    score++;
    good.textContent = '　　良:' + score;
    if(!checkTexts.length) {
      if(textLists.length < 2){
        alert('Finished!');
        gameOver();
      }
      index++;
      createText(index);
      rest.textContent = '　　残り:' + (textLists.length-index-1) + '文';
    }
  }else if(e.key === 'Shift'){
    wrap.style.backgroundColor = '#666';
  }else{
    wrap.style.backgroundColor = 'crimson';
    miss++;
    bad.textContent = '　　不可:' + miss;
  }
}
const timer = () => {};
start.addEventListener('click',() => {
  createText(index);
  start.style.display = 'none';
  flex.style.display = 'flex';
  good.textContent = '　　良:' + score;
  bad.textContent = '　　不可:' + miss;
  rest.textContent = '　　残り:' + (textLists.length-1) + '文' ;
  document.addEventListener('keydown',keyDown);
})