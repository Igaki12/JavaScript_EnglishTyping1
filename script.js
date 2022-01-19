import { exportList } from "./common.js";
const textLists = exportList();
const wrap = document.getElementById('wrap');
const practice = document.getElementById('practice');
const exam = document.getElementById('exam');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const flex = document.getElementById('flex');
const rating = document.getElementById('rating');
const back_btn = document.getElementById('back_btn');
const pass_btn = document.getElementById('pass_btn');

const practice_screen = document.getElementById('practice-screen');
const exam_screen = document.getElementById('exam-screen');

// let outputElement = document.getElementById('outputCsv');
// function getCsv(dataPath){
//   const request = new XMLHttpRequest();
//   request.addEventListener('load', (event) => {
//     const response = event.target.responseText;
//     outputElement.innerHTML = response;
//   })
//   request.open('GET',dataPath,true);
//   request.send();
// }
// getCsv('./textList.csv');


const updateRating = () => {
  rating.textContent = `良:${score}　　不可:${miss}　　残り:${textLists.length - index} / ${textLists.length} 文`;
}

next.textContent = `first>>　${textLists[0].text}`;
let checkAnswer = [];
let index = 0;
let time = 0;
const retryCheck = () => {
  let msg = `【結果】\n 成功タイプ数:${score}　　失敗タイプ数:${miss} \n タイプ成功率:` + (100*score/(score+miss)) + `% \n OK:Retry　　Cancel:Quit`;
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
  if(textLists[i]){
    checkAnswer = textLists[i].text.split('').map(value => {
      const span = document.createElement('span');
      span.textContent = value;
      text.appendChild(span);
      return span;
    })
  }
  if(i > 0){
    prev.textContent = textLists[i - 1].text;
  }else{
    prev.textContent = "練習開始";
  }
  if(i < textLists.length - 1){
    next.textContent = textLists[i + 1].text;
  }else{
    next.textContent = "練習終了";
  }
};
let score = 0;
let miss = 0;
const keyDown = e =>{
  if(e.key === checkAnswer[0].textContent){
    wrap.style.backgroundColor = '#666';
    checkAnswer[0].style = 'color:#777;';
    checkAnswer.shift();
    score++;
    updateRating();
    if(!checkAnswer.length) {
      if((textLists.length-index) <= 1){
        setTimeout(() => {
          gameOver();
        }, 300);
      }else{
        index++;
        createText(index);
        updateRating();
      }
          }
  }else if(e.key === 'Shift'){
    wrap.style.backgroundColor = '#666';
  }else{
    wrap.style.backgroundColor = 'crimson';
    miss++;
    updateRating();
  }
}
const pressBackButton = () => {
  if(index < 1){
    return
  }
  index--;
  createText(index);
  updateRating();
}
const pressPassButton = () => {
  if(index > textLists.length - 2){
    return
  }
  index++;
    createText(index);
    updateRating();
}
practice.addEventListener('click',() => {
  createText(index);
  practice.style.display = 'none';
  exam.style.display = 'none';
  flex.style.display = 'flex';
  updateRating();
  document.addEventListener('keydown',keyDown);
  back_btn.addEventListener('click',pressBackButton);
  pass_btn.addEventListener('click',pressPassButton);
})

