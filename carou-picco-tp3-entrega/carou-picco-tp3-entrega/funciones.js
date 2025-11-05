// funciones.js — galería con zoom interno (no abre nueva pestaña)

function accion() {
  return;
}

window.addEventListener('DOMContentLoaded', function() {
  const miniaturas = document.querySelectorAll('.miniatura');
  const modal = document.getElementById('imagen_grande');
  const imgMostrar = document.getElementById('img_mostrar');
  const descripcion = document.getElementById('descripcion');
  const cerrar = document.getElementById('cerrar');

  if (!modal) return;

  miniaturas.forEach(mini => {
    mini.addEventListener('click', e => {
      e.preventDefault();
      const src = mini.dataset.src;
      const desc = mini.dataset.desc;
      imgMostrar.src = src;
      descripcion.textContent = desc;
      modal.classList.add('mostrar');
    });
  });

  cerrar.addEventListener('click', () => {
    modal.classList.remove('mostrar');
    imgMostrar.src = "";
    descripcion.textContent = "";
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('mostrar');
      imgMostrar.src = "";
      descripcion.textContent = "";
    }
  });
});

