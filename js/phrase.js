(function() {
  var whatitis = [
    'art', 'collaboration', 'science', 'love',
    'experimenting', 'learning', 'exploration',
    'sharing', 'tweaking', 'creating', 'people',
    'utopia', 'questioning', 'hacking'
  ];
  var base = 'Lacuna Lab is about ';
  var which = 0;
  var sentence0 = '';
  var sentence1 = base + whatitis[which];
  var timer;
  
  function tick() {
    if(sentence0 == sentence1) {
      which = (which + 1) % whatitis.length;
      sentence1 = base + whatitis[which];
      timer = setTimeout(tick, 2000);
      return;
    }
    while(sentence0.length > sentence1.length) {
      sentence1 += ' ';
    }
    while(sentence0.length < sentence1.length) {
      sentence0 += ' ';
    }
    var sentence0b = '';
    for(var i=0; i<sentence0.length; i++) {
      var c0 = sentence0.charCodeAt(i);
      var c1 = sentence1.charCodeAt(i);
      if(c0<c1) {
        sentence0b += String.fromCharCode(c0+1);
      } else if(c0>c1) {
        sentence0b += String.fromCharCode(c0-1);
      } else {
        sentence0b += String.fromCharCode(c0);
      }
    }
    sentence0 = sentence0b;
    $('#phrase').text(sentence0);
    timer = setTimeout(tick, 32);
  }
  $(function() {
    timer = setTimeout(tick, 2000);
  });
})();
