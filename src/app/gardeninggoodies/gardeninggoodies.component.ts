import { Component } from '@angular/core';

@Component({
  selector: 'app-gardeninggoodies',
  template: `
  <h2 class="title is-2 is-capitalized">Gardening Tools</h2>
    <div class="iframe-wrapper">
    
      <iframe #amazonAd src="assets/amazon-ad.html" width="100%" height="600" frameborder="0" (load)="onIframeLoad(amazonAd)"></iframe>
    </div>
  `,
  styles: [
    `
      .iframe-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        overflow: hidden;
      }

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
    `,
  ],
})
export class GardeninggoodiesComponent {
  onIframeLoad(iframe: HTMLIFrameElement) {
    const iframeWindow = iframe.contentWindow;

    if (iframeWindow) {
      iframeWindow.postMessage({ type: 'init' }, '*');
      iframeWindow.addEventListener('message', (event) => {
        if (event.data.type === 'resize') {
          iframe.style.height = event.data.height + 'px';
        }
      });
    }
  }
}
