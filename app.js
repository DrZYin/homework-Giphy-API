var initialSearchTerms = ['Cat', 'Lion', 'Tiger', 'Cheetah', 'Leopard', 'Puma', 'Cougar'];
var list = $('aside ul');
var main = $('main');
var endpoint = 'https://api.giphy.com/v1/gifs/search';
var apiKey = 'YiSsrFcgNJtIUMSj56onTyk9KhJRbjY4';
var limit = 10;
for (var i of initialSearchTerms) {
  list.append($('<li>' + i + '</li>'));
}
list.on('click', 'li', function() {
  displayResults(this.innerText);
});
main.on('click', 'img', function() {
  this.src = this.src.includes('_s.gif') ? this.getAttribute('animatedUrl') : this.getAttribute('stillUrl');
});

$('#addNew').on('click', function (e) {
  e.preventDefault();
  var newLi=`<li>${$('[name=new-search-term]').val().trim()}</li>`;
  list.append(newLi);
  $('[name=new-search-term]').val('');
});

function displayResults(searchTerm) {
  $.ajax(`${endpoint}?api_key=${apiKey}&q=${searchTerm}&limit=${limit}`)
    .done(function(response) {
      populatePics(response);
    });
}

function populatePics(response) {
  $('main').empty();
  for (var i of response.data) {
    var stillUrl = i.images.fixed_height_still.url;
    var animatedUrl = i.images.fixed_height.webp;
    var imgNode = `<img src=${stillUrl} stillUrl=${stillUrl} animatedUrl=${animatedUrl}>`;
    var RatingNode = `<p class=rating>Rating: ${i.rating}</p>`
    var imageDiv =`<div>${imgNode}${RatingNode}`;
    main.append(imageDiv);
  }
}

