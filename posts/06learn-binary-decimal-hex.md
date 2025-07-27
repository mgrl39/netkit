---
title: "Learn binary, decimal y hexadecimal"
layout: layout.html
date: 2025-07-27
tags: post
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>BitQuiz</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white min-h-screen flex items-center justify-center">
  <div class="p-5 max-w-md w-full text-center border border-gray-200 rounded-lg shadow-sm" id="app">
    <h1 class="text-xl font-semibold mb-3">BitQuiz</h1>
    <p id="question" class="mb-4 font-medium"></p>
    <div id="options" class="grid gap-2 mb-3"></div>
    <div id="feedback" class="h-6 text-sm mb-2 font-medium"></div>
    <p class="text-xs text-gray-400">Use ↑ ↓ or j/k to move, Enter/Space to select, Q to restart.</p>
  </div>

  <script>
    const templates = [
      { type: "BIN_TO_DEC", text: "Convert %s to decimal." },
      { type: "DEC_TO_BIN", text: "Convert %d to binary." },
      { type: "HEX_TO_DEC", text: "Convert %X to decimal." },
      { type: "DEC_TO_HEX", text: "Convert %d to hexadecimal." },
      { type: "BIN_TO_HEX", text: "Convert %s to hexadecimal." },
      { type: "HEX_TO_BIN", text: "Convert %X to binary." }
    ];

    const MAX_OPTS = 4;
    const intToBin = (n) => n.toString(2).padStart(8, '0');
    const intToHex = (n) => n.toString(16).toUpperCase();

    function makeQuestion() {
      const t = templates[Math.floor(Math.random() * templates.length)];
      const num = Math.floor(Math.random() * 256);
      const bin = intToBin(num), hex = intToHex(num);
      let questionText = "", answer = "";
      switch (t.type) {
        case "BIN_TO_DEC": questionText = t.text.replace('%s', bin); answer = num.toString(); break;
        case "DEC_TO_BIN": questionText = t.text.replace('%d', num); answer = bin; break;
        case "HEX_TO_DEC": questionText = t.text.replace('%X', hex); answer = num.toString(); break;
        case "DEC_TO_HEX": questionText = t.text.replace('%d', num); answer = hex; break;
        case "BIN_TO_HEX": questionText = t.text.replace('%s', bin); answer = hex; break;
        case "HEX_TO_BIN": questionText = t.text.replace('%X', hex); answer = bin; break;
      }

      const correctIndex = Math.floor(Math.random() * MAX_OPTS);
      const options = [];
      for (let i = 0; i < MAX_OPTS; ++i) {
        if (i === correctIndex) {
          options.push(answer);
        } else {
          let d; do { d = Math.floor(Math.random() * 256); } while (d === num);
          switch (t.type) {
            case "BIN_TO_DEC":
            case "HEX_TO_DEC":
              options.push(d.toString()); break;
            case "DEC_TO_BIN":
            case "HEX_TO_BIN":
              options.push(intToBin(d)); break;
            case "DEC_TO_HEX":
            case "BIN_TO_HEX":
              options.push(intToHex(d)); break;
          }
        }
      }

      return { question: questionText, options, correctIndex, answer };
    }

    let currentQ, selected = 0, answered = false, failed = [false, false, false, false];

    function renderQuestion() {
      answered = false;
      failed = [false, false, false, false];
      document.getElementById("feedback").textContent = "";
      currentQ = makeQuestion();
      selected = 0;
      document.getElementById("question").textContent = currentQ.question;
      renderOptions();
      focusSelected();
    }

    function renderOptions() {
      const optionsDiv = document.getElementById("options");
      optionsDiv.innerHTML = "";
      currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className =
          "px-3 py-2 rounded border w-full text-sm text-left font-mono " +
          (selected === idx ? "border-gray-500 bg-gray-100 " : "border-gray-300 ") +
          (failed[idx] ? "bg-red-100 text-red-700 border-red-400" : "");
        btn.disabled = answered || failed[idx];
        btn.onclick = () => handleSelect(idx);
        btn.onfocus = () => setSelected(idx);
        optionsDiv.appendChild(btn);
      });
    }

    function setSelected(idx) {
      selected = idx;
      renderOptions();
    }

    function focusSelected() {
      const opts = document.getElementById("options").children;
      if (opts[selected]) opts[selected].focus();
    }

    function handleSelect(idx) {
      if (answered || failed[idx]) return;
      setSelected(idx);
      if (idx === currentQ.correctIndex) {
        answered = true;
        document.getElementById("feedback").textContent = "Correct!";
        document.getElementById("feedback").className = "h-6 text-green-600 font-medium";
        setTimeout(renderQuestion, 800);
      } else {
        failed[idx] = true;
        document.getElementById("feedback").textContent = "Incorrect. Try another.";
        document.getElementById("feedback").className = "h-6 text-red-600 font-medium";
        renderOptions();
        let next = selected;
        do { next = (next + 1) % MAX_OPTS; } while (failed[next]);
        setSelected(next);
        focusSelected();
      }
    }

    document.addEventListener("keydown", function (e) {
      if (answered) return;
      if (e.key === 'ArrowUp' || e.key === 'k') {
        let prev = selected;
        do { prev = (prev - 1 + MAX_OPTS) % MAX_OPTS; } while (failed[prev]);
        setSelected(prev); focusSelected();
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        let next = selected;
        do { next = (next + 1) % MAX_OPTS; } while (failed[next]);
        setSelected(next); focusSelected();
      } else if (e.key === 'Enter' || e.key === ' ') {
        handleSelect(selected);
      } else if (e.key === 'q' || e.key === 'Q') {
        window.location.reload();
      }
    });

    renderQuestion();
  </script>
</body>
</html>

