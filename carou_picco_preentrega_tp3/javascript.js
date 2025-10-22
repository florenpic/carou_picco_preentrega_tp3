// ====== NAV: activar estado y navegación suave ======
document.querySelectorAll('.navlink').forEach(a => {
  a.addEventListener('click', (e)=>{
    document.querySelectorAll('.navlink').forEach(x=>x.classList.remove('active'));
    e.currentTarget.classList.add('active');
    // navegación suave
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// ====== Galería: cargar imágenes estáticas + subir por input ======
const gallery = document.getElementById('gallery');
const input = document.getElementById('image-input');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.getElementById('lb-close');

// Lista de imágenes estáticas (coloca tus .jpg en assets/images/ y agrégalos aquí)
const staticImages = [
  'assets/images/gal1.jpg',
  'assets/images/gal2.jpg',
  'assets/images/gal3.jpg'
];

function createThumb(src, alt="Imagen galería"){
  const div = document.createElement('div'); div.className='gallery-item';
  const img = document.createElement('img'); img.src = src; img.alt = alt;
  img.loading = 'lazy';
  div.appendChild(img);
  div.addEventListener('click', ()=>openLightbox(src, alt));
  gallery.appendChild(div);
}

// Renderizamos imágenes estáticas si existen
staticImages.forEach(s => createThumb(s));

// Subir imágenes desde el cliente (solo se muestran en el navegador actual)
input.addEventListener('change', (e)=>{
  const files = Array.from(e.target.files);
  files.forEach(file => {
    if(!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ()=> createThumb(reader.result, file.name);
    reader.readAsDataURL(file);
  });
  // Limpia el input para permitir subir las mismas imágenes otra vez
  input.value = '';
});

document.getElementById('btn-clear').addEventListener('click', ()=>{ gallery.innerHTML=''; });

function openLightbox(src, alt){
  lbImg.src = src; lbImg.alt = alt;
  lightbox.style.display = 'flex';
  lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){ lightbox.style.display='none'; lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; }
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });

// ====== Contacto: mailto y guardado local ======
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  // Abrir mail client
  const subject = encodeURIComponent('Contacto desde Portfolio — ' + name);
  const body = encodeURIComponent(message + '\n\n--\n' + name + ' | ' + email);
  const mailto = `mailto:grupo@ejemplo.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
});

// Guardar contacto localmente (ejemplo para que el usuario pueda agregar info)
document.getElementById('save-contact').addEventListener('click', ()=>{
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  localStorage.setItem('contactDraft', JSON.stringify(data));
  alert('Contacto guardado localmente (localStorage).');
});

// Restaurar si existe
window.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('contactDraft');
  if(saved){
    try{ const d = JSON.parse(saved);
      document.getElementById('name').value = d.name || '';
      document.getElementById('email').value = d.email || '';
      document.getElementById('message').value = d.message || '';
    }catch(e){/* ignore */}
  }

  // Año footer
  document.getElementById('anio').textContent = new Date().getFullYear();
});

// A11Y: cerrar lightbox con ESC
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });