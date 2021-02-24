//YOUR FIREBASE LINKS
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
      apiKey: "AIzaSyBS4KecuvTzmFVq3lDZkeD-zLgoBq6qV_o",
      authDomain: "kwitter-25c91.firebaseapp.com",
      databaseURL: "https://kwitter-25c91-default-rtdb.firebaseio.com",
      projectId: "kwitter-25c91",
      storageBucket: "kwitter-25c91.appspot.com",
      messagingSenderId: "205471128242",
      appId: "1:205471128242:web:35f9f004bb3475e06dc7ab",
      measurementId: "G-NY2X6G7H43"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");
function send(){
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
  });
  document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>"+ name + "<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<button class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>"+ like +"</span></button><hr>";

row = name_with_tag + message_with_tag +like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id){
      console.log("clicked on like button -" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(updateLikes);

      firebase.databse().ref(room_name).child(message_id).update({
            like : update_likes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("kwitter.html");
}