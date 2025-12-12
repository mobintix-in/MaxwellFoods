async function loadComponent(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return;
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (e) {
    console.warn("Failed to load", path, e);
  }
}
loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");
