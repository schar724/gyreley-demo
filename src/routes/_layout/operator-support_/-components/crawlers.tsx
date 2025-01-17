import * as DOM from "react-dom/server";
import { PFManual } from "../../help_/pfmanual";

function getEl(tagName: string) {
  const staticMarkup = DOM.renderToStaticMarkup(<PFManual />);

  const parser = new DOMParser();
  const doc = parser.parseFromString(staticMarkup, "text/html");
  const el = doc.querySelector(tagName);

  return el;
}

export function crawlDesc(tagName: string) {
  const el = getEl(tagName);

  if (!el) {
    return;
  }

  const titleText = el.querySelector("#title")?.textContent;
  const descText = el.querySelector("#desc")?.textContent;
  const imgSrc = el.querySelector("img")?.src;

  // Create the new container div
  const containerDiv = document.createElement("div");
  containerDiv.id = "desc-container";

  // Create and append the title (with strong tag)
  const title = document.createElement("strong");
  title.textContent = titleText || null;
  title.style.marginBottom = "10px";
  containerDiv.appendChild(title);

  // Create and append the description
  const desc = document.createElement("p");
  desc.textContent = descText || null;
  desc.style.fontSize = "1rem";
  desc.style.marginBottom = "15px";
  containerDiv.appendChild(desc);

  if (imgSrc) {
    // Create and append the image
    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.maxWidth = "100%"; // Prevent the image from exceeding the container's width
    img.style.height = "auto"; // Maintain aspect ratio
    img.style.padding = "5px";
    containerDiv.appendChild(img);
  }
  return { el: containerDiv.innerHTML };
}

export function crawlSetup(tagName: string) {
  const element = getEl(tagName);

  const title = element?.querySelector("h3")?.textContent;
  const instructions = element?.querySelector("#instructions")?.innerHTML;
  return { title, instructions };
}
