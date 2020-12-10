

const usernameDirty = window.localStorage.getItem('user') || "anonymous";

const username = DOMPurify.sanitize(usernameDirty)
console.log("MY USERNAME", username)

document.querySelector(".user-info").innerHTML = `Posting as ${username}`;

const createMessage = (messageObj) => {

    let d = new Date(messageObj.eventDate);

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
    const formattedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${formatAMPM(d)} `;
    

    return `
    <div class="message-container"> 
        <div class="message--info">
            <span class="message--user">${obj.eventUser} </span>
            <span class="message--date">${formattedDate} </span></div>
        <div class="message--text">${obj.eventText} </div>
    </div>
    `
}

const getMessages = () => {

    axios.defaults.headers.common['Content-Type'] = 'application/json'; 
            
    axios.get("https://textapp-server.herokuapp.com/")
        .then((response) => {
                console.log("Messages Response", response)
                messagesData = response.data;
                console.log("MESSAGES DATA", messagesData)
                let arr = []
                messagesData.forEach((message) =>  {
                    let newElement = createMessage(message);
                    console.log("newElement". newElement)
                    arr.push(newElement)
                })
                console.log(arr);
                const html = arr.join("")
                const htmlClean = DOMPurify.sanitize(html)
                document.querySelector(".message-board").innerHTML = htmlClean;

                const message = document.querySelector(".message");
                message.scrollIntoView();
                
            })
        
};

getMessages()





window.addEventListener('load', ()=>{ 
        
    const form = document.querySelector('form'); 
    form.addEventListener('submit', (e)=>{ 
        // to prevent reload 
        e.preventDefault(); 
        //creates a multipart/form-data object 
        let message = document.querySelector('.message').value;
        let date = new Date();
        
        console.log("DATE", date)
        let dataJSON = {eventText: message, 
            eventUser: username,
            eventDate: date} 
        axios({ 
          method  : 'post',   
          url : 'https://textapp-server.herokuapp.com/', 
          data : dataJSON, 
        }) 
        .then((res)=>{ 
          console.log(res); 
        }) 
        .catch((err) => {throw err}); 
    }); 
}); 


