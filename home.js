// TABEL BUKU //
function showtabel() {
    var x = document.getElementById("tabcapeg");
    if (x.style.display === "none") {
        x.style.display = "table";
    }
}

// MODAL DETAIL //
function showform(m, x, y, z, a, b, c) {
    // Get the modal
    var modal = document.getElementById("formModal");

    // Get the button that opens the modal
    var btn = document.getElementById("fModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    document.getElementById('capegid').innerHTML = m;
    document.getElementById('nama').innerHTML = x;
    document.getElementById('alamat').innerHTML = y;
    document.getElementById('email').innerHTML = z;
    document.getElementById('notelp').innerHTML = a;
    document.getElementById('tgllahir').innerHTML = b;
    document.getElementById('kategori').innerHTML = c;
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function showdetail() {
  // Get the modal
  var modal = document.getElementById("detailModal");

  // Get the button that opens the modal
  var btn = document.getElementById("dModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  modal.style.display = "block";
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
      modal.style.display = "none";
      }
  }
}

function openTable(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function showpanel() {
  var acc = document.getElementsByClassName("accordion");

  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");

      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}