// DOM elements
const guideList = document.querySelector('.guides');

// setup guides
const setupGuides = (data) => {

  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    const li = `
      <li>
      <div class="collapsible-header grey lighten-4" style="color: #8f7193; font-weight: bold;"> ${guide.title} </div>
      <div class="collapsible-body white" style="color: #c0a0c3;"> ${guide.content} </div>
      </li>
    `;
    html += li;
  });
  guideList.innerHTML = html

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});