
const stocks = [
    { name: "台積電", code: "2330", price: 600, change: "+10 (+1.2%)", type: "半導體" },
{ name: "鴻海", code: "2317", price: 200, change: "-5 (-0.8%)", type: "電子" },
{ name: "聯發科", code: "2454", price: 1000, change: "+15 (+1.5%)", type: "半導體" },
{ name: "富邦金", code: "2881", price: 88, change: "-2 (-0.5%)", type: "金融" }
];
const list = document.querySelector(".stock-left");
const right = document.querySelector(".stock-right");
let sort = ""
let currentType = "all";
let favorite = [];
function renderStocks(data) {

    const html = data.map(function (item) {

        let color = item.change.startsWith("+") ? "up" : "down";

        return `
      <div class="stock-item">
        <div class="stock-info">
          <h3>${item.name}</h3>
          <p>${item.code}</p>
        </div>
        <div class="stock-data">
          <p>${item.price}</p>
          <p class="${color}">${item.change}</p>
        </div>
        <button onclick="stockPush('${item.code}')">加入自選</button>
      </div>
    `;
    });

    list.innerHTML = html.join("");
}
function renderFavorite() {
    if (favorite.length === 0) {
        right.innerHTML = "<p>還沒有自選股</p>";
        return;
    }
    const html = favorite.map(function (item, index) {
        let color = "";

        if (item.change.startsWith("+")) {
            color = "up";
        } else {
            color = "down";
        }

        return `
      <div class="stock-item">
        <div class="stock-info">
          <h3>${item.name}</h3>
          <p>${item.code}</p>
        </div>
        <div class="stock-data">
          <p>${item.price}</p>
          <p class="${color}">${item.change}</p>
        </div>
        <button onclick="stockDel(${index})">刪除</button>
      </div>
    `;
    });

    right.innerHTML = html.join("");
}
const input = document.querySelector(".stock-input");
const select=document.getElementById("stock-select");
select.addEventListener("change",function(){
    currentType=select.value;
    updateView();
})
function updateView() {
    let keyword = input.value.trim();

    const result = stocks.filter(function (item) {
        return ((currentType==="all"||item.type===currentType)&&
            (keyword === "" ||item.name.includes(keyword) ||item.code.includes(keyword))
        );
    });
    if (sort === "change") {
        result.sort(function (a, b) {
            let numA = parseFloat(a.change);
            let numB = parseFloat(b.change);

            return numB - numA;
        })
    }
    if (sort === "price") {
        result.sort(function (a, b) {
            return b.price - a.price
        })
    }

    if (result.length === 0) {
        list.innerHTML = `<p>沒有這筆資料</p>`;
    } else {
        renderStocks(result);
    }

}


input.addEventListener("input", function () {
    updateView();
});


const data = localStorage.getItem("favorite");

if (data) {
    favorite = JSON.parse(data);
    renderFavorite();
}

renderFavorite();

function stockPush(code) {
    const stock = stocks.find(function (item) {
        return item.code === code;
    });

    if(!stock) return;

    const exists = favorite.some(function (item) {
        return item.code === stock.code;
    });

    if (exists) {
        alert("這支股票已經在自選股了");
        return;
    }

    favorite.push(stock);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    renderFavorite();
}
function stockDel(index) {
    favorite.splice(index, 1)
    localStorage.setItem("favorite", JSON.stringify(favorite));
    renderFavorite();
}
const changeUp = document.querySelector(".changeUp")
const priceUp = document.querySelector(".priceUp")

changeUp.addEventListener("click", function () {
    sort = "change"

    changeUp.classList.add("active");
    priceUp.classList.remove("active");
    updateView();
})
priceUp.addEventListener("click", function () {
    sort = "price"
    priceUp.classList.add("active");
    changeUp.classList.remove("active");
    updateView()
})



renderStocks(stocks);