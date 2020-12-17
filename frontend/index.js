const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 355,
        height: 700,
        backgroundColor: 'pink'
    })
}

const canvas = initCanvas('canvas')
canvas.renderAll()

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

document.getElementById('addShape').addEventListener('click',(e)=>{
    document.querySelector('p.hidden.shape').classList.remove('hidden')

})

function addCircle(){
    canvas.add(new fabric.Circle({
        radius: 40,
        left: 50,
        top: 50,
        fill: 'rgb(0,255,0)',
        opacity: 0.5
      }));
}

function addRect(){
    canvas.add(new fabric.Rect({
    width: 50,
    height: 50,
    left: 50,
    top: 50,
    fill: 'rgb(255,0,0)'
  }));
}


function addTriangle(){
    canvas.add(new fabric.Triangle({
        width: 50, 
        height: 40, 
        fill: 'blue', 
        left: 50, 
        top: 50
      }));
}

var node = document.getElementById('tshirt-div');

domtoimage.toPng(node).then(function (dataUrl) {
    // Print the data URL of the picture in the Console
    console.log(dataUrl);

    // You can for example to test, add the image at the end of the document
    var img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img);
}).catch(function (error) {
    console.error('oops, something went wrong!', error);
});









let tshirtColor = document.getElementById("tshirt-color")
tshirtColor.addEventListener('change', (e) => {
    console.log(tshirtColor.value)
    document.getElementById("tshirt-backgroundpicture").style.backgroundColor = tshirtColor.value
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