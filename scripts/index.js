// DOM elements
const guideList = document.querySelector('.guides');

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4" style="color: #8f7193; font-weight: bold;"> ${guide.title} </div>
      <div class="collapsible-body white" style="color: #a788ab;"> ${guide.content} </div>
      </li>
  
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align" style="color: #8f7193; font-weight: bold;">Login to view guides :) </h5>';
  }


};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});