// table를 id 값으로 불러와준다
const table = document.getElementById("menuTable");

// main에서 클릭한 테이블의 이름을 가져와서 변수에 저장한다.
const temp = location.href.split("?");
const tableName = temp[1];

//누른 테이블의 이름을 적는다
const tableTitle = document.getElementById('tableName');
tableTitle.textContent = tableName;

// 순번을 정하기 위한 order과 총 가격을 저장할 sum , 이 모든 정보를 저장한 객체 menu_list를 만든다.
let order = 1;
var sum = 0;
const menuList = [];


// localStorage에 있는 값을 가져와서 안에 값이 있는지 확인
let outPut = localStorage.getItem(tableName); //Table1_menu_list
//console.log("db이름 : "+tableName);
if (outPut != null) {
    write();
}



//const basket = {}; // 주문 정보를 담고있는 딕셔너리


function parseNumberAndPrice(str) {
    return str.substring(0, str.indexOf('('));
}

function menu_click(menuName) {
    // (요리 이름, 요리 가격)에서 , 기준으로 나누기
    let menuTotal = document.getElementById(menuName).textContent.trim();
    let menu = menuTotal.split('\n');
    // sum에 가격을 number형으로 만들어서 더하기
    //sum += Number(menu[1]);

    // tabel menu의 table에  열 값 추가
    //alert(menu[0].trim());


    let menu_name = menu[0].trim();
    let number = Number(parseNumberAndPrice(menu[1]));
    let price = Number(parseNumberAndPrice(menu[2]));

    if (number == 0) // 상품이 없어
    {
        alert(menu_name + "상품은 매진됐습니다.");
    }
    else {
        if (basket.hasOwnProperty(menu_name)) // 데이터가 있다면
        {
            if (basket[menu_name].num >= inventoryDict[menu_name].quant) {
                basketTotalPrice -= price;
                alert(menu_name + "상품은 더 이상 선택할 수 없습니다.");
            }
            else {
                basket[menu_name] = {
                    num: basket[menu_name].num + 1,
                    name: menu_name,
                    price: price,
                    id: inventoryDict[menu_name].catalogId
                };
            }
        }
        else // 처음 클릭한거라면 ( 매진 대비 )
        {
            basketId++;
            basket[menu_name] = {
                num: 1,
                name: menu_name,
                price: price,
                id: inventoryDict[menu_name].catalogId
            };

        }

        basketTotalPrice += price;
    }
    document.getElementById("menuTable").innerHTML = "";
    updateTable();

}


// 테이블을 업데이트해준다.
function updateTable() {

    let i = 1;
    for (var key in basket) {
        let row = `<tr align="center">
    <td>${i++}</td>
    <td>${basket[key].name}</td>
    <td>${basket[key].num}</td>
    <td>${basket[key].price}원</td> 
    </tr>`
        document.getElementById("menuTable").innerHTML += row;
    }

    document.getElementById("sum").innerText = "   :  " + basketTotalPrice + "(원)";
}




//주문 초기화 누를시 내용 초기화 
function reset() {
    document.getElementById("menuTable").innerHTML = "";
    document.getElementById("sum").innerText = "";
    basketTotalPrice = 0;
    basket = {};
    // sum = 0;
    // localStorage.removeItem(tableName);
}


//주문 완료 버튼 누를 시 안에 내용과 초기화 
function complete() {

    orderRequest();

    reset();

    // let tableAreaName = tableName + "List";
    // console.log("컴플리트 버튼 활성화 됨");

    // url = encodeURI = "main.html?" + 1 + "?" + tableAreaName + "?" + tableName;
    // location.href = url;
    // console.log(url);
}

// basket 구조에서 catalouge id와 quantity만 추출한다.
function extractOrderDetails() {
    let orderDetails = [];
    for (let r in basket) {
        orderDetails.push({
            catalogueId: basket[r].id,
            quantity: basket[r].num
        });
    }
    return orderDetails;
}

// 백엔드 api에 주문요청
function orderRequest() {

    let orderDetails = extractOrderDetails(basket);
    if (Object.keys(basket).length == 0) {
        alert("주문한 상품이 존재하지 않습니다.");
    }
    else {
        const stock = fetch(
            `http://localhost:8080/api/v1/payment/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                branchId: branchId,
                orderDetails: orderDetails
            })
        }).then((response) => response.json())
            .then(response => {
                if (response?.totalPrice) {
                    alert('주문 정상확인됐습니다.');
                    updateInventories();
                }
                else {
                    alert('주문에 실패하였습니다.');
                }
            })
            .catch((error) => console.log('orderRequest() error : ' + error));
    }
}

// 재고를 출력해오는 펑션
// 현재 interface 
function printInventories() {

    let inventories = document.getElementById("inventories");
    inventories.innerHTML = ""; // 초기화
    let count = 0;
    for (let inventoryName in inventoryDict) {
        inventories.innerHTML += `
        <div class="col-md-6 col-lg-3" style="padding : 10px 10px">
                        <button class="button" style="width:280px; height:300px" id="bread${count++}" onclick="menu_click(this.id)">
                           <div class="full counter_section margin_bottom_30">
                              <div class="couter_icon">
                                 <div> 
                                    <i class="fa fa-star yellow_color"></i>
                                 </div>
                              </div>
                              <div class="counter_no">
                                 <div class="Right">
                                    <p class="total_no">${inventoryName}</p>
                                    <p>${inventoryDict[inventoryName].quant}(개)</p>
                                    <p class="head_couter">${inventoryDict[inventoryName].price}(원)</p>
                                 </div>
                              </div>
                           </div>
                        </button>
                        </div>
        ` ;
    }
}

// 백엔드 해당브랜치의 인벤토리를 얻어온다.
function updateInventories() {
    inventoryDict = {}; // 초기화
    // get 작업
    const stock = fetch(
        `http://localhost:8080/api/v1/branch/${branchId}/inventories`)
        .then((response) => response.json())
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                inventoryDict[response[i].name] = {
                    catalogId: response[i].catalogueId,
                    price: response[i].price,
                    quant: response[i].stock
                };
            }
            printInventories();
        });

}

function init() {
    branchId = Number(localStorage.getItem('branchId'));
    document.getElementById('storeId').innerText = branchId + '번 매장';
    updateInventories();
}