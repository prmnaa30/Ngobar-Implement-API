import {
  getQuestions,
  createQuestion,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById,
} from "./api.js";
import { generateElement, Icon } from "./utils/index.js";

const quizContent = document.getElementById("quiz-content");

/**
 * Ambil seluruh data dari inputan yang ada di form `dashboard.html`
 */

const inputQuestion = document.getElementById("form-question");
const inputAnswer = document.getElementById("form-answer");
const inputCategory = document.getElementById("form-category");
const inputLanguage = document.getElementById("form-language");

const inputSearch = document.getElementById("form-search");

// Input id sebagai hidden input untuk menampung id dari data yang akan di update
const inputId = document.getElementById("form-id");

const submitButton = document.getElementById("button-submit");

document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk menghapus data
  async function handleDeleteQuestion(id) {
    try {
      const result = await deleteQuestionById({ id });

      if (!result) return;

      if (result?.code === 200) {
        alert("Berhasil menghapus data");

        window.location.reload();
      }
    } catch (error) {
      console.error("Error ngirim Nih: ", {
        error,
      });
    }
  }

  // Fungsi untuk menampilkan data berdasarkan id
  async function handleShowQuestionById(id) {
    try {
      const result = await getQuestionById({ id });

      if (!result) return;

      inputQuestion.value = result?.question;
      inputAnswer.value = result?.answer;
      inputCategory.value = result?.category;
      inputLanguage.value = result?.language;
      inputId.value = result?.id;

      submitButton.classList.remove("button-submit");
      submitButton.classList.add("button-submit-edit");

      submitButton.innerText = "Update";
    } catch (error) {
      console.error("Error ngirim Nih: ", {
        error,
      });
    }
  }

  // Fungsi untuk menambahkan data
  async function handleAddQuestion(payload) {
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
  }

  // Fungsi untuk mengupdate data
  async function handleUpdateQuestionById(id, payload) {
    try {
      const result = await updateQuestionById({ id, payload });

      if (!result) return;

      if (result?.code === 200) {
        alert("Berhasil mengupdate data");

        window.location.reload();
      }
    } catch (error) {
      console.error("Error ngirim Nih: ", {
        error,
      });
    }
  }

  // Fungsi untuk menampilkan data di dashboard
  async function handleAllQuestion() {
    try {
      const questions = await getQuestions();
      const filteredQuestions = [...questions];

      // Kalo tidak ada data maka jangan kirim apapun
      if (!questions) return;

      inputSearch.addEventListener("keyup", (e) => {
        e.preventDefault();

        /**
         * Ambil value dari inputan search nya
         * Lalu kita gunakan method filter untuk mencari data yang sesuai dengan inputan search nya
         * Lalu kita render ulang data nya
         */
        const searchTerm = inputSearch.value.trim().toLowerCase();
        const filtered = filteredQuestions.filter(
          (question) =>
            question.question.toLowerCase().includes(searchTerm) ||
            question.answer.toLowerCase().includes(searchTerm) ||
            question.category.toLowerCase().includes(searchTerm) ||
            question.language.toLowerCase().includes(searchTerm)
        );

        renderQuestions(filtered);
      });

      renderQuestions(questions);
    } catch (error) {
      // Tangkap error jika gagal mengambil data di API
      console.error("Ada error nih : ", {
        error,
      });
    }
  }

  handleAllQuestion();

  function renderQuestions(questions) {
    quizContent.innerHTML = "";

    questions.forEach((question) => {
      // Kita buat element pembungkus quiz nya
      const containerQuiz = generateElement({
        tag: "div",
        id: `quiz-${question?.id}`,
        className: "quiz-item",
      });

      // Kita buat element pembungkus section kiri
      const sectionLeftQuiz = generateElement({
        tag: "div",
        className: "section-left",
      });

      // Buat element h4 untuk menampilkan pertanyaan
      const questionElement = generateElement({
        tag: "h4",
        id: "quiz-question",
        value: question.question,
      });

      // Buat element p untuk menampilkan jawaban
      const answerElement = generateElement({
        tag: "p",
        id: "quiz-answer",
        value: question.answer,
      });

      // Kita buat juga element untuk quiz category nya
      const categoryElement = generateElement({
        tag: "p",
        id: "quiz-category",
        value: question.category,
      });

      // Sekarang kita masukan element h4 dan p ke dalam section kiri
      sectionLeftQuiz.append(...[questionElement, answerElement]);

      // Dan kita buat element pembungkus section kanan
      const sectionRightQuiz = generateElement({
        tag: "div",
        className: "section-right",
      });

      // Buat element button untuk edit
      const buttonEdit = generateElement({
        tag: "button",
        id: "button-edit",
        className: "btn btn-edit",
        elementHTML: Icon.update,
      });

      buttonEdit.addEventListener("click", async (e) => {
        e.preventDefault();

        handleShowQuestionById(question.id);
      });

      // Buat element button untuk delete
      const buttonDelete = generateElement({
        tag: "button",
        id: "button-delete",
        className: "btn btn-delete",
        elementHTML: Icon.delete,
      });

      // Ketika tombol delete di klik maka akan menjalankan fungsi handleDeleteQuestion
      buttonDelete.addEventListener("click", async (e) => {
        e.preventDefault();

        handleDeleteQuestion(question.id);
      });

      // Sekarang kita masukan element button edit dan delete ke dalam section kanan
      sectionRightQuiz.append(...[buttonEdit, buttonDelete]);

      // Terakhir kita masukan semua element ke dalam container quiz
      containerQuiz.append(
        ...[sectionLeftQuiz, categoryElement, sectionRightQuiz]
      );

      quizContent.appendChild(containerQuiz);
    });
  }

  // Fungsi ketika tombol submit di klik maka akan mengirim data ke API untuk ditambahkan
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
      question: inputQuestion?.value || "",
      category: inputCategory?.value || "",
      language: inputLanguage?.value || "",
      answer: inputAnswer?.value || "",
    };

    if (inputId.value === "") {
      handleAddQuestion(payload);
    } else {
      handleUpdateQuestionById(inputId.value, payload);
    }
  });
});
