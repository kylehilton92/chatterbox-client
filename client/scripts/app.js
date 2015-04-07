var app = {};

app.init = function(){};

app.send = function(message)
{
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data)
    {
    },
    error: function(data)
    {
      console.log('error');
    }
  });
};

var test;
var existingMessages = {};

app.fetch = function(address, pre)
{
  $.ajax({
    url: address,
    data: {limit: 1000,
      order: '-updatedAt'},
    type: 'GET',
    success: function(data)
    {
      test = data;
      app.displayMessages(data, pre);
    },
    error: function(data)
    {
      console.log('error');
    }
  });
};

app.submitMessage = function()
{
  app.send({
    'username': $('.userNameBox').val(),
    'text': $('.messageBox').val(),
    'roomname': $('.roomNameBox').val(),
  });
}

app.fetch('https://api.parse.com/1/classes/chatterbox', false);

setInterval(function()
{
  app.fetch('https://api.parse.com/1/classes/chatterbox', true);
}, 5000);

app.clearMessages = function()
{
  $('#chats').empty();
};

app.addMessage = function(message, pre)
{
  var userName = '<a href="" onclick="app.addFriend()" class="username">' + _.escape(message.username) + ' </a><span>' + _.escape(message.roomname) + '</span>';
  var messageText = '<p>' + _.escape(message.text) + '</p>';
  var $fullMessage = $('<div class="message">' + userName + messageText + '</div>');
  if(pre)
  {
    $('#chats').prepend($fullMessage);
  } else {
    $('#chats').append($fullMessage);
  }
};

app.displayMessages = function(data, pre)
{
  for(var i = 0; i < data.results.length; i++)
  {
      if(!existingMessages.hasOwnProperty(data.results[i]['objectId']) && data.results[i]['roomname'] && data.results[i]['username'] && data.results[i]['text'] &&
        data.results[i]['text'].length<100 && data.results[i]['username'].length<20){
        existingMessages[data.results[i]['objectId']] = 0;
        app.addMessage(data.results[i], pre);
    }
  }
};

app.goToRoom = function()
{

}


app.addRoom = function(newRoom)
{
  var userName = '<h3></h3><span>' + newRoom + '</span>';
  var messageText = '<p></p>';
  var $fullMessage = $('<div class="message">' + userName + messageText + '</div>');
  $('#roomSelect').append($fullMessage);
};

app.refreshMessages = function()
{

}

app.addFriend = function()
{
  //add victim
};

app.handleSubmit = function()
{

};
