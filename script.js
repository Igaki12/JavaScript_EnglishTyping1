const wrap = document.getElementById('wrap');
const practice = document.getElementById('practice');
const exam = document.getElementById('exam');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const flex = document.getElementById('flex');
const good = document.getElementById('good');
const bad = document.getElementById('bad');
const rest = document.getElementById('rest');

const practice_screen = document.getElementById('practice-screen');
const exam_screen = document.getElementById('exam-screen');

const textLists = [{
  word:"essential",
  text:"It's essential that we act quickly.",
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
next.textContent = `first>>　${textLists[0].text}`;
let checkTexts = [];
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
    checkTexts = textLists[i].text.split('').map(value => {
      const span = document.createElement('span');
      span.textContent = value;
      text.appendChild(span);
      return span;
    })
  }
  if(i > 0){
    prev.textContent = textLists[i - 1].text;
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
  if(e.key === checkTexts[0].textContent){
    wrap.style.backgroundColor = '#666';
    checkTexts[0].style = 'color:#777;';
    checkTexts.shift();
    score++;
    good.textContent = '　　良:' + score;
    if(!checkTexts.length) {
      if((textLists.length-index) <= 1){
        setTimeout(() => {
          gameOver();
        }, 300);
      }else{
        index++;
        createText(index);
        rest.textContent = '　　残り:' + (textLists.length-index-1) + '文';

      }
          }
  }else if(e.key === 'Shift'){
    wrap.style.backgroundColor = '#666';
  }else{
    wrap.style.backgroundColor = 'crimson';
    miss++;
    bad.textContent = '　　不可:' + miss;
  }
}
practice.addEventListener('click',() => {
  createText(index);
  practice.style.display = 'none';
  exam.style.display = 'none';
  flex.style.display = 'flex';
  good.textContent = '　　良:' + score;
  bad.textContent = '　　不可:' + miss;
  rest.textContent = '　　残り:' + (textLists.length-1) + '文' ;
  document.addEventListener('keydown',keyDown);
})


const createQuestion = () => {
  
}
exam.addEventListener('click',() =>{
  practice.style.display = 'none';
  exam.style.display = 'none';
  practice_screen.display = 'none';
  exam_screen.display = 'display';
})