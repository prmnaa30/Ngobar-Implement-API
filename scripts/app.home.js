import { getQuestionById } from "./api.js";
import { generateRandomNumber, generateElement } from "./utils/index.js";

const question = document.getElementById("question");
const questionCategory = document.getElementById("question_category");
const buttonSubmit = document.getElementById("button_submit");

document.addEventListener("DOMContentLoaded", () => {
  // Berikan nilai awal untuk element dengan ID 'question' dan 'question_category'
  question.innerText = "...?";
  questionCategory.innerText = "Tidak ada kategori";

  buttonSubmit.addEventListener("click", async () => {
    // Generate angka random dari fungsi generateRandomNumber
    const generateNumber = generateRandomNumber(1, 20);

    try {
      // Call API dengan parameter id yang di generate dari fungsi generateRandomNumber
      const response = await getQuestionById({ id: generateNumber });

      // Jika response tidak ada, maka hentikan proses selanjutnya
      if (!response) return;

      // Buat element span dengan class 'question-category' dan value dari response.answer
      const span = generateElement({
        tag: "span",
        className: "question-category",
        value: response.answer,
      });

      // Berikan value dari response.question ke element dengan ID 'question'
      question.innerText = response.question || "Tunggu dulu...";

      // Tambahkan element span ke dalam element dengan ID 'question'
      question.appendChild(span);
      // Berikan value dari response.category ke element dengan ID 'question_category'
      questionCategory.innerText = response.category || "Tidak ada kategori...";

      // console.log({ response });
    } catch (error) {
      console.error("Error nich : ", { error });
    }
  });
});
