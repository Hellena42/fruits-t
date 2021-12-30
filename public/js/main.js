(function onClickFilterLinks() {
  let clickableLinks = document.getElementsByClassName('filter-link');
  let paramsObj = {};

  Array.from(clickableLinks).forEach(el => {
    let linkType = el.getAttribute('data-type');
    let linkSeason = el.getAttribute('data-season');
    let linkPrice = el.getAttribute('data-price');

    el.addEventListener('click', function (e) {
      let urlBase = 'http://localhost:3000/fruits/';
      let locationParams = location.href.replace(urlBase, '');

      if (linkType != null) {
        paramsObj.type = linkType;
      }
      
      if (linkSeason != null) {
        paramsObj.season = linkSeason;
      }
      
      if (linkPrice != null) {
        paramsObj.price = linkPrice
      }
      
      let params = Object.keys(paramsObj)
      .filter(key => paramsObj[key])
      .map(key => key + '=' + paramsObj[key]).join('/');    

      if (params === '') {
        location.href = location.href;
      } 

      if (params !== '') {
        let partParams = params.replace(/=[^=]*$/, '');

        if (locationParams.includes(partParams)) {
          let res = [];

          locationParams.split('/').forEach(el => {
            if (el.indexOf(partParams)) {
              res.push(el);
            }
          });

          let resJoin = res.join('/');

          if (resJoin === '') {
            location.href = `${'/fruits/'}${params}`;
          } else if (resJoin.length > 1){
            let checkedParams = `${resJoin}/${params}`;
            location.href = `${'/fruits/'}${checkedParams}`;
          }
        } else {

          if (locationParams === location.href) {
            location.href = `${'/fruits/'}${params}`;
          } else {
            let newlocationParams = locationParams.replace(/^[^/]*\//, '');
            location.href = `${newlocationParams}/${params}`
          }
        }
      }
      })
  })
})();

(function closeFilterMark() {
  const btnMarks = document.getElementsByClassName('btn-mark');
  
  Array.from(btnMarks).forEach(el => {    
    el.addEventListener('click', function() {
      const mark = el.getAttribute('data-mark');
      const markLocation = location.href;
      let res = [];

      markLocation.split('/').forEach(el => {
        if (!el.includes(mark)) {
          res.push(el);
        }
      })

      let resJoin = res.join('/');
      location.href = resJoin;
    })
  })
})();

(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

function openModal() {
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("exampleModal").style.display = "block"
    document.getElementById("exampleModal").classList.add("show")
}

function closeModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("exampleModal").style.display = "none"
    document.getElementById("exampleModal").classList.remove("show")
}

const modal = document.getElementById('exampleModal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

function deleteItem(id) {
  let _id = `_id=${id}`;
  let request = new XMLHttpRequest();
  request.open('DELETE', `/organic/${id}`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.addEventListener("load", function () {

     let resp = JSON.parse(request.response);
     console.log('resp', resp);  
 });
 request.send(_id);
}