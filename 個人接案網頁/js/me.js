const projects = [
  {
    title: "自我介紹頁",
    desc: "使用 HTML 與 CSS 製作的個人介紹頁面。",
    link: "#",
    type: "html"
  },
  {
    title: "股票網站",
    desc: "練習搜尋、分類與卡片顯示的前端作品。",
    link: "#",
    type: "javascript"
  },
  {
    title: "CSS 筆記網站",
    desc: "整理 CSS 學習內容的筆記型網站。",
    link: "#",
    type: "html"
  }
];
const cardList = document.querySelector(".card-list");
function renderProjects(data) {
  const html = data.map(function (project) {
    return `
    <div class="card">
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <a href="${project.link}">查看作品</a>
    </div>
    `
  });
  cardList.innerHTML = html.join("");
}

renderProjects(projects);
const buttonAll = document.querySelector(".filter-all")

buttonAll.addEventListener("click", function () {
  currentType = "all"
  setActive(buttonAll);
  updateView();
})

const buttonHtml = document.querySelector(".filter-html");
const buttonJs = document.querySelector(".filter-js");

buttonHtml.addEventListener("click", function () {
  currentType = "html"
  setActive(buttonHtml);
  updateView();
});

buttonJs.addEventListener("click", function () {
  currentType = "javascript"
  setActive(buttonJs);
  

  updateView();
});

function setActive(button) {
  const buttons = document.querySelectorAll(".filter-btn")
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  button.classList.add("active");
}
let currentType = "all";
const input = document.querySelector(".search-input")
input.addEventListener("input",function(){
  updateView();
})
function updateView() {
  let result = projects;
  const keyword = input.value.trim();

  if (currentType !== "all") {
    result = result.filter(function(project) {
      return project.type === currentType;
    });
  }

  result = result.filter(function(project) {
    return project.title.includes(keyword) || project.desc.includes(keyword);
  });

  renderProjects(result);
}
