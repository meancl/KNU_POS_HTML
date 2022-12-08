// 품목별 통계를 출력한다.
async function showStatisticItem() {
    clearStatisticResult();
    statisticItemResult = await getStatisticByItems();
    addStatisticResultHTMLMessage(
        `<h1>품목별 통계</h1>`
    );
    for(let i = 0 ;i < statisticItemResult.length; i++){
        addStatisticResultHTMLMessage(
            `<h2>*${statisticItemResult[i].name}  총판매금액 : ${statisticItemResult[i].totalSales}(원)</h2>`
            );
    }
}


// 지점별 통계를 출력한다.
async function showStatisticBranch() {
    clearStatisticResult();
    statisticBranchResult = await getStatisticByBranches();
    addStatisticResultHTMLMessage(
        `<h1>지점별 통계</h1>`
    );
    for(let i = 0 ;i < statisticBranchResult.length; i++){
        addStatisticResultHTMLMessage(
            `<h2>*${statisticBranchResult[i].name}  총판매금액 : ${statisticBranchResult[i].totalSales}(원)</h2>`
            );
    }
}

function clearStatisticResult() {
    document.getElementById('statisticResult').innerHTML = "";
}

function addStatisticResultHTMLMessage(htmlMessage) {
    document.getElementById('statisticResult').innerHTML += htmlMessage;
}

async function getStatisticByItems() {
    let startDate = document.getElementById("start").value;
    let endDate = document.getElementById("end").value;
    const stock = await fetch(
        `http://localhost:8080/api/v1/admin/sales/catalogues?begin=${startDate}&end=${endDate}`)
        .then((response) => response.json())
        .then(response => {
            statisticItemResult = response;
        });
    return statisticItemResult;
}

async function getStatisticByBranches() {
    let startDate = document.getElementById("start").value;
    let endDate = document.getElementById("end").value;
    const stock = await fetch(
        `http://localhost:8080/api/v1/admin/sales/branches?begin=${startDate}&end=${endDate}`)
        .then((response) => response.json())
        .then(response => {
            statisticBranchResult = response;
        });
    return statisticBranchResult;
}