
function loginRequest() {
    let userid = document.getElementById("loginId").value;
    let userpw = document.getElementById("loginPw").value;

    const stock = fetch(
        `http://localhost:8080/api/v1/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userid,
            password: userpw
        }),
    }).then((response) => response.json())
        .then(response => {
            console.log(response);
            if (response?.login) {
                redirectByUserAuth(response.branchId);
            }
            else {
                alert('로그인 정보가 없습니다');
            }
        })
        .catch((error) => console.log('loginRequest() error : ' + error));



}

// 2022-12-06
// 필요인자 isLogin, branchId
// 현재인자 branchId
// isLogin이 들어온다면 관리자로 가는 분기문도 생성가능
// branchId != null ?  
function redirectByUserAuth(branchId) {
    if (branchId) {
        localStorage.setItem('branchId', branchId);
        window.location.replace('http://localhost:5501/WebContent/menu.html');
    }
    else {
        window.location.replace('http://localhost:5501/WebContent/admin.html');
    }
}


// 2022-12-06 
// 회원가입 등록하기 버튼 handler
// 입력된 아이디와 비밀번호를 api user create 호출한다.
// 성공/실패 메시지를 alert하고 modal id/pw 칸을 비운다.
function registerRequest() {
    let regName = document.getElementById("regName").value;
    let regMail = document.getElementById("regMail").value;
    let regPw = document.getElementById("regPw").value;
    let regAuth = document.getElementById("regAuth").value;
    let regBranchName = document.getElementById("regBranchName").value;


    let url = `http://localhost:8080/api/v1/user/`;

    stock = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: regName,
            email: regMail,
            password: regPw,
            role: regAuth,
            branchName: regBranchName

        }),
    })
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            document.getElementById("regBranchName").value = "";
            document.getElementById("regPw").value = "";
            document.getElementById("regAuth").value = "";
            document.getElementById("regMail").value = "";
            document.getElementById("regName").value = "";
            doAfterCreateTable(response);
        })
        .catch((error) => { 
            console.log('registerRequest() error : ' + error);
        });
}

function doAfterCreateTable(response) {
    if (response?.id) {
        alert('Success');
    }
    else {
        alert('Fail');
    }
}