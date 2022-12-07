// 품목별 통계를 출력한다.
async function showStatisticItem() {
    clearStatisticResult();
    // statisticItemResult = await getStatisticByItems();
    addStatisticResultHTMLMessage(
        `<h1>품목별 통계</h1>*`
    );
}


// 지점별 통계를 출력한다.
async function showStatisticBranch() {
    clearStatisticResult();
    // statisticBranchResult = await getStatisticByBranches();
    addStatisticResultHTMLMessage(
        `<h1>지점별 통계</h1>*`
    );
}

function clearStatisticResult() {
    document.getElementById('statisticResult').innerHTML = "";
}

function addStatisticResultHTMLMessage(htmlMessage) {
    document.getElementById('statisticResult').innerHTML += htmlMessage;
}

async function getStatisticByItem() {
    let startDate = document.getElementById("start");
    let endDate = document.getElementById("end");
    const stock = await fetch(
        `http://localhost:8080/api/v1/admin/sales/categories?begin=${startDate}&end=${endDate}`)
        .then((response) => response.json())
        .then(response => {
            statisticItemResult = response;
        });
    return statisticItemResult;
}

async function getStatisticByBranches() {
    let startDate = document.getElementById("start");
    let endDate = document.getElementById("end");
    const stock = await fetch(branches
        `http://localhost:8080/api/v1/admin/sales/branches?begin=${startDate}&end=${endDate}`)
        .then((response) => response.json())
        .then(response => {
            statisticBranchResult = response;
        });
    return statisticBranchResult;
}