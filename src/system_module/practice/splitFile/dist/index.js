
        window.onload = function(){
            const box = document.querySelector('.box')
            box.addEventListener('click',(e)=>{
                console.log(e.target,'e')
                let ele = e.target
                ele.style.backgroundColor = 'blue'
            })
        }
    