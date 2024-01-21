export function generateRandomNumber(min = 1, max = 20) {
  const randomNumber = Math.floor(Math.random() * max);

  return randomNumber + min;
}

export function generateElement({ tag, id, className, value }) {
  const element = document.createElement(tag);

  if (id) element.id = id;
  if (className) element.className = className;
  if (value) element.innerText = value;

  return element;
}

export function generateQuizItem({
  id = 0,
  question = "..??",
  answer = "??",
  category = "??",
}) {
  return `
    <div class="quiz-item">
      <div class="section-left">
        <h4 id="quiz-question">${question}</h4>
        <p id="quiz-answer">${answer}</p>
      </div>

      <p id="quiz-category">${category}</p>

      <div class="section-right">s</div>
    </div>
  `;
}
