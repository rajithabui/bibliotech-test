import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-ajax/iron-ajax.js';

class BookInfo extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
            padding: 20px;
            margin: auto;
            display: flex;
            justify-content: center;
        }
        .book {
            display: flex;
            flex-direction: column;
            margin: 5px;
        }

        .book-image-wrapper, 
        .book-info-wrapper {
            display: flex;
            padding: 10px 0px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .book-info-wrapper {
          height: auto;
          vertical-align: top;
          padding: 0;
          font-weight: 400;
          line-height: 1.2;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
        paper-tab {
            font-size: 32px;
        }
        .book-title {
          font-size: 2.3em;
          font-weight: 500;
          margin: 0;
        }
        
        .darker {
            font-weight: 700;
        }
        
        .meta {
            color: rgba(0, 0, 0, 0.54);
        }

        .book-authors {
          font-size: 16px;
          margin-bottom: 20px;
          width: 100%;
          color: rgba(0, 0, 0, 0.54);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .book-buy {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 10px 20px;
          margin: 0 20px;
          background: #fff;
          min-width: 300px;
          border-radius: 10px;
          border: 1px solid #eee;
        }
       
        
        .book-details {
          font-size: 14px;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .book-image {
          cursor: pointer;
          margin-bottom: 10px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        
        .item {
            list-style: none;
        }
        
        .book-info {
            display: flex;
            align-items: center;
            justify-content: start;
        }
        
        #book-details {
            text-align: left;
        }

        paper-button {
          display: flex;
          justify-content: center;
          font-size: 1rem;
          font-weight: 500;
          text-transform: none;
          margin: 0;
          cursor: pointer;
          color: white;
          background-color: rgb(136, 77, 240);
          border-radius: 6px;
          height: 45px;
          width: 100%;
          align-items: center;
        }
      </style>

      <iron-ajax
        auto
        url="data/[[isbn]]-data.json"
        handle-as="json"
        last-response="{{bookData}}">
      </iron-ajax>

      <div class="book">
       <div class>
         <h1 class="book-title">[[bookData.title]]</h1>
         <div class="book-authors">
              <span>By</span>  
              <dom-repeat items="{{bookData.contributors}}">
                <template>
                  <span>{{item}} | </span>
                </template>
              </dom-repeat>
          </div>
        </div>
        <div class="book-image-wrapper">
          <iron-image class="book-image" src="https://d1re4mvb3lawey.cloudfront.net/[[isbn]]/cover.jpg" alt="Book Image"></iron-image>
          <div class="book-buy">
            <paper-tab>Buy this book</paper-tab>
            <ul class="list-container">
            <li class="item"><span><iron-icon icon="icons:check"></iron-icon></span><span>Reflowable, mobile friendly ePUB</span></li>
            <li class="item"><span><iron-icon icon="icons:check"></iron-icon></span><span>Full access to the Bibliotech platform</span></li>
            <li class="item"><span><iron-icon icon="icons:check"></iron-icon></span><span>Download and read offline</span></li>
            </ul>
            <paper-button role="button" on-click="handleClick">Continue to Payment</paper-button>
          </div>
          
        </div>

        <div class="book-info-wrapper">
         <div class="book-details">
            <span class="meta"><span class="darker">ISBN</span> | [[isbn]]</span>
            <span class="meta"><span class="darker">Publisher</span> | [[bookData.publisher]]</span>
            <span class="meta"><span class="darker">Year</span> | [[bookData.date]]</span>
          </div>
        </div>
        <div class="book-info">
            <div id="book-details" role="tabpanel" class="tabpanel" tabindex="-1" aria-hidden="false">
              <h2 class="text--center mb-s">Book Details</h2>
              <table class="plain centered">
              <tbody>
              <tr>
              <th>ISBN:</th>
              <td>[[isbn]]</td>
              </tr>
              <tr>
              <th>Publisher:</th>
              <td>
              <a href="#" tabindex="0">[[bookData.publisher]]</a></td>
              </tr>
              <tr> <th>Publication date:</th>
              <td>[[bookData.data]]</td>
              </tr>
              <tr><th>Edition description:</th>
              <td>Bibliotech Exclusive Edition</td>
              </tr>
              <tr> <th>Pages:</th>
              <td>[[bookData.pages]]</td>
              </tr>
              <tr><th>Sales rank:</th>
              <td>[[bookData.rank]]</td>
              </tr>
              <tr><th>Product dimensions:</th>
              <td>[[bookData.dimensions]]</td>
              </tr>
              </tbody><tbody>
              </tbody></table>
            </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      isbn: {
        type: String
      }
    }
  }

  handleClick() {
    window.location = `https://bibliotech.education/#/view/books/${this.isbn}/epub/html/toc.html`;
  }
}

window.customElements.define('book-info', BookInfo);
