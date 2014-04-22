+function(bespoke, window, document, undefined) {
  var isFutureFrame = location.hash === '#bespoke-remote-future';

  bespoke.plugins.remote = function(deck, options) {
    var options = {} || options,
        socket = io.connect(options.socketUrl || 'http://localhost:<%= port %>/'),
        indicator = document.createElement('div');

    indicator.className = 'bespoke-remote-indicator';
    deck.parent.appendChild(indicator);

    socket.on('bespoke-remote.established', function() {
      console.info('Connection with server established.')
      console.info('Awaiting paired remote control...')
      indicator.classList.add('bespoke-remote-indicator-established');
    })
    socket.on('bespoke-remote.connected', function() {
      console.info('Paired with remote control. Happy RCing!')
      indicator.classList.add('bespoke-remote-indicator-connected');
    })
    socket.on('bespoke-remote.reset', function() {
      deck.slide(0);
      isFutureFrame && deck.next();
    });

    socket.on('bespoke-remote.next', deck.next);
    socket.on('bespoke-remote.prev', deck.prev);

    !isFutureFrame && deck.on('activate', function(e) {
      var notes = [].slice.call(e.slide.children).reduce(function(acc, el){
        return el.nodeName === 'ASIDE' ? el.innerHTML : acc;
      }, '');
      socket.emit('bespoke-remote.notes', notes);
    });
  }
}(bespoke, this, document)