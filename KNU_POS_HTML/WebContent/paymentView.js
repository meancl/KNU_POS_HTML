async function printPayments() {
   let branchId = Number(localStorage.getItem('branchId'));
   let payments = await getPayments(branchId);

   document.getElementById("dbConData").innerHTML = "";
   

   for (let i = 0; i < payments.length; i++) {
      let innerHtmlText = "";
      innerHtmlText += `
      <div class="col-md-6 col-lg-3" style="padding : 10px 10px;position:relative;border:1px solid black;margin: 15px 10px;width:280px; background : #d3d3d373">
                        <div style="width:280px; height:300px;">
                        <h1  style="text-align:left; vertical-align: top;"> #${i}</h1>
                           <div class="full counter_section margin_bottom_30">
                              <div class="couter_icon">
                                 <div> 
                                    <i class="fa fa-star yellow_color"></i>
                                 </div>
                              </div>
                              <div class="counter_no">
                                 <div class="Right">
			`;
      for (let orderId = 0; orderId < payments[i].orderDetailDtos.length; orderId++) {
         innerHtmlText += `<p>* ${payments[i].orderDetailDtos[orderId].catalogue.name}(${payments[i].orderDetailDtos[orderId].catalogue.price}(원)) x ${payments[i].orderDetailDtos[orderId].quantity}</p>`;
      }
      innerHtmlText += `</div>
               </div>
            </div>
         </br></br><div style="position: absolute;bottom: 8px;right: 10px;font-weight:bold">총가격 : ${payments[i].totalPrice}</div>
         </div>
      </div> `;

      document.getElementById("dbConData").innerHTML += innerHtmlText;
   }
}

async function getPayments(branchId) {
   let payments = [];
   const stock = await fetch(
      `http://localhost:8080/api/v1/branch/${branchId}/payments`)
      .then((response) => response.json())
      .then(response => {
         payments = response;
      });
   return payments;
}


function subtractDays(numOfDays, date = new Date()) {
   date.setDate(date.getDate() - numOfDays);

   return date;
 }
 

function init() {
   document.getElementById('branchID').innerText = localStorage.getItem('branchId') + "번 매장";
}