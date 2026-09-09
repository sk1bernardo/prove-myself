/**
 * ==============================================================================
 * 🌸 LOVE OS - LÓGICA E INTERATIVIDADE DO SISTEMA
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  initCanvasHearts();
  initLiveTimer();
  initTestRunner();
  initReasonsGenerator();
  initVouchers();
  initEasterEgg();
});

/* ------------------------------------------------------------------------------
 * 1. Inicialização e Preenchimento Dinâmico com base no CONFIG
 * ------------------------------------------------------------------------------ */
function initApp() {
  if (typeof CONFIG === "undefined") {
    console.error("Arquivo config.js não foi encontrado!");
    return;
  }

  // Título e Textos Principais
  document.title = CONFIG.tituloPagina || "LoveOS";
  const badgeText = document.getElementById("badge-text");
  if (badgeText) badgeText.textContent = `${CONFIG.seuNome} & ${CONFIG.nomeDela}`;

  const heroSubtitle = document.getElementById("hero-subtitle-text");
  if (heroSubtitle) heroSubtitle.textContent = CONFIG.subtituloHero;

  // Estatísticas Técnicas
  if (CONFIG.stats) {
    if (document.getElementById("stat-version")) document.getElementById("stat-version").textContent = CONFIG.stats.versaoOS;
    if (document.getElementById("stat-uptime")) document.getElementById("stat-uptime").textContent = CONFIG.stats.uptimeSLA;
    if (document.getElementById("stat-rate")) document.getElementById("stat-rate").textContent = CONFIG.stats.taxaCarinho;
    if (document.getElementById("stat-bugs")) document.getElementById("stat-bugs").textContent = CONFIG.stats.bugsDetectados;
  }

  // Linha do Tempo
  renderTimeline();

  // Rodapé
  const footerCredit = document.getElementById("footer-credit");
  if (footerCredit) {
    footerCredit.textContent = `Feito com todo o coração por ${CONFIG.seuNome} especialmente para ${CONFIG.nomeDela}.`;
  }
}

/* ------------------------------------------------------------------------------
 * 2. Contador de Tempo Exato em Tempo Real
 * ------------------------------------------------------------------------------ */
function initLiveTimer() {
  const startDate = new Date(CONFIG.dataInicio || "2023-06-12T20:00:00");

  function updateTimer() {
    const now = new Date();
    if (now < startDate) {
      return; // Caso a data esteja no futuro
    }

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      // Pega o número de dias do mês anterior
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    const pad = (n) => String(n).padStart(2, "0");

    const elYears = document.getElementById("time-years");
    const elMonths = document.getElementById("time-months");
    const elDays = document.getElementById("time-days");
    const elHours = document.getElementById("time-hours");
    const elMinutes = document.getElementById("time-minutes");
    const elSeconds = document.getElementById("time-seconds");

    if (elYears) elYears.textContent = pad(years);
    if (elMonths) elMonths.textContent = pad(months);
    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMinutes) elMinutes.textContent = pad(minutes);
    if (elSeconds) elSeconds.textContent = pad(seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ------------------------------------------------------------------------------
 * 3. Terminal Interativo de Testes Unitários de Amor
 * ------------------------------------------------------------------------------ */
function initTestRunner() {
  const terminalBody = document.getElementById("test-terminal-output");
  const btnRunTests = document.getElementById("btn-run-tests");

  function runTests() {
    if (!terminalBody) return;
    terminalBody.innerHTML = "";

    const tests = CONFIG.testesDeAmor || [];
    let delay = 100;

    tests.forEach((test, index) => {
      setTimeout(() => {
        const testRow = document.createElement("div");
        testRow.className = "test-row";
        testRow.innerHTML = `
          <div class="test-header-line">
            <span class="test-func">✓ ${test.nome}</span>
            <span class="test-badge">${test.resultado}</span>
          </div>
          <span class="test-desc">// ${test.descricao}</span>
        `;
        terminalBody.appendChild(testRow);

        // Forçar reflow para acionar animação
        setTimeout(() => testRow.classList.add("visible"), 20);

        if (index === tests.length - 1) {
          setTimeout(() => {
            const summary = document.createElement("div");
            summary.style.marginTop = "16px";
            summary.style.color = "#4cd964";
            summary.style.fontWeight = "bold";
            summary.style.borderTop = "1px solid rgba(255, 255, 255, 0.1)";
            summary.style.paddingTop = "10px";
            summary.textContent = `🎯 5/5 TESTES PASSARAM COM SUCESSO. CONCLUSÃO: O amor é 100% verdadeiro e infinito!`;
            terminalBody.appendChild(summary);
          }, 300);
        }
      }, delay);

      delay += 320;
    });
  }

  if (btnRunTests) {
    btnRunTests.addEventListener("click", () => {
      runTests();
      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
    });
  }

  // Executa automaticamente na primeira carga
  runTests();
}

/* ------------------------------------------------------------------------------
 * 4. Central de Motivos de Amor
 * ------------------------------------------------------------------------------ */
function initReasonsGenerator() {
  const btnReason = document.getElementById("btn-reason");
  const display = document.getElementById("reason-display");

  let lastIndex = -1;

  if (btnReason && display) {
    btnReason.addEventListener("click", (e) => {
      const reasons = CONFIG.motivosDeAmor || [];
      if (reasons.length === 0) return;

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * reasons.length);
      } while (randomIndex === lastIndex && reasons.length > 1);

      lastIndex = randomIndex;
      const selectedReason = reasons[randomIndex];

      // Efeito suave de transição
      display.style.opacity = "0";
      display.style.transform = "scale(0.97)";

      setTimeout(() => {
        display.textContent = `"${selectedReason}"`;
        display.style.opacity = "1";
        display.style.transform = "scale(1)";
      }, 200);

      // Partículas saindo do botão
      const rect = btnReason.getBoundingClientRect();
      triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }
}

/* ------------------------------------------------------------------------------
 * 5. Linha do Tempo
 * ------------------------------------------------------------------------------ */
function renderTimeline() {
  const container = document.getElementById("timeline-list");
  if (!container || !CONFIG.timeline) return;

  container.innerHTML = "";

  CONFIG.timeline.forEach((item) => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-top">
          <span class="timeline-date">${item.data}</span>
          <span class="timeline-tag">${item.tag || "Marco"}</span>
        </div>
        <h3 class="timeline-title">${item.icone ? item.icone + " " : ""}${item.titulo}</h3>
        <p class="timeline-desc">${item.descricao}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

/* ------------------------------------------------------------------------------
 * 6. Cupons Virtuais Interativos
 * ------------------------------------------------------------------------------ */
function initVouchers() {
  const container = document.getElementById("vouchers-list");
  if (!container || !CONFIG.cupons) return;

  container.innerHTML = "";

  CONFIG.cupons.forEach((cupom) => {
    const card = document.createElement("div");
    card.className = "voucher-card";
    card.id = cupom.id;

    card.innerHTML = `
      <div>
        <div class="voucher-icon">${cupom.icone || "🎟️"}</div>
        <h3 class="voucher-title">${cupom.titulo}</h3>
        <p class="voucher-desc">${cupom.descricao}</p>
      </div>
      <button class="voucher-btn">Resgatar Cupom ✨</button>
    `;

    const btn = card.querySelector(".voucher-btn");
    btn.addEventListener("click", (e) => {
      if (card.classList.contains("redeemed")) return;

      card.classList.add("redeemed");
      btn.textContent = "Cupom Resgatado! 🎉";

      const rect = btn.getBoundingClientRect();
      triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });

    container.appendChild(card);
  });
}

/* ------------------------------------------------------------------------------
 * 7. Easter Egg: Carta Secreta do Desenvolvedor
 * ------------------------------------------------------------------------------ */
function initEasterEgg() {
  const heartBtn = document.getElementById("easter-egg-heart");
  const modal = document.getElementById("secret-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title-text");
  const modalBody = document.getElementById("modal-body-text");

  let clickCount = 0;
  let clickTimeout;

  function openSecretLetter() {
    if (!modal) return;
    if (CONFIG.cartaSecreta) {
      if (modalTitle) modalTitle.textContent = CONFIG.cartaSecreta.titulo;
      if (modalBody) modalBody.textContent = CONFIG.cartaSecreta.texto;
    }
    modal.classList.add("active");
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
  }

  function closeSecretLetter() {
    if (modal) modal.classList.remove("active");
  }

  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      clickCount++;
      clearTimeout(clickTimeout);

      if (clickCount >= 5) {
        clickCount = 0;
        openSecretLetter();
      } else {
        clickTimeout = setTimeout(() => {
          clickCount = 0;
        }, 2000);
      }
    });
  }

  if (modalClose) modalClose.addEventListener("click", closeSecretLetter);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeSecretLetter();
    });
  }

  // Suporte também ao clássico Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiPattern = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
  ];
  let konamiCurrent = 0;

  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === konamiPattern[konamiCurrent].toLowerCase()) {
      konamiCurrent++;
      if (konamiCurrent === konamiPattern.length) {
        konamiCurrent = 0;
        openSecretLetter();
      }
    } else {
      konamiCurrent = 0;
    }
  });
}

/* ------------------------------------------------------------------------------
 * 8. Sistema de Partículas Atmosféricas & Confetes de Corações (Canvas Standalone)
 * ------------------------------------------------------------------------------ */
let particles = [];
let confettiList = [];

function initCanvasHearts() {
  const canvas = document.getElementById("hearts-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Criar corações flutuantes sutis no fundo
  const heartCount = 18;
  for (let i = 0; i < heartCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.15,
      hue: Math.random() * 20 + 340 // tons suaves de rosa
    });
  }

  function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
    ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Renderizar corações atmosféricos de fundo
    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -30) {
        p.y = canvas.height + 20;
        p.x = Math.random() * canvas.width;
      }

      drawHeart(ctx, p.x, p.y, p.size, `hsla(${p.hue}, 80%, 75%, ${p.opacity})`);
    });

    // Renderizar partículas ativas de confete/celebração
    for (let i = confettiList.length - 1; i >= 0; i--) {
      const c = confettiList[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.rotSpeed;
      c.life -= 0.015;

      if (c.life <= 0) {
        confettiList.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation);
      ctx.globalAlpha = Math.max(0, c.life);

      if (c.isHeart) {
        drawHeart(ctx, 0, 0, c.size, c.color);
      } else {
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      }
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

// Explosão de confetes e corações ao clicar em botões interativos
function triggerConfettiBurst(originX, originY) {
  const colors = ["#ff758c", "#ff7eb3", "#fca5b9", "#fcd5ce", "#ffd166", "#38b000"];
  const burstCount = 38;

  for (let i = 0; i < burstCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 3;

    confettiList.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      gravity: 0.22,
      size: Math.random() * 10 + 6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.0,
      isHeart: Math.random() > 0.4
    });
  }
}
