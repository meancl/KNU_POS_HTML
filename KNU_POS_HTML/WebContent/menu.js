// table를 id 값으로 불러와준다
const table = document.getElementById("menuTable");

// main에서 클릭한 테이블의 이름을 가져와서 변수에 저장한다.
const temp = location.href.split("?"); 
const tableName = temp[1];

//누른 테이블의 이름을 적는다
const tableTitle = document.getElementById('tableName');
tableTitle.textContent = tableName;

// 순번을 정하기 위한 order과 총 가격을 저장할 sum , 이 모든 정보를 저장한 객체 menu_list를 만든다.
let order =1;
var sum =0;
const menuList = [];
let totalPriceview = document.getElementById("sum");


// localStorage에 있는 값을 가져와서 안에 값이 있는지 확인
let outPut = localStorage.getItem(tableName); //Table1_menu_list
//console.log("db이름 : "+tableName);
if(outPut!=null){
    write();
}
 

function menu_click(menuName){
    // (요리 이름, 요리 가격)에서 , 기준으로 나누기
    let menu = document.getElementById(menuName).textContent.split("￦")
    // sum에 가격을 number형으로 만들어서 더하기
    //sum += Number(menu[1]);
    
    // tabel menu의 table에  열 값 추가
    let row = `<tr align="center">
                <td> </td> 
                <td>${menu[0]}</td>
                <td>1</td>
                <td>${menu[1]}원</td> 
                </tr>`       
    table.innerHTML += row;

    //menu_list에 값 저장
    menuList.push({'order' : order , 'menuName' : menu[0], 'count' : '1', 'price' : menu[1]})

    //menu_list 값을 localStorage에 저장
    order ++;
    totalPriceview.value=sum;
    localStorage.setItem(tableName,JSON.stringify(menuList));
    
}



//주문 초기화 누를시 내용 초기화 
function reset(){
    let table = document.getElementById("menuTable");
    table.innerHTML ="";
    totalPriceview.value =0;
    sum =0;
    localStorage.removeItem(tableName);
}


//주문 완료 버튼 누를 시 안에 내용과 초기화 
function complete(){
 
    let tableAreaName =tableName+"List";
    console.log("컴플리트 버튼 활성화 됨");
    
    url =encodeURI ="main.html?"+1+"?"+tableAreaName+"?"+tableName;
    location.href=url;
    console.log(url);
}


// localStorege에 있는 정보를 메뉴테이블에 쓴다.

function write(){
  
    let outPutList = JSON.parse(outPut);
    for(let i=0 ; i<outPutList.length ; i++){

        let row = `<tr align="center">
                <td>${outPutList[i].order}</td>
                <td>${outPutList[i].menuName}</td>
                <td>1</td>
                <td>${outPutList[i].price}원</td> 
                </tr>`       
        table.innerHTML += row;

    }

}