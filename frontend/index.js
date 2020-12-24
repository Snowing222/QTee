document.addEventListener('DOMContentLoaded', () => {
    //create canvas
    const initCanvas = (id) => {
        return new fabric.Canvas(id, {
            width: 355,
            height: 700,
        })
    }



    const canvas = initCanvas('canvas')
    canvas.renderAll()  
    
    let button1 = document.querySelector('#selectSizeandColorButton>a')
    let button2 = document.querySelector('#designTshirtButton')
    button1.addEventListener('click',(e)=>{
        e.preventDefault()
        let divs = document.querySelectorAll('.controls.selectTshirt.hidden')
        divs.forEach((div)=>{
            div.classList.remove('hidden')
        })

      
        button2.classList.remove('hidden')  
    })

    button2.addEventListener('click',(e)=>{
        e.preventDefault()
        let divs = document.querySelectorAll('.controls.designTshirt.hidden')
        divs.forEach((div)=>{
            div.classList.remove('hidden')
        })
        
    })

    //edit tshirt color
    let tshirtColor = document.getElementById("tshirt-color")
    tshirtColor.addEventListener('change', (e) => {
        document.getElementById("tshirt-backgroundpicture").style.backgroundColor = tshirtColor.value
    })


    //add textbox/font function
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

    // observers = []
    // fonts.forEach(font => {
    //     let obs = new FontFaceObserver(font)
    //     observers.push(obs.load())
    // })


    // Promise.all(observers)
    // .then(function(fonts) {
    //     fonts.forEach(function(font) {
    //       console.log(font + 'loaded');
    //     });
    //   })
    //   .catch(function(err) {
    //     console.warn('Some critical font are not available:', err);
    //   });

    document.getElementById('addTextButton').addEventListener('click', addTextBox)

    function addTextBox() {
        let textbox = new fabric.Textbox('Lorum ipsum dolor sit amet', {
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
                textbox.set('fontFamily', e.target.value)
                canvas.requestRenderAll()
            }
        })

    }

    let color = "#000000"
    let activeObject = ""
    document.getElementById('colorPicker').addEventListener('change',pickColor)

    function pickColor(e){
        color = e.target.value
        activeObject = canvas.getActiveObject()
        console.log(activeObject, activeObject.fill,activeObject.stroke)
        if(activeObject.fill===null){
            activeObject.set('stroke', color)
        }else{
           
            activeObject.set('fill', color)
        }
        canvas.renderAll()
    }



    document.getElementById('drawbutton').addEventListener('click', toggleMode)

    function toggleMode(e) {
        if (e.target.innerText === "Switch To Drawing Mode") {
            canvas.isDrawingMode = true
            canvas.freeDrawingBrush.width = 10
            e.target.innerText = "Drawing Mode"

        } else {
            canvas.isDrawingMode = false
            e.target.innerText = "Switch To Dawing Mode"
        }
    }

    //add shapes
    document.getElementById('addShape').addEventListener('click', (e) => {
        document.querySelector('p.hidden.shape').classList.remove('hidden')

    })

    document.querySelector('button.btn.circle').addEventListener('click', () => {
        let circle = new fabric.Circle({
            radius: 40,
            left: 50,
            top: 50,
            fill: 'rgb(0,255,0)',
            opacity: 0.5
        })
        canvas.add(circle).setActiveObject(circle);
    })

    document.querySelector('button.btn.triangle').addEventListener('click', () => {
        let triangle = new fabric.Triangle({
            width: 50,
            height: 40,
            fill: 'blue',
            left: 50,
            top: 50
        })
        canvas.add(triangle).setActiveObject(triangle);
    })

    document.querySelector('button.btn.rect').addEventListener('click', () => {
        let rect = new fabric.Rect({
            width: 50,
            height: 50,
            left: 50,
            top: 50,
            fill: 'rgb(255,0,0)'
        })
        canvas.add(rect).setActiveObject(rec);
    })

    let clearCanvasButton = document.getElementById('clearcanvas')
    clearCanvasButton.addEventListener('click', (e)=>{
        e.preventDefault()
        canvas.clear()

    })

    let gallaryButton = document.getElementById('gallary')
    gallaryButton.addEventListener('click', () => {
        fetchTshirts()
        let gallary_container = document.getElementById('gallary_container')
        openModal(gallary_container)

        gallary_container.addEventListener('click', () => {
            gallary_container.classList.remove('active')
            overlay.classList.remove('active')
        })

    })

    function fetchTshirts() {
        fetch('http://localhost:3000/tshirts')
            .then(resp => resp.json())
            .then(json => displayTshirts(json))
    }

    function displayTshirts(json) {
        for (const t of json) {
            let tshirt = new Tshirt(t.size, t.color, t.img_src, t.user_id)
            tshirt.displayTshirt()
        }
    }



    //submit Tshirt Form
    const overlay = document.getElementById('overlay')

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    overlay.addEventListener('click', () => {
        const modal = document.querySelector('.model.active')
        closeModal(modal)
    })


    let tshirtForm = document.getElementById("tshirtForm")
    tshirtForm.addEventListener('submit', (e) => {
        e.preventDefault()

        //save tshirt data
        canvas.discardActiveObject().renderAll();


        let size = document.getElementById("tshirt-size").value
        let color = document.getElementById("tshirt-color").value

        let node = document.getElementById('tshirt-div');
        let img_src = ""

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
        const closeModalButton = document.querySelector('[data-close-button]')
        closeModalButton.addEventListener('click', (e) => {
            e.preventDefault()
            closeModal(modal)

        })

        //submit userform=> save tshirt and user(if not exist) to backend

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

            fetch('http://localhost:3000/users', configObj)
                .then(resp => resp.json())
                .then(json => confirmSaved(json));

            function confirmSaved(json) {
                let div = document.createElement('div')
                div.classList.add('model')
                let body = document.querySelector('body')


                div.innerHTML =
                    `
                <div class="model-header">
                    <div class="title">Hi ${json.user_email} <br>
                       Your Tshirt is saved! <br>
                       <img src = ${json.tshirt_img} width = '308px' height='358px'>
                       <div class = "tshirt_info">
                         <p> size: ${json.tshirt_size}</p>
                         <p> color: ${json.tshirt_color}</p>
                       </div>
                    </div>
                    <button data-close-button class='close-button' id='button-1'>&times;</button>
                </div>
                
                `

                body.appendChild(div)
                openModal(div)
                let button = document.getElementById('button-1')
                button.addEventListener('click', (e) => {
                    e.preventDefault()
                    closeModal(div)
                    window.location.reload()

                }
                )

            }

        }

    })


})












    // let mousePressed = false
    // canvas.on('mouse:move',(event)=>{

    // })

    // canvas.on('mouse:down',(event)=>{
    //     console.log('press the mouse')

    // })

    // canvas.on('mouse:up',(event)=>{
    //     console.log("release")

    // })



