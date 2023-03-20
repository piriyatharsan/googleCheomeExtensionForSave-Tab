let myData = [];
let myLodData = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");


let dataLocalStroage = JSON.parse(localStorage.getItem("myData"));

if (dataLocalStroage) {
  myData = dataLocalStroage;
  render(myData);
}

tabBtn.addEventListener('click',function(){
   chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    myData.push(tabs[0].url)
    localStorage.setItem("myData",JSON.stringify(myData))
    render(myData)
     })
   
})


function render(data) {
    let listItem = "";
    for (let i = 0; i < data.length; i++) {
      listItem += `<li>
          <a href='${data[i]}' target ='_blank'>
          ${data[i]}
          </a>
          </li>
          `;
      console.log(listItem);
    }
    ulEl.innerHTML = listItem;
  }

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myData = [];
  render(myData);
});

inputBtn.addEventListener("click", function () {
  myData.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myData", JSON.stringify(myData));
  render(myData);
  console.log(localStorage.getItem("myData"));
});

