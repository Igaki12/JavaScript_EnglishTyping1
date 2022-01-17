const count = document.getElementById('count');
const rating = document.getElementById('rating');

const question = document.getElementById('question');
const answer = document.getElementById('answer');

const textLists = [{
  word:"essential",
  text:"It is essential that we act quickly.",
},{
  word:"nourish",
  text:"Sleep and nourishing food are essential to health.",
},{
  word:"fatigue",
  text:"I was fatigued with my work.",
},{
  word:"inflammation",
  text:"You should go to the hospital if the inflammation wouldn't be reduced.",
},{
  word:"pancreas",
  text:"The pancreas produces several hormones, including insulin.",
},{
  word:"spleen",
  text:"The spleen is an organ that is part of the lymphatic system.",
},{
  word:"synthetic",
  text:"All men are arrogant is a synthetic proposition.",
},{
  word:"gall bladder",
  text:"A steroid acid is produced in the liver and stored with the gall bladder.",
},{
  word:"tumor",
  text:"Tumor is an abnormal mass of tissue that results when cells divide more than they should or do not die when they should.",
},{
  word:"curvature",
  text:"Spinal curvature is a disease of abnormal curving of the spine.",
},{
  word:"dendritic cell",
  text:"A dendritic cell is a type of phagocyte and a type of antigen-presenting cell.",
},
];
let index;

let score = 0;
let miss = 0;
const updateRating = () => {
  rating.textContent = `良:${score}　　不可:${miss}　　残り:${textLists.length - score - miss} / ${textLists.length} 文`;
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
  if(r > countMarks.length){
    miss++;
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
  count.textContent = 'Press Enter Key';
  wrap.style.backgroundColor = 'rgb(17, 133, 2)';
  checkAnswer.style.opacity = 1;
  // document.addEventListener('keydown',(e) => {
  //   if(e.key === 'Enter'){
  //     index = chooseIndex();
  //     createText(index);
  //   }
  // })
}

function appearWords() {
  const checkAnswer0 = checkAnswer[0];
  const checkAnswer1 = checkAnswer[1];
  const checkAnswer2 = checkAnswer[2];
  checkAnswer0.className = 'initial';
  checkAnswer0.className = 'second-initial';
  // setInterval(() => {
  //   checkAnswer[0].style.opacity ^= 1;
  // },500);
  const appearWord1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkAnswer.length > 1 && checkAnswer[0].textContent != ' ') {
        checkAnswer0.style.opacity = 1;
        resolve();
      }
    }, 3000);
    document.addEventListener('keydown', (e) => {
      if (e.key === checkAnswer0.textContent)
        reject;
    });
  });
  appearWord1.then(() => {
    const appearWord2 = new Promise((resolve, reject) => {
      if (checkAnswer.length > 5 && checkAnswer[1].textContent != ' ') {
        setTimeout(() => {
          checkAnswer1.className = 'second-initial';
          checkAnswer1.style.opacity = 1;
          decreaseCount(1);
          resolve();
        }, 5000);
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === checkAnswer0.textContent)
          reject;
      });
    });
    appearWord2.then(() => {
      const appearWord3 = new Promise((resolve, reject) => {
        if (checkAnswer.length > 5 && checkAnswer[2].textContent != ' ') {
          setTimeout(() => {
            checkAnswer2.className = 'second-initial';
            checkAnswer2.style.opacity = 1;
            decreaseCount(1);
            resolve();
          }, 5000);
        }
        document.addEventListener('keydown', (e) => {
          if (e.key === checkAnswer0.textContent)
            reject;
        });
      });
    });
  });
}

const createText = (i) => {
  question,answer.textContent = '';
  if(textLists[i]){
    checkAnswer = textLists[i].text.split('').map((value) => {
      const span = document.createElement('span');
      span.textContent = value;
      span.style.opacity = 0;
      answer.appendChild(span);
      return span;
    })
    question.textContent = textLists[i].word + ":";
    let countNum = 10;
    countNum = textLists[i].text.split('').length * 0.2;
    console.log(countNum);
    renderCount(countNum);
    appearWords();
  }
}



const keyDown = e => {
  if(e.key === checkAnswer[0].textContent){
    wrap.style.backgroundColor = '#666';
    checkAnswer[0].style.color = '#FFF';
    checkAnswer.shift();
    if(e.key === ' '){
      console.log("appearWord1");
      appearWords();
    }
    if(!checkAnswer.length) {
      if((textLists.length - score - miss) <= 1){
      }else{
        score++;
        createText(1);
        updateRating();
      }
    }
  }else if(e.key === 'Shift'){
    wrap.style.backgroundColor = '#666';
  }else{
    wrap.style.backgroundColor = 'crimson';
    decreaseCount(1);
  }
}
let unChosenIndex = Array(textLists.length).fill("").map((value,index)=> index);
let chosenIndex = [];
let rnd = 0;
const chooseIndex = () => {
  do{
    rnd = Math.floor(Math.random() * unChosenIndex.length);
  }while(unChosenIndex.findIndex((value) => value === rnd) === -1)
  chosenIndex.push(rnd);
  unChosenIndex = unChosenIndex.filter((value)=> value != rnd)
  return rnd;
}
updateRating;
index = chooseIndex();
console.log(index);
createText(index);
document.addEventListener('keydown',keyDown);