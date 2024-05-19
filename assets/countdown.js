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
        timer_style.innerHTML = ` #timer-kt3{width:100%;clear:both}#timer-kt2.timer-wrapper2{width:100%;line-height:1.5;text-align:center}@media(min-width:750px){#timer-kt2.timer-wrapper2{width:100%;line-height:1.5;clear:both;text-align:center}}#timer-kt.timer-wrapper{display:inline-block;width:100%;text-align:center;max-width:350px}#timer-kt .timer-message{display:inline-block;color:rgba(38,50,87,1.00);font-family:Verdana,Geneva,sans-serif}#timer-kt .timer{display:inline-block}#timer-kt .unit{text-align:center;display:block;color:rgba(0,0,0,1.00);font-family:Arial,Helvetica,sans-serif}#timer-kt .sep{display:inline-block;vertical-align:bottom;border:solid 1px rgba(0,0,0,0);color:rgba(0,0,0,1.00);font-weight:600}#timer-kt .cell{display:inline-block;vertical-align:bottom}#timer-kt .number{position:relative;overflow:hidden}#timer-kt .number .next,#timer-kt .number .now{z-index:0;border-radius:10px;border:solid 1px;color:rgba(233,31,31,1.00);background-color:rgba(245,245,245,1.00);border-color:rgba(221,221,221,1.00);font-family:Arial,Helvetica,sans-serif}#timer-kt.style1 .flip .next{-webkit-animation:slide-next-kt-up .8s ease-in-out both;animation:slide-next-kt-up .8s ease-in-out both}#timer-kt.style1 .flip .now{-webkit-animation:slide-now-kt-up .8s ease-in-out both;animation:slide-now-kt-up .8s ease-in-out both}@-webkit-keyframes slide-next-kt-up{0%{transform:translateY(-100%)}100%{transform:translateY(0)}}@keyframes slide-next-kt-up{0%{transform:translateY(-100%)}100%{transform:translateY(0)}}@-webkit-keyframes slide-now-kt-up{0%{transform:translateY(0)}100%{transform:translateY(100%)}}@keyframes slide-now-kt-up{0%{transform:translateY(0)}100%{transform:translateY(100%)}}#timer-kt.style1 .number .next{position:absolute;transform:translateY(-100%)}#timer-kt.style1 .number .now{position:relative}#timer-kt.style2 .flip .next{-webkit-animation:slide-next-r-kt-up .8s ease-in-out both;animation:slide-next-r-kt-up .8s ease-in-out both}#timer-kt.style2 .flip .now{-webkit-animation:slide-now-r-kt-up .8s ease-in-out both;animation:slide-now-r-kt-up .8s ease-in-out both}@-webkit-keyframes slide-next-r-kt-up{0%{transform:translateY(100%)}100%{transform:translateY(0)}}@keyframes slide-next-r-kt-up{0%{transform:translateY(100%)}100%{transform:translateY(0)}}@-webkit-keyframes slide-now-r-kt-up{0%{transform:translateY(0)}100%{transform:translateY(-100%)}}@keyframes slide-now-r-kt-up{0%{transform:translateY(0)}100%{transform:translateY(-100%)}}#timer-kt.style2 .number .next{position:absolute;transform:translateY(100%)}#timer-kt.style2 .number .now{position:relative}#timer-kt.style3 .flip .now{-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation:flip-kt-up .8s ease-in-out both;animation:flip-kt-up .8s ease-in-out both}@-webkit-keyframes flip-kt-up{0%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg)}70%{opacity:1}99%{-webkit-transform:rotateX(-90deg);transform:rotateX(-90deg)}100%{opacity:0}}@keyframes flip-kt-up{0%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg)}70%{opacity:1}99%{-webkit-transform:rotateX(-90deg);transform:rotateX(-90deg)}100%{opacity:0}}#timer-kt.style3 .number{perspective:300px}#timer-kt.style3 .number .next{position:absolute;z-index:-1}#timer-kt.style3 .number .now{position:relative;z-index:0}#timer-kt.style4 .flip .now{-webkit-animation:slit-out-kt-up .8s ease-in-out both;animation:slit-out-kt-up .8s ease-in-out both}@-webkit-keyframes slit-out-kt-up{0%{-webkit-transform:translateZ(0) rotateY(0);transform:translateZ(0) rotateY(0);opacity:1}54%{-webkit-transform:translateZ(-160px) rotateY(87deg);transform:translateZ(-160px) rotateY(87deg);opacity:1}100%{-webkit-transform:translateZ(-800px) rotateY(90deg);transform:translateZ(-800px) rotateY(90deg);opacity:0}}@keyframes slit-out-kt-up{0%{-webkit-transform:translateZ(0) rotateY(0);transform:translateZ(0) rotateY(0);opacity:1}54%{-webkit-transform:translateZ(-160px) rotateY(87deg);transform:translateZ(-160px) rotateY(87deg);opacity:1}100%{-webkit-transform:translateZ(-800px) rotateY(90deg);transform:translateZ(-800px) rotateY(90deg);opacity:0}}#timer-kt.style4 .number .next{position:absolute}#timer-kt.style4 .number .now{position:relative}.fade-in-UP-KT{-webkit-animation:fade-in-anim-UP-KT 2s cubic-bezier(0.390,0.575,0.565,1.000) both;animation:fade-in-anim-UP-KT 2s cubic-bezier(0.390,0.575,0.565,1.000) both}@-webkit-keyframes fade-in-anim-UP-KT{0%{opacity:0}100%{opacity:1}}@keyframes fade-in-anim-UP-KT{0%{opacity:0}100%{opacity:1}}`;
        configure_UP_style = () => {
            var width = jQuery(".timer-wrapper").width();
            var cardpadding = width * 14 / 1000;
            if (cardpadding > 14) {
                cardpadding = 14;
            }
            if (cardpadding < 3) {
                cardpadding = 4;
            }
            var seppadding = width * 7 / 2000;
            if (cardpadding > 5) {} else {
                seppadding = 0;
            }
            var maxmainfontsize = 16;
            var minmainfontsize = 11;
            var mainfontsize = 0;
            if (width < 200) {
                mainfontsize = minmainfontsize;
            } else if (width < 350) {
                mainfontsize = ((maxmainfontsize - minmainfontsize) * (width - 200) / 150) + minmainfontsize;
            } else {
                mainfontsize = maxmainfontsize
            }
            var maxtextfontsize = 20;
            var mintextfontsize = 12;
            var textfontsize = 0;
            if (width < 200) {
                textfontsize = mintextfontsize;
            } else if (width < 400) {
                textfontsize = ((maxtextfontsize - mintextfontsize) * (width - 200) / 200) + mintextfontsize;
            } else {
                textfontsize = maxtextfontsize
            }
            var maxunitfontsize = 9;
            var minunitfontsize = 8;
            var unitfontsize = 0;
            if (width < 200) {
                unitfontsize = minunitfontsize;
            } else if (width < 400) {
                unitfontsize = ((maxunitfontsize - minunitfontsize) * (width - 200) / 200) + minunitfontsize;
            } else {
                unitfontsize = maxunitfontsize
            }
            jQuery(".number").css({
                "font-size": mainfontsize + 'pt'
            });
            jQuery(".sep").css({
                "font-size": mainfontsize + 'pt'
            });
            jQuery(".unit").css({
                "font-size": unitfontsize + 'pt'
            });
            jQuery(".timer-message").css({
                "font-size": textfontsize + 'pt'
            });
            jQuery(".next").css({
                "padding": '0 ' + cardpadding + 'pt'
            });
            jQuery(".now").css({
                "padding": '0 ' + cardpadding + 'pt'
            });
            jQuery(".sep").css({
                "padding": '0 ' + seppadding + 'pt'
            });
        }
        UP_KT_Doubler = (val) => {
            var new_val_string = "" + val;
            if (val < 10) {
                new_val_string = "0" + val;
            }
            return new_val_string;
        }
        UP_KT_Animate_card = (new_val, old_val, unit) => {
            var new_val_string = UP_KT_Doubler(new_val);
            jQuery("#timer-kt ." + unit + " .next").html(new_val_string);
            if (new_val != old_val) {
                jQuery("#timer-kt ." + unit + " .number").addClass("flip");
                window.setTimeout(() => {
                    jQuery("#timer-kt ." + unit + " .now").html(new_val_string);
                    if (new_val != old_val) {
                        jQuery("#timer-kt ." + unit + " .number").removeClass("flip");
                    }
                }, 800);
            }
        }
        UP_KT_Init_cards = () => {
            var days_now = Math.floor(UP_KT_TOTAL_SEC / (60 * 60 * 24));
            var hrs_now = Math.floor((UP_KT_TOTAL_SEC % (60 * 60 * 24)) / (60 * 60));
            var mins_now = Math.floor((UP_KT_TOTAL_SEC % (60 * 60)) / 60);
            var secs_now = UP_KT_TOTAL_SEC % (60);
            jQuery("#timer-kt .secs .next").html(UP_KT_Doubler(secs_now));
            jQuery("#timer-kt .mins .next").html(UP_KT_Doubler(mins_now));
            jQuery("#timer-kt .hours .next").html(UP_KT_Doubler(hrs_now));
            jQuery("#timer-kt .days .next").html(UP_KT_Doubler(days_now));
            jQuery("#timer-kt .secs .now").html(UP_KT_Doubler(secs_now));
            jQuery("#timer-kt .mins .now").html(UP_KT_Doubler(mins_now));
            jQuery("#timer-kt .hours .now").html(UP_KT_Doubler(hrs_now));
            jQuery("#timer-kt .days .now").html(UP_KT_Doubler(days_now));
        }
        UP_KT_Update_cards = (UP_KT_TOTAL_SEC) => {
            var days_now = Math.floor(UP_KT_TOTAL_SEC / (60 * 60 * 24));
            var hrs_now = Math.floor((UP_KT_TOTAL_SEC % (60 * 60 * 24)) / (60 * 60));
            var mins_now = Math.floor((UP_KT_TOTAL_SEC % (60 * 60)) / 60);
            var secs_now = UP_KT_TOTAL_SEC % (60);
            var UP_KT_TOTAL_SEC_NEXT = UP_KT_TOTAL_SEC - 1;
            var days = Math.floor(UP_KT_TOTAL_SEC_NEXT / (60 * 60 * 24));
            var hrs = Math.floor((UP_KT_TOTAL_SEC_NEXT % (60 * 60 * 24)) / (60 * 60));
            var mins = Math.floor((UP_KT_TOTAL_SEC_NEXT % (60 * 60)) / 60);
            var secs = UP_KT_TOTAL_SEC_NEXT % (60);
            UP_KT_Animate_card(secs, secs_now, "secs");
            UP_KT_Animate_card(mins, mins_now, "mins");
            UP_KT_Animate_card(hrs, hrs_now, "hours");
            UP_KT_Animate_card(days, days_now, "days");
        }
        UP_KT_Timer_start_logic = () => {
            style = document.createElement('link');
            style.id = "CountdownTimerUltimate";
            style.rel = "stylesheet";
            style.href = "https://fonts.googleapis.com/css?family=";
            document.head.appendChild(timer_style);
            var element = "form[action*='/cart/add']";
            element = "div[id*='timer-kt3']";
            jQuery(element).append(`
    <div id="timer-kt2" class="timer-wrapper2">
        <div id="timer-kt" class="timer-wrapper fade-in-UP-KT style1">

            <div class="timer-message">
                Limited Time Offer!
            </div>

            <br/>

            <div class="timer">
                <div class="cell days">
                    <div class="unit">DAYS</div>
                    <div class="number">
                    <div class="next">00</div>
                    <div class="now">00</div>
                    </div>
                </div>

                <div class="sep">:</div>

                <div class="cell hours">
                    <div class="unit">HRS</div>
                    <div class="number">
                    <div class="next">00</div>
                    <div class="now">00</div>
                    </div>
                </div>

                <div class="sep">:</div>

                <div class="cell mins">
                    <div class="unit">MINS</div>
                    <div class="number">
                    <div class="next">00</div>
                    <div class="now">00</div>
                    </div>
                </div>

                <div class="sep">:</div>

                <div class="cell secs">
                    <div class="unit">SECS</div>
                    <div class="number">
                    <div class="next">00</div>
                    <div class="now">00</div>
                    </div>
                </div>
            </div>



        </div>
        <style></style>
<script></script>
    </div>
`);
            jQuery(document).ready(() => {
                var KT_timer_size_setter_counter = 0;
                KT_timer_size_setter = window.setInterval(() => {
                    configure_UP_style();
                    KT_timer_size_setter_counter++;
                    if (KT_timer_size_setter_counter == 12) {
                        window.clearInterval(KT_timer_size_setter);
                    }
                }, 500)
                configure_UP_style();
            });
            jQuery(window).resize(() => {
                configure_UP_style();
            })
            UP_KT_Init_cards();
            window.setInterval(() => {
                if (UP_KT_TOTAL_SEC > 0) {
                    UP_KT_Update_cards(UP_KT_TOTAL_SEC);
                }
                UP_KT_TOTAL_SEC--;
            }, 1000);
        }
        UP_KT_Timer_start = () => {
            var support_url = "https://kilatechapps.com";
            var shop_url = "dermaset.myshopify.com";
            if (kilatech_page == "product") {
                if (kilatech_available == false) {
                    return;
                }
                if ("" != "") {
                    var cancontinue = false;
                    var con = "".toLowerCase();
                    for (var i in kilatech_tags) {
                        if (kilatech_tags[i].toString().toLowerCase() == con) {
                            cancontinue = true;
                            break;
                        }
                    }
                    if (!cancontinue) {
                        return;
                    }
                }
            }
            UP_KT_TOTAL_SEC = 0;
            if (false == true) {
                now_date = new Date();
                start_date = new Date("");
                end_date = new Date("");
                if (now_date - start_date > 0) {
                    UP_KT_TOTAL_SEC = Math.round((end_date - now_date) / 1000);
                    if (UP_KT_TOTAL_SEC < 0) {
                        return;
                    }
                    UP_KT_Timer_start_logic()
                }
                return;
            }
            var req = jQuery.getJSON(support_url + '/urgencypack/getremainings', {
                'shop': shop_url,
            });
            req.done((res) => {
                UP_KT_TOTAL_SEC = res.remaining_seconds;
                if (UP_KT_TOTAL_SEC < 0) {
                    return;
                }
                UP_KT_Timer_start_logic();
            });
        }
        // TIMER CONTENT END

        // STOCK TIMER CONTENT START

        // STOCK TIMER CONTENT END

        // TRUST BADGE CONTENT START
        var trust_style = document.createElement('style');
        trust_style.id = "trust_KT_css";
        trust_style.innerHTML = ` #trust-kt2{width:100%;clear:both}#trust-kt{width:100%;clear:both;text-align:center}@media(min-width:750px){#trust-kt{text-align:center}}#trust-kt .trust-wrapper{display:inline-block;text-align:center;width:100%;max-width:350px}#trust-kt .pf{margin:5px 6px;font-size:27pt;color:rgba(0,0,0,1.00)}}`;
        UP_KT_trust_start_logic = () => {
            style = document.createElement('link');
            style.id = "TrustKTFont";
            style.rel = "stylesheet";
            style.href = "https://root.kilatechapps.com/static/payment/paymentfont.min.css";
            document.head.appendChild(style);
            document.head.appendChild(trust_style);
            var element = "form[action*='/cart/add']";
            element = "div[id*='trust-kt2']";
            jQuery(element).append(`
    <div id="trust-kt">
        <div class="trust-wrapper">
            <i class="pf pf-american-express"></i><i class="pf pf-mastercard-alt"></i><i class="pf pf-paypal"></i><i class="pf pf-visa"></i>
        </div>
        <style></style>
<script></script>
    </div>
`);
        }
        UP_KT_trust_start = () => {
            if (kilatech_page == "product") {
                if (kilatech_available == false) {
                    return;
                }
                if ("" != "") {
                    var cancontinue = false;
                    var con = "".toLowerCase();
                    for (var i in kilatech_tags) {
                        if (kilatech_tags[i].toString().toLowerCase() == con) {
                            cancontinue = true;
                            break;
                        }
                    }
                    if (!cancontinue) {
                        return;
                    }
                }
            }
            UP_KT_trust_start_logic();
        }
        // TRUST BADGE CONTENT END

        // SALES POP CONTENT START

        // SALES POP CONTENT END

        // COMMON START

        // COMMON END

        if (typeof UP_KT_trust_start === "function") {
            UP_KT_trust_start();
        }
        if (typeof UP_KT_stock_start === "function") {
            UP_KT_stock_start();
        }
        if (typeof UP_KT_Timer_start === "function") {
            UP_KT_Timer_start();
        }
        if (typeof UP_KT_salespopup_logic === "function") {
            UP_KT_salespopup_logic();
        }
    }
}