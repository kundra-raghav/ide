const languageSelect = document.getElementById('language');
const codeInput = document.getElementById('code');
const inputField = document.getElementById('input');
const runButton = document.getElementById('run-btn');
const outputContainer = document.getElementById('output');

const apiRoutes = {
  cpp: 'http://localhost:5000/api/products/cpp',
  java: 'http://localhost:5000/api/products/runJava',
  c: 'http://localhost:5000/api/products/runC',
  python: 'http://localhost:5000/api/products/runPy',
  js: 'http://localhost:5000/api/products/runJS',
};

runButton.addEventListener('click', async () => {
  const language = languageSelect.value;
  const code = codeInput.value;
  const input = inputField.value.split(' ');
  const apiRoute = apiRoutes[language];

  try {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [language === 'cpp' ? 'cppCode' : `${language}Code`]: code,
        Id: 1, // Replace with the appropriate ID from your database
        Inputs: [input],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      outputContainer.textContent = data.message;
    } else {
      outputContainer.textContent = data.error || 'An error occurred';
    }
  } catch (error) {
    outputContainer.textContent = error.message;
  }
});