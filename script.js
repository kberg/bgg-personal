// Set-up. Create clickable elements with appropriate IDs.
function setUp() {
  function functionToId(fs) {
    var result = fs.substr(0, fs.indexOf(');'));    // Trim from ); to end.
    var prefix = 'RecommendItem(';                 // Trim from start to function name.
    result = result.substr(result.indexOf(prefix) + prefix.length);
    result = result.replace(/[' ]/g, '')           // Remove ' and spaces
    return result;
  }

  var elems = document.getElementsByClassName('icon');
  for (var idx = 0; idx < elems.length; idx++) {
    var elem = elems[idx];
    if (elem.title !== 'Hide') {
      continue;
    }
    var parent = elem.parentElement;
    var oc = parent.getAttribute('onclick');
    if (!oc) {
      continue;
    }

    var dd = document.createElement('dd');
    dd.style.width = '60px';

    var sib = document.createElement('a');
    
    sib.innerText = 'Personal';
    sib.href = 'javascript:void(0);';
    sib.className = 'k9-personal';
    sib.id = functionToId(oc.toString());
    console.log(sib.id);

    parent.parentElement.parentElement.appendChild(dd);
    dd.appendChild(sib);
  }
}

function afterDOMLoaded() {
  var elems = document.getElementsByClassName('k9-personal');
  for (var idx = 0; idx < elems.length; idx++) {
    var elem = elems[idx];
    elem.addEventListener('click', function(evt) {
      var id = this.id;
        var params = id.split(',');

        var itemtype = params[1];
        var itemid = params[2];
        var updateid = params[4];
        var hideobj = params[5];

        RecommendItem(1, itemtype, itemid, '2', updateid, hideobj, 'personal');
    });
  }
};

setUp();
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}
