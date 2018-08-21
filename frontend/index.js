console.log("Make me do things!");

let $messageContainer = $('.chat-message-list');
let ws = new WebSocket('ws://localhost:3001');

let username = prompt('What is your username?');
let $formContainer = $('[data-chat="chat-form"]');
let $messageInput = $('.form-control');

let drawMessage = ({
    user: u,
    message: m,
    timestamp: t,
  }) => {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });
    // if (this is me?) {
    //   $messageRow.addClass('me');
    // }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));
    $message.append($('<span>', {
      'class': 'timestamp',
      'data-time': t,
      text: t.toString()
    }));
    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));
    let $img = $('<img>', {
      src: 'https://avatars3.githubusercontent.com/u/794113?s=64&v=4',
      title: u
    });
    $messageRow.append($img);
    $messageRow.append($message);
    return $messageRow;
  };

$formContainer.on('submit', event => {
  event.preventDefault();
  let newMessage = {user: username, message: $messageInput.val(), timestamp: new Date()};
  $formContainer.trigger('reset');
  ws.send(JSON.stringify(newMessage));
});

ws.addEventListener('message', event => {
  // console.log(JSON.parse(event.data));
  let formMessage = drawMessage(JSON.parse(event.data));
  $messageContainer.append(formMessage);
  formMessage.get(0).scrollIntoView();
})