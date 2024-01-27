import { getQuestions, createQuestion } from "./api.js";
import { generateQuizItem } from "./utils/index.js";

const quizContent = document.getElementById("quiz-content");

/**
 * Ambil seluruh data dari inputan yang ada di form `dashboard.html`
 */

const inputQuestion = document.getElementById("form-question");
const inputAnswer = document.getElementById("form-answer");
const inputCategory = document.getElementById("form-category");
const inputLanguage = document.getElementById("form-language");
const submitButton = document.getElementById("form-submit");

document.addEventListener("DOMContentLoaded", () => {
  async function handleAllQuestion() {
    try {
      const questions = await getQuestions();

      // Kalo tidak ada data maka jangan kirim apapun
      if (!questions) return;

      /**
       * Di sini kita akan looping data yang ada di questions
       * Lalu kita akan generate HTML nya
       * Lalu kita akan masukkan ke dalam quizContent
       */
      quizContent.innerHTML = questions
        .map((question) => {
          return generateQuizItem({
            id: question.id,
            question: question.jokes,
            answer: question.answer,
            category: question.category,
          });
        })
        .join("");
    } catch (error) {
      // Tangkap error jika gagal mengambil data di API
      console.error("Ada error nih : ", {
        error,
      });
    }
  }

  handleAllQuestion();

  submitButton.addEventListener("click", async (e) => {
    /**
     * e.preventDefault() adalah untuk mencegah
     * form mengirim data ke halaman lain
     */
    e.preventDefault();

    /**
     * Kita akan mengambil data dari inputan
     * Lalu value inputan tersebut akan kita masukkan ke dalam objek payload
     */
    const payload = {
      jokes: inputQuestion?.value || "",
      category: inputCategory?.value || "",
      language: inputLanguage?.value || "",
      answer: inputAnswer?.value || "",
    };

    try {
      /**
       * Kita akan panggil fungsi createQuestion yang sudah kita buat di file `api.js`
       * Lalu kita akan kirim payload ke dalam fungsi tersebut
       */
      const result = await createQuestion({ payload: payload });

      /**
       * Kita lakukan pengecekan jika ketika respon kode yang diberikan itu 201 (Created)
       * Maka munculkan alert "Berhasil menambahkan data", kosongkan inputan dan reload halaman
       */

      if (result?.code === 201) {
        alert("Berhasil menambahkan data");

        inputQuestion.value = "";
        inputCategory.value = "";
        inputLanguage.value = "";
        inputAnswer.value = "";

        window.location.reload();
      }
    } catch (error) {
      console.error("Error ngirim Nih: ", {
        error,
      });
    }
  });
});
