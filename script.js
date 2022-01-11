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
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'];
let checkTexts = [];
let index = 0;
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
    checkTexts[0].className = 'add-color';
    checkTexts.shift();
    score++;
    if(!checkTexts.length) {
      index++;
      createText(index);
    }
  }else if(e.key === 'Shift'){
    wrap.style.backgroundColor = '#666';
  }else{
    wrap.style.backgroundColor = 'crimson';
    miss++;
  }
}
const rankCheck = score => {
  let text = '';
  if(score < 100){
    text = '【結果】\n Cランク\n 次ランクまであと' + (100-score) + '文字です。';
  }else if(score < 200){
    text = '【結果】\n Bランク\n 次ランクまであと' + (200-score) + '文字です。';
  }else if(score < 300){
    text = '【結果】\n Aランク\n 次ランクまであと' + (300-score) + '文字です。';

  }else if(score >= 300){
    text = '';
  }
  return score + "文字打てました！ \n" + text + " \n OK:Retry Cancel:Quit";
};
const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(score));
  if(result === true){
    window.location.reload();
  }
};
const timer = () => {};
start.addEventListener('click',() => {
  createText(index);
  start.style.display = 'none';
  flex.style.display = 'flex';

  document.addEventListener('keydown',keyDown);
})