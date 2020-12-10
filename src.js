

window.addEventListener('load', ()=>{ 
        
    const form = document.querySelector('form'); 
    form.addEventListener('submit', (e)=>{ 
        //to prevent reload 
        // e.preventDefault(); 
        // //creates a multipart/form-data object 
        // let data = new FormData(form); 

        let username = document.querySelector("#username").value
        console.log(username)
        localStorage.setItem("user", username)
        // axios({ 
        //   method  : 'post', 
        //   url : '/', 
        //   data : data, 
        // }) 
        // .then((res)=>{ 
        //   console.log(res); 
        // }) 
        // .catch((err) => {throw err}); 
    }); 
}); 
