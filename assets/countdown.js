if (typeof Cookie_UP_KT === "undefined") {
    Cookie_UP_KT = {}
    Cookie_UP_KT.setCookie = (cname, cvalue, sec = 120) => {
        var d = new Date();
        d.setTime(d.getTime() + (sec * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    Cookie_UP_KT.getCookie = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    if (!window.jQuery) {
        var script_jquery = document.createElement('script');
        script_jquery.type = 'text/javascript';
        script_jquery.src = "https://code.jquery.com/jquery-2.2.4.min.js";
        script_jquery.onload = kilatech_urgency_pack;
        document.head.appendChild(script_jquery);
    } else {
        kilatech_urgency_pack();
    };

    function kilatech_urgency_pack() {
        kilatech_page = "";
        kilatech_available = false;
        kilatech_tags = "";
        kilatech_sale = false;

        var handlerO = window.location.pathname.split("/").pop();
        var handler = handlerO.split("?")[0];

        if (__st.p == "product") {
            var handlerreq = jQuery.getJSON('/products/' + handler + ".js", (res) => {
                kilatech_page = "product";

                // Check availability
                if (res.available == true) {
                    kilatech_available = true;
                }

                // Check tag
                kilatech_tags = res.tags;

                // Check sale
                for (var i in res.variants) {
                    if (res.variants[i].compare_at_price != null) {
                        if (res.variants[i].price < res.variants[i].compare_at_price) {
                            kilatech_sale = true;
                            break;
                        }
                    }
                }
            });
            handlerreq.always(kt_ur_main_cb);
        } else {
            kilatech_page = "home"
            if (handlerO == "cart") {
                kilatech_page = "cart"
            };
            kt_ur_main_cb();
        }
    }

    function kt_ur_main_cb() {
        // TIMER CONTENT START
        var timer_style = document.createElement('style');
        timer_style.id = "timer_KT_css";
        document.head.appendChild(timer_style);
        
        var timerElement = document.createElement('div');
        timerElement.id = "timer-kt";
        timerElement.innerHTML = `
            <div class="timer-wrapper">
                <span class="timer-message">Limited Time Offer! Hurry up!</span>
                <div class="timer">
                    <span class="time days">00</span>:<span class="time hours">00</span>:<span class="time minutes">10</span>:<span class="time seconds">00</span>
                </div>
            </div>`;
        document.body.appendChild(timerElement);

        // Initialize countdown
        var UP_KT_TOTAL_SEC = 600; // 10 minutes
        setInterval(() => {
            if (UP_KT_TOTAL_SEC >= 0) {
                var hours = Math.floor(UP_KT_TOTAL_SEC / 3600);
                var minutes = Math.floor((UP_KT_TOTAL_SEC % 3600) / 60);
                var seconds = UP_KT_TOTAL_SEC % 60;

                document.querySelector('#timer-kt .hours').textContent = hours.toString().padStart(2, '0');
                document.querySelector('#timer-kt .minutes').textContent = minutes.toString().padStart(2, '0');
                document.querySelector('#timer-kt .seconds').textContent = seconds.toString().padStart(2, '0');

                UP_KT_TOTAL_SEC--;
            }
        }, 1000);
    }
}
