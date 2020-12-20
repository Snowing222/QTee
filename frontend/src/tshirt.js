class Tshirt{
    constructor(size, color, img_src, user_id){
        this.user_id = user_id
        this.size = size
        this.color = color
        this.img_src = img_src     
    }

    displayTshirt(){
        let gallary = document.getElementById('gallary_container')
        gallary.innerHTML +=
        `
        <div class='card'>
        <img src=${this.img_src} id=image${this.id} width='208px' height='258px'>
        </div>
        `
    }

}