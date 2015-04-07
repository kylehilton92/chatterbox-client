var app = {};



app.init = function(){};

app.send = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data){
      console.dir(data);
    },
    error: function(data){
      console.log('error');
    }
  });
};

app.fetch = function(address){
  $.ajax({
    url: address,
    data: {limit: 1000,
      order: '-updatedAt'},
    type: 'GET',
    success: function(data){
      app.displayMessages(data);
    },
    error: function(data){
      console.log('error');
    }
  });
};

app.fetch('https://api.parse.com/1/classes/chatterbox');

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  var userName = '<a href="" onclick="app.addFriend()" class="username">' + message.username + ' </a><span>' + message.roomname + '</span>';
  var messageText = '<p>' + message.text + '</p>';
  var $fullMessage = $('<div class="message">' + userName + messageText + '</div>');
  $('#chats').append($fullMessage);
};


app.displayMessages = function(data){
  for(var i = 0; i < data.results.length; i++){
    app.addMessage(data.results[i]);
  }
};




app.addRoom = function(newRoom){
  var userName = '<h3></h3><span>' + newRoom + '</span>';
  var messageText = '<p></p>';
  var $fullMessage = $('<div class="message">' + userName + messageText + '</div>');
  $('#roomSelect').append($fullMessage);
};

app.addFriend = function(){
  //add victim
};

app.handleSubmit = function(){

};
