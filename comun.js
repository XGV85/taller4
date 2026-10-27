// Funciones comunes. Las respuestas viajan por ntfy.sh (servicio público, sin cuentas):
// cada dinámica usa su propio canal y cada respuesta es un mensaje JSON anónimo.

const NTFY = "https://ntfy.sh/";

// ?canal=ensayo en la dirección separa las pruebas del canal de la sesión real.
const ENSAYO = (new URLSearchParams(location.search).get("canal") || "").replace(/[^a-z0-9]/gi, "").slice(0, 20);

function canal(din) { return T4.canal + "-" + din + (ENSAYO ? "-" + ENSAYO : ""); }

// Identificador anónimo por dispositivo: permite corregir una respuesta sin duplicarla.
function idDispositivo() {
  let u = localStorage.getItem("t4-uid");
  if (!u) {
    u = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    localStorage.setItem("t4-uid", u);
  }
  return u;
}

async function enviar(din, datos) {
  const cuerpo = JSON.stringify(Object.assign({ u: idDispositivo() }, datos));
  for (let intento = 0; intento < 3; intento++) {
    try {
      const r = await fetch(NTFY + canal(din), { method: "POST", body: cuerpo });
      if (r.ok) return true;
    } catch (e) { /* se reintenta */ }
    await new Promise(ok => setTimeout(ok, 1200 * (intento + 1)));
  }
  return false;
}

// Proyección: escucha el canal en vivo. Ignora lo anterior al último «Reiniciar».
function escuchar(din, alRecibir, alEstado) {
  const vistos = new Set();
  const desde = () => localStorage.getItem("t4-desde-" + din) || "all";
  let fuente;
  function abrir() {
    if (fuente) fuente.close();
    fuente = new EventSource(NTFY + canal(din) + "/sse?since=" + desde());
    fuente.onopen = () => alEstado && alEstado(true);
    fuente.onerror = () => alEstado && alEstado(false);
    fuente.onmessage = ev => {
      let m;
      try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (m.event !== "message" || vistos.has(m.id)) return;
      vistos.add(m.id);
      let d;
      try { d = JSON.parse(m.message); } catch (e) { return; }
      if (d && typeof d === "object") alRecibir(d, m);
    };
  }
  abrir();
  return {
    reiniciar() {
      localStorage.setItem("t4-desde-" + din, String(Math.floor(Date.now() / 1000)));
      vistos.clear();
      abrir();
    }
  };
}

function normalizar(s) {
  return String(s || "").trim().toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ ]/g, "").replace(/\s+/g, " ");
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Barras horizontales: [{t, n}] → HTML
function barras(items, total) {
  return items.map(it => {
    const p = total ? Math.round(100 * it.n / total) : 0;
    return `<div class="barra${it.ok ? " ok" : ""}">
      <div class="barra-et"><span>${esc(it.t)}</span><b>${it.n}</b></div>
      <div class="barra-fondo"><div class="barra-relleno" style="width:${p}%"></div></div>
    </div>`;
  }).join("");
}

// Nube de palabras: agrupa por forma normalizada y muestra la forma más usada.
function nube(textos) {
  const g = new Map();
  for (const t of textos) {
    const k = normalizar(t);
    if (!k) continue;
    if (!g.has(k)) g.set(k, { n: 0, formas: new Map() });
    const e = g.get(k);
    e.n++;
    const f = String(t).trim();
    e.formas.set(f, (e.formas.get(f) || 0) + 1);
  }
  const lista = [...g.values()].map(e => ({
    n: e.n, t: [...e.formas.entries()].sort((a, b) => b[1] - a[1])[0][0]
  })).sort((a, b) => b.n - a.n).slice(0, 60);
  if (!lista.length) return '<p class="vacio">Esperando respuestas…</p>';
  const max = lista[0].n;
  // Orden alterno para que las grandes queden al centro.
  const orden = [];
  lista.forEach((e, i) => (i % 2 ? orden.push(e) : orden.unshift(e)));
  return orden.map((e, i) => {
    const tam = 1 + 2.2 * (e.n / max);
    return `<span class="palabra c${i % 3}" style="font-size:${tam.toFixed(2)}em" title="${e.n}">${esc(e.t)}</span>`;
  }).join(" ");
}
