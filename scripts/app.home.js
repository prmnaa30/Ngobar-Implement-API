import { getQuestionById } from './api.js';
import { generateRandomNumber, generateElement } from './utils/index.js';

const question = document.getElementById("question");
const questionCategory = document.getElementById("question_category");
const buttonSubmit = document.getElementById("button_submit");

document.addEventListener('DOMContentLoaded', () => {
    // Teks Awal pada HTML
    question.innerText = '...?';
    questionCategory.innerText = 'Tidak ada kategori';

    // Generate angka random dari fungsi generateRandomNumber
    buttonSubmit.addEventListener('click', async() => {
        const generateNumber = generateRandomNumber(1, 20);
        
        try {
            const response = await getQuestionById({ id: generateNumber });

            if (!response) return;
            question.innerText = response.jokes || "Tunggu...";
            questionCategory.innerText = response.category || "Tidak ada kategori";
            const span = generateElement({
                tag: "span",
                className: "question-category",
                value: response.answer
            });

            question.appendChild(span);

        } catch (error) {
            console.error("Error: ", { error })
        }
    });
});
