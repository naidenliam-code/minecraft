export function makeUI(BLOCKS, inv, state) {
  const root = document.getElementById("ui");

  root.innerHTML = `
    <div id="crosshair"></div>
    <div id="overlay">
      <div class="box">
        <h1 style="margin:0 0 10px">MiniCraft</h1>
        <p style="margin:0 0 12px;line-height:1.35">
          Clique pour jouer (capture souris).<br>
          <b>WASD</b> bouger · <b>Souris</b> regarder · <b>Espace</b> sauter · <b>Shift</b> courir<br>
          <b>1–7</b> blocs · <b>Clic gauche</b> casser (drop) · <b>Clic droit</b> poser (consomme)
        </p>
        <button id="btnStart">Jouer</button><br>
        <small>(Optimisé Chromebook : surface only + render distance faible)</small>
      </div>
    </div>
    <div id="hotbar"></div>
    <div id="toast"></div>
    <div id="hint">
      Bloc : <span id="blockName"></span> · Temps: <span id="tod">Jour</span> ·
      Chunk: <span id="chunkInfo">0,0</span> · Biome: <span id="biomeInfo">Plaine</span>
    </div>
  `;

  const overlay = document.getElementById("overlay");
  const btnStart = document.getElementById("btnStart");
  const hotbar = document.getElementById("hotbar");
  const toastEl = document.getElementById("toast");

  const blockNameEl = document.getElementById("blockName");
  const todEl = document.getElementById("tod");
  const chunkInfoEl = document.getElementById("chunkInfo");
  const biomeInfoEl = document.getElementById("biomeInfo");

  function toast(msg){
    toastEl.textContent = msg;
    toastEl.style.opacity = "1";
    clearTimeout(toast._t);
    toast._t = setTimeout(()=>toastEl.style.opacity="0", 850);
  }

  function renderHotbar(){
    hotbar.innerHTML = "";
    BLOCKS.forEach((b,i)=>{
      const slot = document.createElement("div");
      slot.className = "slot" + (i===state.selectedBlock ? " selected" : "");

      const chip = document.createElement("div");
      chip.className = "chip";
      chip.style.background = "#" + b.color.toString(16).padStart(6,"0");

      const badge = document.createElement("div");
      badge.className = "badge" + (inv[i]===0 ? " empty" : "");
      badge.textContent = inv[i];

      slot.appendChild(chip);
      slot.appendChild(badge);
      hotbar.appendChild(slot);
    });
    blockNameEl.textContent = BLOCKS[state.selectedBlock].name;
  }

  function updateCounts(){
    const slots = hotbar.querySelectorAll(".slot");
    slots.forEach((slot,i)=>{
      const badge = slot.querySelector(".badge");
      badge.textContent = inv[i];
      badge.classList.toggle("empty", inv[i]===0);
      slot.classList.toggle("selected", i===state.selectedBlock);
    });
    blockNameEl.textContent = BLOCKS[state.selectedBlock].name;
  }

  function setOverlay(visible){
    overlay.style.display = visible ? "grid" : "none";
  }

  return {
    btnStart,
    toast,
    renderHotbar,
    updateCounts,
    setOverlay,
    todEl,
    chunkInfoEl,
    biomeInfoEl
  };
}
