//   메뉴를 표시할 textarea 아이디 값을 Menu로 부터 가져온다
var temp = decodeURI(location.href).split("?");  //temp : "Main.html?"+1+"?"+table_area_name+"?"+table_name;
// Menu에서 저장한 list 값을 불러온다.

// temp에 저장된 테이블 이름 가져오기 Table번호_list 
var tableAreaId = temp[2];

print_menu();


 //menu.html으로 이동한다.
function go_menu(tableId){
    const content =document.getElementById(tableId).innerText; 
    location.href="menu.html?"+ content; 
}

//메뉴 리스트에 있는 내용을 textarea에 저장한다.
function print_menu(){
    
    for(let a = 1; a<=9 ; a++){
        let tableArea = document.getElementById("Table"+a+"List");
        const outPut = localStorage.getItem("Table"+a);
        const menuList = JSON.parse(outPut);
        if(menuList !=null){
            for (let i=0 ;i<menuList.length ; i++){
                console.log("menu name :"+menuList[i].menuName);
                tableArea.textContent += (menuList[i].menuName +'\n');
            }
        }
      
    }
}