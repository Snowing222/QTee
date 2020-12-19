const BASE_URL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
    const initCanvas = (id) => {
        return new fabric.Canvas(id, {
            width: 355,
            height: 700,
            backgroundColor: 'pink'
        })
    }

    const canvas = initCanvas('canvas')
    canvas.renderAll()

    let fonts = ['Abril Fatface',
        'Big Shoulders Inline Text',
        'Bungee Outline',
        'Dancing Script',
        'Indie Flower',
        'JetBrains Mono',
        'Lobster',
        'Orbitron',
        'Righteous',
        'Roboto',
        'Sacramento',
        'Special Elite']

    document.getElementById('addTextButton').addEventListener('click', (e) => {
        var textbox = new fabric.Textbox('Lorum ipsum dolor sit amet', {
            left: 50,
            top: 50,
            width: 150,
            fontSize: 20
        });

        canvas.add(textbox).setActiveObject(textbox);

        fonts.unshift('Times New Roman')
        var select = document.getElementById("font-family");
        fonts.forEach(function (font) {
            var option = document.createElement('option');
            option.innerHTML = font;
            option.value = font;
            select.appendChild(option);
        });

        document.querySelector("p.hidden.font").classList.remove("hidden")

        select.addEventListener('change', (e) => {
            if (e.target.value !== 'Times New Roman') {
                textbox.fontFamily = e.target.value
                canvas.requestRenderAll()
            }
        })
    })

    document.getElementById('addShape').addEventListener('click', (e) => {
        document.querySelector('p.hidden.shape').classList.remove('hidden')

    })

    document.querySelector('button.btn.circle').addEventListener('click', () => {
        canvas.add(new fabric.Circle({
            radius: 40,
            left: 50,
            top: 50,
            fill: 'rgb(0,255,0)',
            opacity: 0.5
        }));
    })

    document.querySelector('button.btn.triangle').addEventListener('click', () => {
        canvas.add(new fabric.Triangle({
            width: 50,
            height: 40,
            fill: 'blue',
            left: 50,
            top: 50
        }));
    })

    document.querySelector('button.btn.rect').addEventListener('click', () => {
        canvas.add(new fabric.Rect({
            width: 50,
            height: 50,
            left: 50,
            top: 50,
            fill: 'rgb(255,0,0)'
        }));
    })


    function addRect() {
        canvas.add(new fabric.Rect({
            width: 50,
            height: 50,
            left: 50,
            top: 50,
            fill: 'rgb(255,0,0)'
        }));
    }


    function addTriangle() {
        canvas.add(new fabric.Triangle({
            width: 50,
            height: 40,
            fill: 'blue',
            left: 50,
            top: 50
        }));
    }



    let tshirtColor = document.getElementById("tshirt-color")
    tshirtColor.addEventListener('change', (e) => {
        console.log(tshirtColor.value)
        document.getElementById("tshirt-backgroundpicture").style.backgroundColor = tshirtColor.value
    })


    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const overlay = document.getElementById('overlay')
    const closeModalButtons = document.querySelectorAll('[data-close-button]')


   
    function openModal(modal){
        if(modal==null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal){
        if(modal==null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    overlay.addEventListener('click',()=>{
        const modal = document.querySelector('.model.active')
        closeModal(modal)
        })
    

    openModalButtons.forEach(button=>{
        button.addEventListener('click', ()=>{
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })

    closeModalButtons.forEach(button=>{
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const modal = button.closest('.model')
            closeModal(modal)

        })
        
    })


    let tshirtForm = document.getElementById("tshirtForm")
    tshirtForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let size = document.getElementById("tshirt-size").value
        let color = document.getElementById("tshirt-color").value

        let node = document.getElementById('tshirt-div');
        let img_src=""

        domtoimage.toPng(node)
            .then(dataUrl => {
                img_src = dataUrl
                })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        
        // pop up userform
        const modal = document.getElementById('model')
        openModal(modal)

    
        
        let userForm = document.getElementById('userForm')

        userForm.addEventListener('submit', userFormSubmission)

        function userFormSubmission(e) {
            e.preventDefault()
            closeModal(modal)
            
            let email = document.getElementById('email').value

            let userformData = {
                email: email,
                tshirts_attributes: {
                    size: size,
                    color: color,
                    img_src: img_src
                }
            }

            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userformData)
            };

            fetch(`${BASE_URL}/users`, configObj)
                .then(resp=>resp.json())
                .then(json=>confirmSaved(json));

            function confirmSaved(json){
                let div = document.createElement('div')
                div.classList.add('model')
                let body = document.querySelector('body')
                

                div.innerHTML = 
                `
                <div class="model-header">
                    <div class="title">Hi ${json.email} <br>
                    Your image is saved! <br>
                    Click here to see all your Tshirt</div>
                    <button data-close-button class='close-button' id='button-1'>&times;</button>
                </div>
                

                `

                body.appendChild(div)
                openModal(div)
                let button = document.getElementById('button-1')
                button.addEventListener('click',(e)=>{
                    e.preventDefault()
                    div.classList.remove('active')
                    overlay.classList.remove('active')
                    
                }
                )
        
            }

        }

    })

    let gallaryButton = document.getElementById('gallary')
    gallaryButton.addEventListener('click', ()=>{
        fetchTshirts()
        let gallary_container = document.getElementById('gallary_container')
        gallary_container.classList.add('active')
        overlay.classList.add('active')
    
        // document.addEventListener('click',()=>{
    
        //     gallary_container.classList.remove('active')
        //     overlay.classList.remove('active')
          

        // })
    
    })

    function fetchTshirts(){
        fetch(`${BASE_URL}/tshirts`)
        .then(resp=>resp.json())
        .then(json=>displayTshirts(json))
    }

    function displayTshirts(json){
        for(const t of json){
            let tshirt = new Tshirt(t.size, t.color, t.img_src, t.user_id)
            tshirt.displayTshirt()
        }
    }

    



    // const openModalButton = document.querySelector('[data-modal-target]')
    //     const closeModalButton = document.querySelector('[data-close-button]')
    //     const overlay = document.getElementById('overlay')

    //     openModalButton.addEventListener('click',()=>{
    //         const modal = document.querySelector(button.dataset.modalTarget)
    //         openModal(modal)
    //     })

    //     closeModalButton.addEventListener('click',()=>{
    //         const modal = closeModalButton.closest('.model')
    //         closeModal(modal)
    //     })

    //     function openModal(modal){
    //         if(modal == null) return
    //         modal.classList.add('active')
    //         overlay.classList.add('active')
    //     }

    //     function closeModal(modal){
    //         if(modal==null)return
    //         modal.classList.remove('active')
    //         overlay.classList.remove('active')
    //     }





    // let mousePressed = false
    // canvas.on('mouse:move',(event)=>{

    // })

    // canvas.on('mouse:down',(event)=>{
    //     console.log('press the mouse')

    // })

    // canvas.on('mouse:up',(event)=>{
    //     console.log("release")

    // })



})

