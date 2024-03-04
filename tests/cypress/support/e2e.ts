import './commands/global'
import './triggers/before'

const app = window.top;
if (!app.document.head.querySelector('[data-testid="snapshot-controls]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '[data-testid="snapshot-controls"] { display: none }';
  app.document.head.appendChild(style);
}
