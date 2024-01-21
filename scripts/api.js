/** ** 13 Januari 2024 **
 * File: api.js
 *
 * Di file ini kita menaruh semua fungsi yang berhubungan dengan API
 * baik itu untuk mengambil data dari API atau mengirim data ke API
 * bahkan untuk update data dan delete data ke API
 */

const BASE_URL = "http://188.166.181.154";

export async function getQuestionById({ id = 10 }) {
  try {
    const response = await fetch(`${BASE_URL}/api/quiz/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    console.log({ result });
    return result?.data;

  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function getQuestions() {
  try {
    const response = await fetch(`${BASE_URL}/api/quiz`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function createQuestion({ payload }) {
  try {
    const response = await fetch(`${BASE_URL}/api/quiz`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}
