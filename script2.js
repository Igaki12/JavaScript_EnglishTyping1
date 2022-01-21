import { exportList } from "./common.js";
const textLists = exportList();

const count = document.getElementById('count');
const rating = document.getElementById('rating');
const flex = document.getElementById('flex');
flex.style.display = 'flex';

const question = document.getElementById('question');
const answer = document.getElementById('answer');

const stop = document.getElementById('stop_appearWords');
const pass_btn = document.getElementById('pass_btn');

// const textLists = [{
//   word:"essential",
//   text:"It is essential that we act quickly.",
// },{
//   word:"nourish",
//   text:"Sleep and nourishing food are essential to health.",
// },{
//   word:"fatigue",
//   text:"I was fatigued with my work.",
// },{
//   word:"inflammation",
//   text:"You should go to the hospital if the inflammation wouldn't be reduced.",
// },{
//   word:"pancreas",
//   text:"The pancreas produces several hormones, including insulin.",
// },{
//   word:"spleen",
//   text:"The spleen is an organ that is part of the lymphatic system.",
// },{
//   word:"synthetic",
//   text:"All men are arrogant is a synthetic proposition.",
// },{
//   word:"gall bladder",
//   text:"A steroid acid is produced in the liver and stored with the gall bladder.",
// },{
//   word:"tumor",
//   text:"Tumor is an abnormal mass of tissue that results when cells divide more than they should or do not die when they should.",
// },{
//   word:"curvature",
//   text:"Spinal curvature is a disease of abnormal curving of the spine.",
// },{
//   word:"dendritic cell",
//   text:"A dendritic cell is a type of phagocyte and a type of antigen-presenting cell.",
// },
// ];
let checkAnswer = [];
let index;
let resultFlag;
let score = 0;
let miss = 0;
const updateRating = () => {
  rating.textContent = `正解:${score}　　不正解:${miss}　　残り:${textLists.length - score - miss} / ${textLists.length} 文`;
}
let countMarks = [];
function renderCount(l){
  count.textContent = "";
  countMarks = Array(Math.ceil(l)).fill("■").map((value) => {
    const span = document.createElement('span');
    span.textContent = value;
    span.style.color = '#666';
    count.appendChild(span);
    return span;
  })
}
function decreaseCount(r){
  if(r > countMarks.length && resultFlag === 0){
    miss++;
    resultFlag = 1;
    updateRating();
    giveUp();
  }else{
    for (let i = 0;i < r; i++){
      countMarks[countMarks.length - 1].style.color = '#EEE';
      countMarks.pop();
    }
  }
}

function giveUp(){
  count.style.letterSpacing = '0';
  count.style.textAlign = 'center';
  count.textContent = 'Press Enter Key';
  count.style.color = 'rgb(17, 133, 2)';
  count.style.fontWeight = 'bold';
  wrap.style.backgroundColor = 'rgb(17, 133, 2)';
  for(let i=0;i<checkAnswer.length;i++){
    checkAnswer[i].style.opacity = 1;
    checkAnswer[i].style.color = '#FFF';
  }
  document.addEventListener('keydown',(e) => {
    if(e.key === 'Enter'){
      count.style.letterSpacing = '-5px';
      count.style.color = '#666';
      count.style.fontWeight = 'normal';
      count.style.textAlign = 'left';
      createText();
      return;
    }
  })
}
let appearWordsFlag = 0;
function appearWords() {
  const checkAnswer0 = checkAnswer[0];
  const checkAnswer1 = checkAnswer[1];
  const checkAnswer2 = checkAnswer[2];
  checkAnswer0.className = 'initial';
  // setInterval(() => {
  //   checkAnswer[0].style.opacity ^= 1;
  // },500);

  const appearWord0 = new Promise((resolve,reject) => {
    if(appearWordsFlag > 0){
      appearWordsFlag = 0;
      reject();
    }
    appearWordsFlag ++;
    setTimeout(()=> {
      if (checkAnswer.length > 1 && checkAnswer[0].textContent != ' '){
        resolve();
      }
    },2000);
    document.addEventListener('keydown',(e)=> {
      if (e.key === checkAnswer0.textContent){
        appearWordsFlag = 0;
        reject();
      }
    })
  })
  appearWord0.then(()=> {
    const appearWord1 = new Promise((resolve, reject) => {
      if(stop.checked){
        appearWordsFlag = 0;
        reject();
      }
      if (checkAnswer0.style.opacity === '0'){
        checkAnswer0.style.color = 'rgb(153, 152, 152)';
        checkAnswer0.style.opacity = 1;
      }
      setTimeout(()=> {
        if (checkAnswer.length > 5 && checkAnswer[1].textContent != ' '){
          resolve();
        }
      },2000);
      document.addEventListener('keydown', (e) => {
        if (e.key === checkAnswer0.textContent)
          appearWordsFlag = 0;
          reject();
      });
    });

  appearWord1.then(() => {
    const appearWord2 = new Promise((resolve, reject) => {
      if(stop.checked){
        appearWordsFlag = 0;
        reject();
      }
      if (checkAnswer1.style.opacity === '0'){
        checkAnswer1.style.color = 'rgb(153, 152, 152)';
        checkAnswer1.style.opacity = 1;
        decreaseCount(1);
      }

      if (checkAnswer.length > 5 && checkAnswer[2].textContent != ' ') {
        setTimeout(() => {
          resolve();
        }, 3000);
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === checkAnswer0.textContent){
          appearWordsFlag = 0;
          reject();
        }
      });
    });
    appearWord2.then(() => {
      const appearWord3 = new Promise((resolve, reject) => {
        appearWordsFlag = 0;
        if(stop.checked){
          reject();
        }
        if (checkAnswer2.style.opacity === '0'){
          checkAnswer2.style.color = 'rgb(153, 152, 152)';
          checkAnswer2.style.opacity = 1;
          decreaseCount(1);
        }
      });
    });
  });
});
}

const createText = () => {
  question,answer.textContent = '';
  index = chooseIndex();
  if(textLists[index]){
    resultFlag = 0;
    checkAnswer = textLists[index].text.split('').map((value) => {
      const span = document.createElement('span');
      span.textContent = value;
      span.style.opacity = 0;
      answer.appendChild(span);
      question.textContent = textLists[index].word + ":";
      return span;
    })
    let countNum = 10;
    countNum = textLists[index].text.split('').length * 0.2;
    console.log(countNum);
    renderCount(countNum);
    appearWords();
  }
}

const gameOver = () => {
  const result = confirm(resultCheck());
  if (result === true){
    window.location.reload();
  }
}
const resultCheck = () => {
  let msg = `【結果】\n 正解数:${score}　　不正解数:${miss} \n 正解率:` + (100*score/(score+miss)) + `% \n OK:Retry　　Cancel:Quit`;
  return msg;
}

const keyDown = e => {
  stop.blur();
  pass_btn.blur();
  if(e.key === checkAnswer[0].textContent){
    if(e.key === ' '){
      checkAnswer[0].style.backgroundColor = '#777';
    }
    wrap.style.backgroundColor = '#666';
    checkAnswer[0].style.color = '#FFF';
    checkAnswer[0].style.opacity = 1;
    checkAnswer.shift();
    if(e.key === ' '){
      appearWords();
    }
    if(!checkAnswer.length) {
      if((textLists.length - score - miss) <= 1){
        score++;
        resultFlag = 1;
        updateRating();
        setInterval(() => {
          gameOver();
        },210);
      }else{
        score++;
        resultFlag = 1;
        createText();
        updateRating();
      }
    }
  }else if(e.key === 'Shift'){
    wrap.style.backgroundColor = '#666';
  }else{
    if (e.key != 'Enter'){
      wrap.style.backgroundColor = 'crimson';
    }
    if(checkAnswer[0].textContent === ' '){
      checkAnswer[0].style.backgroundColor = '#777';
    }
    checkAnswer[0].style.color = '#FFF';
    checkAnswer[0].style.opacity = 1;
    checkAnswer.shift();
    if(checkAnswer[0].textContent === ' '){
      appearWords();
    }
    decreaseCount(1);
  }
}
const pressPassButton = () => {
  if(unChosenIndex.length > 0 && resultFlag === 0){
    decreaseCount(100);
  }
  return
}
let unChosenIndex = Array(textLists.length).fill("").map((value,index)=> index);
let chosenIndex = [];
let rnd = 0;
const chooseIndex = () => {
  do{
    rnd = Math.floor(Math.random() * textLists.length);
  }while(unChosenIndex.findIndex((value) => value === rnd) === -1)
  chosenIndex.push(rnd);
  let newIndex = unChosenIndex.filter((value)=> value != rnd)
  unChosenIndex = newIndex;
  console.log(unChosenIndex);
  return rnd;
}
updateRating();
createText();
document.addEventListener('keydown',keyDown);
pass_btn.addEventListener('click',pressPassButton);
