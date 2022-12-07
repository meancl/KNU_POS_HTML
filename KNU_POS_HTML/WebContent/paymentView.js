function addButton(){
    bodyPart.innerHTML += `
    <div class="col-md-6 col-lg-3">
    <button class="button" id="dan" style="height:500px;width:120px>
    <div class="">
       <div class="">
          <div> 
             <i class=""></i>
          </div>
       </div>
       <div class="">
          <div>
             <p class="name">${tmpStockInfo[number].name}</p>
             <p class="quant">${tmpStockInfo[number].quant}</p>
             <p class="price">${tmpStockInfo[number].price}</p>
          </div>
       </div>
    </div>
    </button>
    </div>
    `
 number++;
}