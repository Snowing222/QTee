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
        const model = document.getElementById('model')
        const overlay = document.getElementById('overlay')
        const closeButton = document.querySelector('[data-close-button]')


        model.classList.add('active')
        overlay.classList.add('active')

        // add eventlistener to close userform

        closeButton.addEventListener('click', (e) => {
            e.preventDefault()
            model.classList.remove('active')
            overlay.classList.remove('active')

        })
        // below doesnt work also

        // let p = document.createElement('p').innerHTML='whyyyy???'

        // document.getElementById("model").appendChild(p)

        let userForm = document.getElementById('userForm')

        userForm.addEventListener('submit', userFormSubmission)

        function userFormSubmission(e) {
            e.preventDefault()
            let email = document.getElementById('email').value

            let userformData = {
                email: email,
                tshirt: {
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
                .then(function (response) {
                    return response.json();
                })
                .then(function (object) {
                    console.log(object);
                });

        }

    })



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

