// Marco común de las pantallas de proyección: encabezado, QR, controles y conexión.
// marco("inicio", "¿Quiénes estamos hoy?", alRecibir, extrasPie) → { contador(n), oyente }

function marco(din, titulo, alRecibir, extrasPie) {
  const url = T4.base + din + "/";
  const corta = url.replace(/^https:\/\//, "");
  document.body.className = "proy";
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="proy-top">
      <img class="logos" src="../img/logos.png" alt="Secretaría de las Mujeres · Centro LIBRE · Instituto Hidalguense de las Mujeres">
      <h1>${esc(titulo)}</h1>
      <div class="meta"><b id="cuenta">0</b>participantes</div>
      <img class="qr-mini" id="qr-mini" src="../img/qr-${din}.png" alt="QR para participar" title="Clic para ampliar el QR">
    </div>`);
  document.body.insertAdjacentHTML("beforeend", `
    <div class="proy-pie">
      <span><span class="estado" id="estado"></span><span id="estado-t">Conectando…</span></span>
      <span>· Participe en <b>${esc(corta)}</b></span>
      <span class="espacio"></span>
      ${extrasPie || ""}
      <button class="ctrl" id="b-qr" title="Tecla Q">Mostrar QR</button>
      <button class="ctrl" id="b-pc" title="Tecla F">Pantalla completa</button>
      <button class="ctrl" id="b-rei">Reiniciar respuestas</button>
    </div>
    <div class="capa-qr" id="capa-qr">
      <img src="../img/qr-${din}.png" alt="Código QR para participar">
      <div class="txt">
        <p>Escanee el código con la cámara de su celular o entre a:</p>
        <p class="url">${esc(corta)}</p>
        <p class="peq">Respuestas anónimas.</p>
        <button class="btn-ver" id="b-ver-res">Ver resultados en vivo ▶</button>
      </div>
    </div>`);

  const capa = document.getElementById("capa-qr");
  const bqr = document.getElementById("b-qr");
  const alternarQR = () => {
    capa.classList.toggle("oculto");
    bqr.textContent = capa.classList.contains("oculto") ? "Mostrar QR" : "Ver resultados";
  };
  capa.onclick = alternarQR;
  bqr.onclick = alternarQR;
  bqr.textContent = "Ver resultados";
  document.getElementById("qr-mini").onclick = alternarQR;
  const pc = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  document.getElementById("b-pc").onclick = pc;
  document.addEventListener("keydown", e => {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "q" || e.key === "Q") alternarQR();
    if (e.key === "f" || e.key === "F") pc();
  });

  const oyente = escuchar(din, alRecibir, on => {
    document.getElementById("estado").classList.toggle("on", on);
    document.getElementById("estado-t").textContent = on ? "En vivo" : "Reconectando…";
  });
  document.getElementById("b-rei").onclick = () => {
    if (confirm("¿Borrar de esta pantalla las respuestas recibidas hasta ahora y empezar de cero?")) {
      oyente.reiniciar();
      location.reload();
    }
  };
  return {
    contador(n) { document.getElementById("cuenta").textContent = n; },
    oyente
  };
}
