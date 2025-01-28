export function loadContent(data) {
  const titleElement = document.getElementById('content-title');
  titleElement.textContent = data.title;

  const descriptionElement = document.getElementById('content-description');
  descriptionElement.textContent = data.description;
}