const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
// turn into an array for later use
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(e) {
        // hide other tab Panels
        tabPanels.forEach(panel => {
                panel.hidden = 'true';
        });
        // mark unselected tablist
        tabButtons.forEach(e => {
                // e.ariaSelected = false;
                e.setAttribute('aria-selected', false); // aria elements must use setAttribute
        });
        // mark selcted tab
        event.currentTarget.setAttribute('aria-selected', true);

        // show proper panel
        const { id } = event.currentTarget;
        // console.log(id);

        const tabPanel = tabPanels.find(panel => panel.getAttribute('aria-labelledby') === id);
        tabPanel.hidden = false;
}
tabButtons.forEach(e => {
        e.addEventListener('click', handleTabClick);
});
