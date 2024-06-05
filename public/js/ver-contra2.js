let flag = true;
function pass1() {
    if(flag) {
        let icon = document.querySelector(".bx");
        document.getElementById("contra3").type = "password";
        icon.classList.remove("bx-show-alt")
        icon.classList.add("bxs-hide")
        flag = false;
    }else {
        let icon = document.querySelector(".bx");
        document.getElementById("contra3").type = "text";
        icon.classList.remove("bxs-hide")
        icon.classList.add("bx-show-alt")
        flag = true;
    }
}
