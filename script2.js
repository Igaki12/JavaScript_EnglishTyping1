import { exportList } from "script.js";
const count = document.getElementById('count');

const textLists = exportList();

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