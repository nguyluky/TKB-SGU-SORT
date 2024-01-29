var body = document.querySelector("body");
var sidebar = body.querySelector(".sidebar");
var iconarrow = body.querySelector(".iconarrow");

iconarrow.addEventListener("click", () =>{
        sidebar.classList.toggle('close');
});