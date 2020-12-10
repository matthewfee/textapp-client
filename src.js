

window.addEventListener('load', ()=>{ 
        
    const form = document.querySelector('form'); 
    form.addEventListener('submit', (e)=>{ 

        let username = document.querySelector("#username").value
        localStorage.setItem("user", username)

    }); 
}); 
