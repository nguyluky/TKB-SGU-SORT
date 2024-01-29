body = document.querySelector("body");
sidebar = body.querySelector(".sidebar");
iconarrow = body.querySelector(".iconarrow");

iconarrow.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
});