let flag = true;
function pass() {
    if(flag) {
        document.getElementById("contra").type = "password";
        document.getElementById("contra2").type = "password";
        flag = false;
    }else {
        document.getElementById("contra").type = "text";
        document.getElementById("contra2").type = "text";
        flag = true;
    }
}

