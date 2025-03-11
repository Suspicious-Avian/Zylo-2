let match = 0;
let wp = 0;
let user;
let chatlist;
let lastMessageCounts = {};

let visib = false;
let userchats, userid;
let lastseenmessage = [];

let item;
let currentchat;
let listened = false;
let currentmessages = [];
// write
function updateCloudVariable(value) {
    const refPath = window.ref(window.database, 'messages'); 
    window.firebaseSet(refPath, value);
  }
 
  
  // read
  function getCloudVariable(name,callback) {
    const refPath = window.ref(window.database, name); 
    window.onValue(refPath, (snapshot) => {
      let value = snapshot.val();
    
      callback(value);
      //console.log(value)
    });
  }
  
  function getCurrentTime() {
    const now = new Date(); 
    let hours = now.getHours(); 
    let minutes = now.getMinutes(); 
    let day = now.getDate(); 
    let month = now.getMonth() + 1; 
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    day = String(day).padStart(2, '0');
    month = String(month).padStart(2, '0');



    return ([day+'/'+month,`${hours}:${minutes}`]); // Return formatted time
}


  function setup() {

    if (Notification.permission != true){

    Notification.requestPermission().then(function (permission) {

      console.log(permission);
  
  });}
    
    document.getElementById("loginbutton").addEventListener("click", toLogin);
   document.getElementById("loginoverlay").addEventListener("click", hideLogin);
   document.getElementById("loginform").addEventListener("submit", sendlogin); 

   document.getElementById("pfpbutton").addEventListener("click", dropdown);
   document.getElementById("add").addEventListener("click", findserver);
   document.getElementById("profilebutton").addEventListener("click", profile);
   document.getElementById("settingsbutton").addEventListener("click", settings); 
   document.getElementById("logoutbutton").addEventListener("click", logout);
   visib = !document.hidden



   checklogin();
   

  }


  function profile(){

  }

  function findserver(){
    console.log('loading page...')
    let slo =document.getElementById('slogan')
    if(slo){
    slo.remove();}
    // let bottom =document.getElementById('slogan')
    // if(bottom){
    // bottom.remove();}
   let textbox = document.getElementById('pagecontent');
   textbox.innerHTML = ''; 
   let footer = document.getElementById('footertype');
   if (footer){
   footer.innerHTML = ''; 
   }

   let searchinfo = document.createElement('div');
   let searchcode = document.createElement('div');
   let type = document.createElement('input');
   let subbut = document.createElement('input');
   let typeform = document.createElement('form');
   //let sinfoh1 = document.createElement('h1');
   let sbg = document.createElement('div')

   searchcode.classList.add('noborder','forward1');
   searchcode.style.backgroundImage='url("search.png")'
   searchcode.style.backgroundSize='100%'
   searchinfo.classList.add('noborder','buttonpadded','whitebg','txtfont');
   
   //sinfoh1.innerText = 'Find servers'
   //sinfoh1.classList.add('yellowtxt','gay')

   //sbg.innerHTML = '<img src="search.png" style="width:100%;">'

   subbut.type="submit";
   subbut.classList.add('whitebg','rounded','noborder','yellowpress','yellowtxt','largefont','boldtxt')
   subbut.style.width='40px';
   subbut.style.padding='7px 15px';
   subbut.value = '»';
   subbut.style.height='40px';
   subbut.style.margin='5px 0px';

   searchcode.style.padding='30% 50px';
   searchcode.style.backgroundRepeat='no-repeat'

   type.id = 'codetxtbox';
   type.setAttribute("type", "text");
   type.classList.add('circle','tenpxpadded','noborder','typebar');
   type.placeholder = 'Enter group code...'

   searchcode.id = 'entercode'
   
   typeform.id = 'code2send';
   typeform.action = '#'

   typeform.appendChild(subbut);
   typeform.appendChild(type)
   searchcode.appendChild(typeform)
  // searchinfo.appendChild(sinfoh1)
 
 //  textbox.appendChild(searchinfo)
 textbox.appendChild(sbg)
   textbox.appendChild(searchcode)

   document.getElementById("code2send").addEventListener("submit",addserverperms)



  }


  function settings(){

  }

  function logout(){
    clearStorage();
location.reload();

  }
  
  function draw() {
    let dropd = document.getElementById('dropdown');
    let displayvalue = window.getComputedStyle(dropd).display;


   // console.log(dropd);
    if(displayvalue!='none'){
    
     placedropdown();
    }

  //console.log(document.hidden)

if(visib == true){
  

 //console.log(chatlist,'chatslistig',currentchat,'currentchat',currentchat[0][1],'currentchatsub')
 
if(chatlist && currentchat){
  lastseenmessage[currentchat] = chatlist[currentchat[0][1]][1][1][1].length ;
  //console.log(chatlist[currentchat[0][1]][1][1][1],'currentchatlength',currentchat[1],'cc')
}

}

  }

  document.addEventListener("visibilitychange", () => {
    console.log("Vis:", !document.hidden);
    visib = !document.hidden;


});

  function setCloud(){
    
    
    let datar = [];
  
    // Example: Update the cloud variable with a new value
    for (let i = 0; i < 10; i++) {
      let msgdata = [];

      let timee = getCurrentTime()
      
        msgdata.push('Username');
        msgdata.push(timee[0]);
        msgdata.push(timee[1])
        msgdata.push('Message');
    
      datar.push([i,['group',['Category',['chat',msgdata]]]]);
    }
    
    updateCloudVariable(datar);
    
    // 
    getCloudVariable('messages', (cloudvar) => {
        for(i=0;i<cloudvar.length;i++){
            for(j=0;j<cloudvar[i].length;j++){
                //console.log("Cloud Variable value: ", cloudvar[i][j]); // Log the retrieved value}
                  }

              }
    });
  }
  

  function toLogin(){
    let popup = document.getElementById('loginpopup');
    let overlay = document.getElementById('loginoverlay');
    overlay.style.display  = 'block';
    console.log('U wish');
    popup.style.display  = 'block';
    let termsform = document.getElementById('termsform');
    if (termsform){
    termsform.innerHTML = '';
    termsform.remove();}
    
    document.getElementById('usernameinput').value = '';
    document.getElementById('passwordinput').value = '';
    
    

  }

  function hideLogin(){
console.log('HAHAH NO')
const popup = document.getElementById('loginpopup');
const overlay = document.getElementById('loginoverlay');
popup.style.display  = 'none';
overlay.style.display  = 'none';
  }


  function sendlogin(event){
    event.preventDefault(); // Fix: add parentheses to properly prevent form submission
    const username = document.getElementById('usernameinput').value;
    user = username;
    const password = document.getElementById('passwordinput').value;

    console.log(username);

    storeItem('Username', username);
    storeItem('Password', password);

    console.log('U tried');
    
    checklogin();
}


function createUser(usern, passw){
    console.log('THE HATERS')
     let refpath = window.ref(window.database, `Accounts/`)
window.getdata(refpath).then((snapshot) => {
    let currentArray = snapshot.val(); 
   
  
    
    currentArray.push([usern,passw,[0]]);
   // console.log(`${currentArray.length} is the number of accounts and the array is`, currentArray);
  
    let refpath = window.ref(window.database, `Accounts/`); 
    window.firebaseSet(refpath, currentArray);
    })
}

function checklogin() {
  let match = 0;
  let wp = 0; // Initialize wp variable outside of the loop
  
  let userdata = [getItem('Username'), getItem('Password')];
  
  // Log the entire cloud variable to inspect the structure
  getCloudVariable('Accounts', (cloudvar) => {
      console.log(cloudvar, 'cloudvar', cloudvar.length); // Log the cloud variable to check its structure
      
      try {
          for (let i = 0; i < cloudvar.length; i++) {
              if (cloudvar[i] && cloudvar[i].length >= 3) {
                  console.log(`Looping over index ${i}:`, cloudvar[i]); // Log each item to inspect it
              
                  if (cloudvar[i][0] == userdata[0] && cloudvar[i][1] == userdata[1]) {
                      console.log('Match!');
                      match = 1;
                      user = userdata[0];
                      userid = i;
                      userchats = cloudvar[i][2];
                      loadchats(cloudvar[i][2]);
                  } else if (cloudvar[i][0] == userdata[0]) {
                      wp = 1;
                  }
                  
                  console.log("Cloud Variable value:", cloudvar[i]); // Log the retrieved value
              } else {
                  console.warn(`Skipping invalid entry at index ${i}:`, cloudvar[i]);
              }
          }
      } catch (error) {
          console.error("Error in loop:", error);
      }

      if (match == 0) {
          agreed = document.getElementById('agreetocreate');
          if (agreed) {
              console.log('-10 aura');
              console.log('yay!');
              createUser(document.getElementById('usernameinput').value, document.getElementById('passwordinput').value);
          } else {
              clearStorage();
              console.log('fail :(');
              if (wp != 1) {
                  if (displayvalue = window.getComputedStyle(document.getElementById('loginpopup')).display == 'block') {
                      let totalform = document.getElementById('loginform');
                      let theform = document.createElement('div');
                      theform.id = 'termsform';
                      let thecheck = document.createElement('input');
                      thecheck.required = true;
                      thecheck.type = 'checkbox';
                      thecheck.id = 'agreetocreate';
                      labs = document.createElement('label');
                      labs.htmlFor = 'agreetocreate';
                      labs.textContent = ' I agree to create my account, subject to Firebase terms.';
                      
                      theform.appendChild(document.createElement('br'));
                      theform.appendChild(thecheck);
                      
                      theform.appendChild(labs);
                      totalform.appendChild(theform);
                  }
              }
          }
      } else {
          let chosen;
          chosen = document.getElementById('loginbutton');
          if (chosen) {
              chosen.style.display = 'none';
          }
          chosen = document.getElementById('pfpbutton');
          if (chosen) {
              chosen.style.display = 'block';
          }
          if (chosen) {
              chosen = document.getElementById('signup');
              chosen.style.display = 'none';
          }
          hideLogin();
      }
  });
}


function loadchats(chats){

  

    getCloudVariable('messages',(chatslist) => {
      //chatslist is returned. messages is passed as name. gets the whole messages array.

      chatlist = chatslist;


     
      chatslist.forEach(chat => {
        let chatID = chat[0]; //for our example, that chat id = 0.
        let messages = chat[1][1][1]; //this then finds the messages in the chat
        let messageCount = messages.length;

       //only if new
        if (!(chatID in lastMessageCounts)) {
            lastMessageCounts[chatID] = messageCount;
        }
    });

    setInterval(() => {
        getCloudVariable('messages', (updatedChats) => {
            updatedChats.forEach(chat => {
                let chatID = chat[0];
                let messages = chat[1][1][1];
                let messageCount = messages.length;

                if (messageCount > (lastMessageCounts[chatID] || 0)) {
                    let newMessage = messages[messageCount - 1];

                    console.log("New message received:", newMessage);

                    //notifs
                    if (Notification.permission === "granted") {
                      if(user!=newMessage[0]){
                        new Notification(newMessage[0], { body: newMessage[3] || "New chat message!" });
                    }}

                    lastMessageCounts[chatID] = messageCount; // Update last message count
                }
            });
        });
    }, 5000); // 5s
       

      for (i=0;i<chatslist.length;i++){
        lastseenmessage.push(0);
       
      }
       // console.log(chats)
      // console.log('chatslist',chatslist)
   // console.log(chatslist);
   let allgone = false;
while(allgone!=true){
   const groupsList = document.querySelector('.groupslist');
    if (groupsList) {
        groupsList.remove(); // Removes the entire element from the DOM
        console.log('Groups list deleted.');
    } else {
        console.log('Groups list not found.');
        allgone = true;
    }}

for(j=0;j<chats.length;j++){
    for(let i=0; i<chatslist.length;i++){
        if (chatslist[i][0]==chats[j]){
       // console.log(
            //chatslist[i][1][0],':Group name')//groupname

            for(let l=1;l<chatslist[i][1].length;l++){
          // console.log(chatslist[i][l][1][0],':Page Type',//pagetype
           // chatslist[i][l][1][1][0],":Chat name")//chatname

            for(let k=1;k<chatslist[i][l][1][1].length;k++){
                //console.log(chatslist[i][l][1][1][k],':message item')
            }
            createGroup(chatslist[i][l][1],chatslist[i][l][0],chats[j])
            console.log(chatslist[i][l][1][1].length,"chat length")
        }
    }}}

    items = document.querySelectorAll('.chat');

    // Loop through each item and add the click event listener
    items.forEach(item => {
      item.addEventListener('click', openChat);
    });    

})

}

function createGroup(items,gn,number,cat){
const joeDiv = document.getElementById('groupswrapper');
    
// Create the groupslist div
const groupsListDiv = document.createElement('div');
groupsListDiv.classList.add('groupslist');

// Create the groupslistname div
const groupsListNameDiv = document.createElement('div');
groupsListNameDiv.classList.add('groupslistname', 'yellowtxt','boldtxt');
groupsListNameDiv.innerHTML = gn;

// Create the groupslisttxt div
const groupsListTxtDiv = document.createElement('div');
groupsListTxtDiv.classList.add('groupslisttxt');

// Create the ul element
const ulElement = document.createElement('ul');

// Loop through the array 'items' and create li elements
items.forEach((item, i) => {
   // console.log(item+'ACKKK'+items);
    if(i/2 != round(i/2)){
    const liElement = document.createElement('li');
    const iElement = document.createElement('i');
    iElement.classList.add('fa-solid');
    iElement.classList.add('fa-house');
    
    // First, append the icon to the list item
    liElement.appendChild(iElement);
    
    liElement.id = `${i}|${number}`;
    
    // add text
    liElement.appendChild(document.createTextNode(` ${item[0]}`)); // Create a text node for each item
    
    liElement.classList.add('yellowtxt');
    liElement.classList.add('chat');
    
    // append to ul
    ulElement.appendChild(liElement);
    }
    
});

// Append ul to groupslisttxt div
groupsListTxtDiv.appendChild(ulElement);


groupsListDiv.appendChild(groupsListNameDiv);
groupsListDiv.appendChild(groupsListTxtDiv);

joeDiv.appendChild(groupsListDiv);


}


function dropdown(){


    let element = document.getElementById('dropuser')
    element.innerHTML = user;

    let dropd = document.getElementById('dropdown');
    
    let displayvalue = window.getComputedStyle(dropd).display;

    if(displayvalue=='none'){
        document.getElementById('dropdown').style.display='block'
    }else{
        document.getElementById('dropdown').style.display= 'none'
    }

}

/*IMAGE LOAD CODE*/ 
function uploadImage() {
  const fileInput = document.getElementById('fileUpload');
  const file = fileInput.files[0]; 

  if (file) {
 
    const sanitizedFileName = file.name.replace(/[.#$\[\]]/g, '_'); 

   
    const storageReference = storageRef(storage, 'images/' + sanitizedFileName);

   
    const uploadTask = uploadBytesResumable(storageReference, file);

    console.log('File:', file);
    console.log('Sanitized File Name:', sanitizedFileName);
    console.log('Storage Reference:', storageReference);
         

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {

        console.log('File:', file);
console.log('Sanitized File Name:', sanitizedFileName);
console.log('Storage Reference:', storageReference);
     
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          
          
          const imageRef = ref(database, 'images/' + sanitizedFileName);
          firebaseSet(imageRef, { url: downloadURL });

          textboxx = document.getElementById('txtbox');
          textboxx.value=`<img src=${downloadURL} width='100%'>`;
         
          const imageLinkElement = document.getElementById('imageLink');
          imageLinkElement.innerHTML += `<br><img src="${downloadURL}" width="200px">`;

         let pop = document.getElementById('imguploadpopup')
         pop.style.display='none';
          
        });
      }
    );
  } else {
    alert("Please select a file.");
  }
}


function fetchData() {
  const imageRef = ref(database, 'images');
  onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    
  });
}









function openChat(event) {

    currentmessages = []; 
    loadsendingcap();
    
    const itemId = event.target.id;
    item = separateTextItems(itemId,'|')
    console.log('You clicked item with ID:', itemId, item);
    tobold = document.getElementById(itemId);
    currentchat = item;
    
    items = document.querySelectorAll('.chat');

   
    items.forEach(item => {
      item.classList.remove('yellowbold')
    });    

    if (tobold) {
      tobold.classList.add('yellowbold');
  } else {
      console.error(`this isnt '${itemId}' `);
  }
chatslist = [];

    
    getCloudVariable('messages',(chatslist) => {

 
        let messagelist = [];
        var mholders = [];
for(i=1;i<chatslist[item[0][1]][1][1][item[0][0]].length;i++){
        currentmessages.push(chatslist[item[0][1]][1][1][item[0][0]][i])
        let messageitem = document.createElement('div')
        var mholder = document.createElement('div');
        mholder.classList.add('untouchable','back');
        var usertext = document.createElement('div');
        messageitem.innerHTML = chatslist[item[0][1]][1][1][item[0][0]][i][3];
        messageitem.classList.add('rounded','yellowbg','max40','buttonpadded','whitetxt','txtfont');
       
        usertext.innerHTML = chatslist[item[0][1]][1][1][item[0][0]][i][0];
    
        usertext.classList.add('txtfont','smalltxt','greytxt','tenpxmargin');
       


        if (chatslist[item[0][1]][1][1][item[0][0]][i][0]!=user){
            messageitem.classList.add('lmargin');
            usertext.classList.add('lmargin')
   
            }else{
                messageitem.classList.add('rmargin','rightalign')
                usertext.classList.add('rmargin','rightalignt')
          
            }
            

            mholder.appendChild(usertext);
            mholders.push(mholder);
           
           

        messagelist.push(messageitem);

 
    
    }

        let slo =document.getElementById('slogan')
        if(slo){
        slo.remove();}
       let textbox = document.getElementById('pagecontent');
       pagecontent.innerHTML = ''; 
     
    
    for(i=0;i<mholders.length;i++){

        mholders[i].appendChild(messagelist[i])
        textbox.appendChild(mholders[i])
      
       }

 
       window.scrollTo(0,document.body.scrollHeight);
    }
    
    
    
    
)




    
  }

  function toupload(){
    let imguploadpopup = document.getElementById('imguploadpopup')
    imguploadpopup.style.display='block';
  }
  

  function separateTextItems(text, separator) {
    
    const items = text.split(',');

    const separatedItems = items.map(item => item.trim().split(separator));

    return separatedItems;
}


// function loadsendingcap() {
//   let foot = document.getElementById('footertype');
//   if (foot) {
//       foot.remove();
//   }

//   let footer = document.createElement('div');
//   footer.classList.add('thinborder', 'buttonpadded', 'footersend', 'forward1', 'whitebg');

//   let type = document.createElement('input');
//   let imgupload = document.createElement('button');
//   let subbut = document.createElement('button'); // Change from input type="submit"

//   subbut.classList.add('yellowbg', 'rounded', 'noborder', 'yellowpress', 'whitetxt', 'largefont', 'boldtxt');
//   imgupload.classList.add('yellowbg', 'rounded', 'noborder', 'yellowpress', 'whitetxt', 'largefont', 'boldtxt');

//   imgupload.style.width = '40px';
//   imgupload.style.height = '40px';
//   imgupload.innerText = '📷';
//   imgupload.style.margin = '5px 5px';
//   imgupload.id = 'imguploadbutton';
//   imgupload.color = 'white';

//   subbut.style.width = '40px';
//   subbut.style.padding = '7px 15px';
//   subbut.innerText = '⤷';
//   subbut.style.height = '40px';
//   subbut.style.margin = '5px 0px';

//   type.id = 'txtbox';
//   type.classList.add('circle', 'tenpxpadded', 'thinborder', 'typebar');

//   footer.id = 'footertype';

//   let typeform = document.createElement('form');
//   typeform.appendChild(imgupload);
//   typeform.appendChild(subbut);
//   typeform.appendChild(type);

//   imgupload.onclick = toupload;
//   typeform.id = 'text2send';
//   typeform.action = '#';

//   footer.appendChild(typeform);
//   let containedsect = document.getElementById('page');
//   containedsect.appendChild(footer);

  
//   subbut.type = "submit"; 
//   subbut.onclick = function() {
//       console.log("sendb"); 
//       sendmsg();
//   };

//   type.addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//         event.preventDefault(); 
//         sendmsg(event); 
//     }
// });



//   typeform.addEventListener('submit', function(event) {
//       event.preventDefault();
//       console.log("Form submitted manually"); // Debug log
//       sendmsg(event);
//   });

  

// }

function loadsendingcap() {
  let foot = document.getElementById('footertype');
  if (foot) {
      foot.remove();
  }

  let footer = document.createElement('div');
  footer.classList.add('thinborder', 'buttonpadded', 'footersend', 'forward1', 'whitebg');

  let type = document.createElement('input');
  let imgupload = document.createElement('button');
  let subbut = document.createElement('button');

  subbut.classList.add('yellowbg', 'rounded', 'noborder', 'yellowpress', 'whitetxt', 'largefont', 'boldtxt');
  imgupload.classList.add('yellowbg', 'rounded', 'noborder', 'yellowpress', 'whitetxt', 'largefont', 'boldtxt');

  imgupload.style.width = '40px';
  imgupload.style.height = '40px';
  imgupload.innerText = '📷';
  imgupload.style.margin = '5px 5px';
  imgupload.id = 'imguploadbutton';
  imgupload.color = 'white';

  subbut.style.width = '40px';
  subbut.style.padding = '7px 15px';
  subbut.innerText = '⤷';
  subbut.style.height = '40px';
  subbut.style.margin = '5px 0px';

  type.id = 'txtbox';
  type.classList.add('circle', 'tenpxpadded', 'thinborder', 'typebar');

  footer.id = 'footertype';

  let typeform = document.createElement('form');
  typeform.appendChild(imgupload);
  typeform.appendChild(subbut);
  typeform.appendChild(type);

  imgupload.onclick = toupload;
  typeform.id = 'text2send';
  typeform.action = '#';

  footer.appendChild(typeform);
  let containedsect = document.getElementById('page');
  containedsect.appendChild(footer);

  subbut.type = "submit"; 

  // // fix
  // type.addEventListener('keydown', function(event) {
  //     if (event.key === 'Enter') {
  //         event.preventDefault();  
  //         console.log("Enter key detected, submitting form...");
  //         typeform.submit(); // Simulate submit button click
  //     }
  // });
  console.log('EEFFGG')
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  
        console.log("Global Enter key detected, sending message...");
        sendmsg(event);
    }
});

  // form submission runs sendmsg
  typeform.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log("Form submitted manually");
      sendmsg(event);
  });
}




function placedropdown(){
    const element = document.getElementById('pfpbutton');
const rect = element.getBoundingClientRect();

drop = document.getElementById('dropdown');
drop.style.top = `${rect.top+parseFloat(window.getComputedStyle(document.getElementById('pfpbutton')).height)/2}px`;
drop.style.left = `${rect.left-parseFloat(window.getComputedStyle(document.getElementById('dropdown')).width)-parseFloat(window.getComputedStyle(document.getElementById('pfpbutton')).width)/2}px`;

}


function addserverperms(event){
  event.preventDefault();
  let toempty = document.getElementById('codetxtbox');

  userchats.push(toempty.value);
 
  loadchats(userchats);




  const refPath = window.ref(window.database, `Accounts/${userid}/2/`);
  window.firebaseSet(refPath, userchats);
  
}


function sendmsg(event){
    event.preventDefault();
    let toempty = document.getElementById('txtbox');
  
    if (toempty.value!=''){
        
      
        getCloudVariable('messages', chatslist => {
           
            const refPath = window.ref(window.database, `messages/${currentchat[0][1]}/1/1/${currentchat[0][0]}/`);
         
       
            let msg = document.getElementById('txtbox').value; 
          
            let msgdata = [];

            let timee = getCurrentTime()
            
              msgdata.push(user);
              msgdata.push(timee[0]);
              msgdata.push(timee[1])
              msgdata.push(msg);
          
            
          




window.getdata(refPath).then((snapshot) => {
  let currentArray = snapshot.val(); 
  if(toempty.value!=''){

    toempty.value = '';


  currentArray.push(msgdata);

 
  window.firebaseSet(refPath, currentArray);


}


});
        




                
        });
        
        console.log('hell naw');
    }}
    

    