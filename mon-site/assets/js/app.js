// Compte à rebours jusqu'au 15/09/2025 00:00 heure de Paris (CEST).
// On fige l'offset +02:00 (Paris en septembre) pour éviter les surprises multi-fuseaux.
const targetISO = document.getElementById('countdown').dataset.target;
const target = new Date(targetISO); // 2025-09-15T00:00:00+02:00

const dd = document.getElementById('dd');
const hh = document.getElementById('hh');
const mm = document.getElementById('mm');
const ss = document.getElementById('ss');

function pad(n){ return String(n).padStart(2,'0'); }
function setFlip(el, val){
  if(el.textContent !== val){
    el.textContent = val;
    el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
  }
}

function update(){
  const now = new Date();
  let diff = target.getTime() - now.getTime();

  if (diff <= 0){
    setFlip(dd, "00"); setFlip(hh, "00"); setFlip(mm, "00"); setFlip(ss, "00");
    const hint = document.querySelector(".hint");
    if (hint) hint.textContent = "🎉 C'est le grand jour !";
    clearInterval(timer); return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  setFlip(dd, String(days).padStart(2,"0"));
  setFlip(hh, pad(hours)); setFlip(mm, pad(mins)); setFlip(ss, pad(secs));
}

update();
const timer = setInterval(update, 1000);
