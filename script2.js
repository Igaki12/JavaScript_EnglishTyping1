const count = document.getElementById('count');

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

function renderCount(l){
  Array(l).fill('■').map((value) => {
    const span = document.createElement('span');
    span.textContent = value;
    count.appendChild(span);
    return span;
  })
}
renderCount(10);

const createText = (i) => {
  const question = document.getElementById('question');
  const answer = document.getElementById('answer');
  question,answer.textContent = '';
  if(textLists[i]){
    checkQuestion = textLists[i].text.split('').map((value) => {
      const span = document.createElement('span');
      span.textContent = value;
      question.appendChild(span);
    })
    answer.textContent = textLists[i].word
    return span;
  }
}
createText(1);