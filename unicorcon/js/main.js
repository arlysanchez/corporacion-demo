document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const contactForm = document.getElementById("contactForm");

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Abrir menú");
    });
  });

  // Subtle header shadow after scrolling
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Reveal sections
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));

  // Quote form -> WhatsApp
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const nombre = data.get("nombre")?.trim() || "";
    const servicio = data.get("servicio")?.trim() || "";
    const mensaje = data.get("mensaje")?.trim() || "";

    const text = [
      "Hola UNICORCON PERÚ, quiero solicitar una cotización.",
      "",
      `Nombre / empresa: ${nombre}`,
      `Servicio: ${servicio}`,
      `Proyecto: ${mensaje || "Pendiente de especificar"}`
    ].join("\n");

    const url = `https://wa.me/51994880367?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  });
});
