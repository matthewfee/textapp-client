

const usernameDirty = window.localStorage.getItem('user') || "anonymous";

const username = DOMPurify.sanitize(usernameDirty)
console.log("MY USERNAME", username)

document.querySelector(".user-info").innerHTML = `Posting as ${username}`;

const createMessage = (obj) => {
    console.log(obj.eventDate)

    let date = new Date(obj.eventDate)
    let d = new Date(obj.eventDate);

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
    const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${formatAMPM(d)} `;
    

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
                
                messagesData = response.data;
                
                let arr = []
                messagesData.forEach((message) =>  {
                    let newElement = createMessage(message);
                    arr.push(newElement)
                })
                
                let html = arr.join("")
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
        console.log("username", username)
        let date = new Date();
        
        console.log("DATE", date)
        let dataJSON = {eventText: message, 
            eventUser: username,
            eventDate: date} ;

        console.log("DATAJSON", dataJSON)
        
        axios({ 
          method  : 'post',   
          url : 'https://textapp-server.herokuapp.com/', 
          data : dataJSON, 
        }) 
        .then((res)=>{ 
          console.log(res);
          window.location.reload() 
        }) 
        .catch((err) => {throw err}); 
    }); 
}); 


