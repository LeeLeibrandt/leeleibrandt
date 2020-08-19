//REAL TIME CLOCK
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        };
        return i;
    }
    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        const time = document.getElementById('time');
        m = checkTime(m);
        s = checkTime(s);
        time.innerHTML =
        h + ":" + m + ":" + s;
        var t = setTimeout(startTime, 500);
    }
//////////////////////////////////

//TAB CONTENTS
    function openPage(pageName, elmnt, color) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }

        document.getElementById(pageName).style.display = "block";
        elmnt.style.backgroundColor = color;
    }
    document.getElementById("defaultOpen").click();
//////////////////////////////////
