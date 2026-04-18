const stateButtons = document.querySelectorAll('[data-rp-state]');
const statePanels = document.querySelectorAll('[data-rp-panel]');

stateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.rpState;
    stateButtons.forEach((b) => b.classList.toggle('secondary', b !== button));
    statePanels.forEach((panel) => {
      panel.classList.toggle('hidden', panel.dataset.rpPanel !== target);
    });
  });
});
