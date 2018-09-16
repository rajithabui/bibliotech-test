import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import('./book-info.js');

class BooksList extends PolymerElement {
  static get template() {
    return html`
        <book-info isbn="pg1017"></book-info>
    `;
  }
}

window.customElements.define('books-list', BooksList);
