---
title: "BitQuiz: Practice Number Systems"
layout: layout.html
date: 2025-07-27
tags: post
---

<p>
  This quiz helps you practice conversions between <strong>binary</strong>, <strong>decimal</strong>, and <strong>hexadecimal</strong>.  
  Choose the correct answer by clicking or using your keyboard.
</p>
<p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 1rem;">
  ↑ ↓ or j/k to move · Enter/Space to select · Q to restart
</p>

<!-- Checkbox filter to select which types of conversions to practice -->
<div id="filter" style="margin-bottom: 1rem; border: 1px solid #333; padding: 0.75rem; border-radius: var(--radius);">
  <strong>Choose which conversion types to practice:</strong><br/>
  <label style="margin-right: 1rem;"><input type="checkbox" value="BIN_TO_DEC" checked> Binary → Decimal</label>
  <label style="margin-right: 1rem;"><input type="checkbox" value="DEC_TO_BIN" checked> Decimal → Binary</label>
  <label style="margin-right: 1rem;"><input type="checkbox" value="HEX_TO_DEC" checked> Hexadecimal → Decimal</label>
  <label style="margin-right: 1rem;"><input type="checkbox" value="DEC_TO_HEX" checked> Decimal → Hexadecimal</label>
  <label style="margin-right: 1rem;"><input type="checkbox" value="BIN_TO_HEX" checked> Binary → Hexadecimal</label>
  <label><input type="checkbox" value="HEX_TO_BIN" checked> Hexadecimal → Binary</label>
</div>

<div id="app" style="border: 1px solid #333; padding: 1rem; border-radius: var(--radius); margin-top: 1rem;">
  <h2 style="margin: 0 0 1rem; color: var(--accent); font-size: 1.2rem;">BitQuiz</h2>
  <div id="question" style="margin-bottom: 1rem; font-weight: 500;"></div>
  <div id="options" style="display: grid; gap: 0.5rem; margin-bottom: 0.5rem;"></div>
  <div id="feedback" style="height: 1.5rem; font-weight: 500;"></div>
</div>

<script>
  const allTemplates = [
    { type: "BIN_TO_DEC", text: "Convert %s to decimal." },
    { type: "DEC_TO_BIN", text: "Convert %d to binary." },
    { type: "HEX_TO_DEC", text: "Convert %X to decimal." },
    { type: "DEC_TO_HEX", text: "Convert %d to hexadecimal." },
    { type: "BIN_TO_HEX", text: "Convert %s to hexadecimal." },
    { type: "HEX_TO_BIN", text: "Convert %X to binary." }
  ];

  const MAX_OPTS = 4;
  const intToBin = n => n.toString(2).padStart(8, '0');
  const intToHex = n => n.toString(16).toUpperCase();

  // Variables para control de estado
  let templates = [...allTemplates];  // plantillas activas para preguntas
  let currentQ, selected = 0, answered = false, failed = [false, false, false, false];

  // Actualiza la lista de plantillas activas según checkboxes
  function updateTemplates() {
    const checkedBoxes = Array.from(document.querySelectorAll('#filter input[type=checkbox]:checked'));
    const checkedValues = checkedBoxes.map(cb => cb.value);
    templates = allTemplates.filter(t => checkedValues.includes(t.type));
    if (templates.length === 0) {
      // Evitar lista vacía: si no hay nada seleccionado, activar todas para no romper
      templates = [...allTemplates];
      // Reactiva todos los checkbox
      document.querySelectorAll('#filter input[type=checkbox]').forEach(cb => cb.checked = true);
      alert("Please select at least one conversion type!");
    }
    renderQuestion();
  }

  // Conecta evento onchange a checkboxes
  document.querySelectorAll('#filter input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', updateTemplates);
  });

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
      if (i === correctIndex) options.push(answer);
      else {
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
      btn.style = `
        padding: 0.4rem 0.6rem;
        font-family: monospace;
        font-size: 1rem;
        text-align: left;
        border: 1px solid ${failed[idx] ? "#a33" : (selected === idx ? "var(--accent)" : "#444")};
        border-radius: var(--radius);
        background: ${failed[idx] ? "#501010" : (selected === idx ? "#1a1a1a" : "transparent")};
        color: ${failed[idx] ? "#faa" : "inherit"};
        cursor: pointer;
      `;
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
      document.getElementById("feedback").style.color = "var(--accent)";
      setTimeout(renderQuestion, 800);
    } else {
      failed[idx] = true;
      document.getElementById("feedback").textContent = "Incorrect. Try again.";
      document.getElementById("feedback").style.color = "#f88";
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

  // Inicializa la primera pregunta
  renderQuestion();
</script>

