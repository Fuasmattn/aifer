// Quiz + recall-card component logic. Pair with quiz.css.
//
// Markup contract for a multiple-choice question:
//
// <div class="quiz-question">
//   <p class="quiz-prompt">...</p>
//   <div class="quiz-options">
//     <button class="quiz-option" data-correct="false">...</button>
//     <button class="quiz-option" data-correct="true">...</button>
//   </div>
//   <div class="quiz-feedback">
//     <span class="verdict"></span>
//     <p class="explain">...</p>
//   </div>
// </div>
//
// Markup contract for a recall card (click to flip):
//
// <div class="recall-card">
//   <div class="prompt">...</div>
//   <div class="hint">Click to reveal</div>
//   <div class="answer">...</div>
// </div>
//
// Markup contract for a teach-back exercise (Feynman technique — write a free
// explanation, then reveal a checklist to self-assess against; not auto-graded):
//
// <div class="teach-back">
//   <p class="teach-prompt">...</p>
//   <textarea class="teach-input" rows="4" placeholder="..."></textarea>
//   <button class="teach-reveal">Reveal what a strong answer covers</button>
//   <div class="teach-checklist">
//     <p class="checklist-label">A strong answer hits:</p>
//     <ul><li>...</li></ul>
//   </div>
// </div>

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz-question").forEach((q) => {
    const options = q.querySelectorAll(".quiz-option");
    const feedback = q.querySelector(".quiz-feedback");
    const verdict = feedback ? feedback.querySelector(".verdict") : null;

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        if (opt.disabled) return;
        const isCorrect = opt.dataset.correct === "true";

        options.forEach((o) => {
          o.disabled = true;
          if (o.dataset.correct === "true") o.classList.add("correct");
        });
        if (!isCorrect) opt.classList.add("incorrect");

        if (feedback) {
          feedback.classList.add("show");
          if (verdict) {
            verdict.textContent = isCorrect ? "Correct." : "Not quite.";
            verdict.style.color = isCorrect ? "var(--good)" : "var(--bad)";
            verdict.style.fontWeight = "600";
          }
        }
      });
    });
  });

  document.querySelectorAll(".recall-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("revealed");
    });
  });

  document.querySelectorAll(".teach-back").forEach((box) => {
    const button = box.querySelector(".teach-reveal");
    const checklist = box.querySelector(".teach-checklist");
    if (!button || !checklist) return;

    button.addEventListener("click", () => {
      const revealed = box.classList.toggle("revealed");
      button.textContent = revealed ? "Hide checklist" : "Reveal what a strong answer covers";
    });
  });
});
