class Tshirt{
    constructor(id,size, color, img_src, user_id, likes){
        this.id = id   
        this.user_id = user_id
        this.size = size
        this.color = color
        this.img_src = img_src
        this.likes = likes  
    
    
    }

    

    displayTshirt(){
        let gallary = document.getElementById('gallary_container')
        let div =document.createElement('div')
        div.classList.add('card')
        let img =document.createElement('img')
        img.src  = `${this.img_src}`
        img.id = `image${this.id}`
        img.width = "208"
        img.height = "258"
        let button =document.createElement('button')
        button.classList.add('likeButton')
        button.innerText ="I like it"
        let span = document.createElement('span')
        span.id = `likecount${this.id}`
        span.innerHTML = `${this.likes}likes`
        div.append(img,span,button)
        gallary.appendChild(div)

        button.addEventListener('click',(e)=>{
            e.preventDefault()

            let likes = parseInt(span.innerText.match(/\d+/)[0])+1
            
            let userData = {likes: likes }

            const configObj = {
              method: "PATCH",
              headers:
              {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
          
              body: JSON.stringify(userData)
            }

            fetch(`http://localhost:3000/tshirts/${this.id}`, configObj).then(resp=> resp.json()).then(json=>{
            span.innerText = likes + " likes" 
  })


        })


        
    }

}