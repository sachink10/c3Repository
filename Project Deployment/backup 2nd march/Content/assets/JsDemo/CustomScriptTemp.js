var rowCount = 0;



/*----------Common functions--------------*/

$(document).ajaxError(function (xhr, props) {
    if (props.status === 401) {
        location.reload();
    }
});

function LogOut_Click() {
    //LogOut//ajax call
    
    jQuery.ajax({

        url: 'SingleAgent.aspx/LogOut',
        type: "POST",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            
            window.location.href = "/Pages/Authentication/Credentials.aspx?BkUrl=" + encodeURIComponent(document.URL.split("/Pages")[1]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log(textStatus, errorThrown);
        }
    });
}



function AgentPortalLogOut_Click() {
    //LogOut//ajax call
    
    jQuery.ajax({

        url: 'AgentPortal.aspx/LogOut',
        type: "POST",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            
            console.log("Logged Out");
            window.location.href = "/Pages/Authentication/Credentials.aspx?ReturnUrl=" + encodeURIComponent(document.URL.split("/Pages")[1]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}


function SecondLevelLogOut_Click() {
    //LogOut//ajax call

    jQuery.ajax({

        url: 'SecondLevel.aspx/LogOut',
        type: "POST",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            window.location.href = "/Pages/Authentication/Credentials.aspx?BkUrl=" + encodeURIComponent(document.URL.split("/Pages")[1]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}
//iOS Version Check
function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}
//Fetch Latest theme from DB
function GetLatestTheme(empNum) {
    jQuery.ajax({
        url: 'AllAgent.aspx/GetLatestTheme',
        type: "POST",
        data: JSON.stringify({ employeeNumber: empNum }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#hdnTheme").val(data.d);
        }
    });
}

var isClose = false;
document.onkeydown = checkKeycode
function checkKeycode(e) {
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;
    if (keycode == 116) {

        isClose = true;
    }
}

function OnBeforeUnLoad() {

    if (!isClose) {
        var request = GetRequest();
        request.open("GET", "LogOut.aspx", true);
        request.send();
        //return;
        return "All data that you have entered will be lost!";
    }
}

function replaceUrlParam(url, paramName, paramValue) {
    var pattern = new RegExp('(' + paramName + '=).*?(&|$)')
    var newUrl = url.replace(pattern, '$1' + paramValue + '$2');
    if (newUrl == url) {
        newUrl = newUrl + (newUrl.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
    }
    return newUrl
}

function GetRequest() {
    var request = null;
    if (window.XMLHttpRequest) {
        //incase of IE7,FF, Opera and Safari browser
        request = new XMLHttpRequest();
    }
    else {
        //for old browser like IE 6.x and IE 5.x
        request = new ActiveXObject('MSXML2.XMLHTTP.3.0');
    }
    return request;
}

function AllAgentTriggerQualityFormClick() {
    window.location = "/Pages/FirstLevelManager/QualityForm.aspx?url=" + encodeURIComponent(document.URL) + "?periodValue=" + $("#hdnPeriod").val() + "&sliderValue=" + $("#hdnSliderValue").val() + "&Type=ToolBar";
}
function AllAgentQualityFormClick() {
    window.location.href = "/Pages/FirstLevelManager/QualityForm.aspx?url=" + encodeURIComponent(document.URL.split("?")[0]) + "?periodValue=" + $("#hdnPeriod").val() + "&sliderValue=" + $("#hdnSlider").val() + "&Type=ToolBar";
}
function TaskListQualityFormClick() {
    window.location.href = "/Pages/FirstLevelManager/QualityForm.aspx?url=" + encodeURIComponent(document.URL.split("?")[0]) + "?periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $("#hdnOffset").val() + "&Type=ToolBar";
}
function ScoreCardQualityFormClick() {
    window.location = "/Pages/FirstLevelManager/QualityForm.aspx?url=" + encodeURIComponent(document.URL.split("&periodValue")[0]) + "&periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $("#hdnOffset").val() + "&Type=ToolBar";
}

function SingleAgentQualityFormClick() {
    window.location.href = "/Pages/FirstLevelManager/QualityForm.aspx?url=" + encodeURIComponent(document.URL.split("?")[0]) + "?periodValue=" + $("#hdnPeriodValue").val() + "&sliderValue=" + $("#hdnSliderValue").val() + "&AgentId=" + document.getElementById('hdnAgentId').value + "&Type=ToolBar";

}
function CoachingQualityFormClick() {
    window.location.href = "/Pages/FirstLevelManager/QualityForm.aspx?url=" + encodeURIComponent(document.URL) + "&AgentId=" + document.getElementById('hdnAgentId').value + "&periodValue=" +
    $("#hdnOffsetType").val() + "&sliderValue=" + $("#hdnOffset").val() + "&Type=ToolBar";

}

function getUnreadTaskCount() {
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;

    jQuery.ajax({
        url: 'SingleAgent.aspx/GetUnreadTask',
        type: "POST",
        data: JSON.stringify({ date: today }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (status) {
            
            if (status.d == 0 || status.d == "") {
                $("#bubbleGrey").css("display", "inline");

            }
            else {
                $("#spnCount")[0].innerHTML = status.d;
                $("#bubbleBlue").css("display", "inline");
            }
        }
    });
}

function AssignArticle() {


    var articleId = $("#assignCalendar").attr('ArticleId');
    //    var query_params = Coaching_getURLParameters($(location).attr('href'));
    var userId = Coaching_getURLParameters($(location).attr('href'))['agentId'];
    var assignDate = $("#datepicker_send").val();
    var tempVal
    jQuery.ajax({
        url: 'KnowledgeBase.aspx/setCalendarDate',
        type: "POST",
        data: JSON.stringify({ articleId: articleId, userId: userId, assignDate: assignDate, Link: $('#hdnLink').val(),ArticleRowID:"",NotificationRowId:"" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (allData) {


            $("#assignedTask").popup('open');
            setTimeout(function () { $("#assignedTask").popup('close'); }, 1000);
            tempVal = allData.d;


        }
    });

    return tempVal;

}




function HomePage(pagename) {

    $("#homeBttn").addClass("ui-btn-active");

    if (pagename == "SingleAgent") {
        window.location.href = "AllAgent.aspx?periodValue=" + $("input[type='radio'][name='radio-choice-h-2']:checked").val() + "&sliderValue=" + $('#slider-1').val();
    }
    else if (pagename == "Allagent") {
        window.location.href = "AllAgent.aspx?periodValue=" + $("input[type='radio'][name='radio-choice-h-1']:checked").val() + "&sliderValue=" + $('#slider-1').val();
    }
    else if (pagename == "AllagentTrigger") {
        window.location.href = "AllAgent.aspx?periodValue=" + $("input[type='radio'][name='radio-choice-h-1']:checked").val() + "&sliderValue=" + $('#slider-1').val();
    }

    else if (pagename == "balanceScoreCard") {
        window.location.href = "AllAgent.aspx?periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $('#hdnOffset').val();
    }
    else if (pagename == "QualityForm") {
        window.location.href = "AllAgent.aspx?periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $('#hdnOffset').val();
        //  window.location = "/Pages/FirstLevelManager/Tiles.aspx";
    }

    else {
        window.location.href = "AllAgent.aspx?periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $('#hdnOffset').val();
        //window.location = "/Pages/FirstLevelManager/Tiles.aspx";
    }
}

// for set width in the coaching table. 
// for set width in the coaching table in Single Agent.
function setCoachwidth() {

   
    var scrnWidth = $(window).width();

    var platform = navigator.platform;
    if (platform != "iPad") {

        // var isTouchDevice = ('ontouchstart' in document.documentElement)
        // if (!isTouchDevice) {

        //for header
        $("#hdrDate").css("width", scrnWidth * 0.1); //0.1);
        $("#hdrMtrc").css("width", scrnWidth * 0.18);
        $("#hdrRscCde").css("width", scrnWidth * 0.18); //0.2);
        $("#hdrGoal").css("width", scrnWidth * 0.08); //0.1);
        $("#hdrCmtmnt").css("width", scrnWidth * 0.08); //0.1);//
        $("#hdrActl").css("width", scrnWidth * 0.08); //0.1);//
        $("#hdrCmtDate").css("width", scrnWidth * 0.12); //0.1);//
        $("#hdrSts").css("width", scrnWidth * 0.1);
        $("#hdrAud").css("width", scrnWidth * 0.06); //0.1);

        //for rows
        $("[id*='rwDate']").css("width", scrnWidth * 0.1); //0.1);
        $("[id*='rwDate']").css("padding-right", "1px"); //0.1);
        $("[id*='rwMtrc']").css("width", scrnWidth * 0.18);
        $("[id*='rwRscCde']").css("width", scrnWidth * 0.18); //0.2);
        $("[id*='rwGoal']").css("width", scrnWidth * 0.08); //0.1);
        $("[id*='rwCmtmnt']").css("width", scrnWidth * 0.08); //0.1);
        $("[id*='rwActl']").css("width", scrnWidth * 0.08); //0.1);
        $("[id*='rwCmtDate']").css("width", scrnWidth * 0.12); //0.1);
        $("[id*='rwSts']").css("width", scrnWidth * 0.1); //0.1);

        $("[id*='rwAudio']").css("width", scrnWidth * 0.055);
    }
    else {
        //for header
        $("#hdrDate").css("width", scrnWidth * 0.1); //0.1);
        $("#hdrMtrc").css("width", scrnWidth * 0.16);
        $("#hdrRscCde").css("width", scrnWidth * 0.16); //0.2);
        $("#hdrGoal").css("width", scrnWidth * 0.1); //0.1);
        $("#hdrCmtmnt").css("width", scrnWidth * 0.1); //0.1);//
        $("#hdrActl").css("width", scrnWidth * 0.1); //0.1);//
        $("#hdrCmtDate").css("width", scrnWidth * 0.1); //0.1);//
        $("#hdrSts").css("width", scrnWidth * 0.1);
        $("#hdrAud").css("width", scrnWidth * 0.07); //0.1);

        //for rows
        $("[id*='rwDate']").css("width", scrnWidth * 0.1); //0.1);
        $("[id*='rwDate']").css("padding-right", "1px"); //0.1);
        $("[id*='rwMtrc']").css("width", scrnWidth * 0.16);
        $("[id*='rwRscCde']").css("width", scrnWidth * 0.16); //0.2);
        $("[id*='rwGoal']").css("width", scrnWidth * 0.1); //0.1);
        $("[id*='rwCmtmnt']").css("width", scrnWidth * 0.1); //0.1);
        $("[id*='rwActl']").css("width", scrnWidth * 0.1); //0.1);
        $("[id*='rwCmtDate']").css("width", scrnWidth * 0.1); //0.1);
        $("[id*='rwSts']").css("width", scrnWidth * 0.1); //0.1);
        $("[id*='rwAudio']").css("width", scrnWidth * 0.07);
    }
}

// for set width in the coaching table in Coaching page.
function setCoachwidth_Coaching() {

    var scrnWidth = $(window).width();
    var platform = navigator.platform;
    if (platform != "iPad") {

        // var isTouchDevice = ('ontouchstart' in document.documentElement)
        // if (!isTouchDevice) {

        $("#hdrMtrc").css("width", 2 * Math.round((scrnWidth / 10.11), 0));
        $("[id*='rwMtrc']").css("width", 2 * Math.round((scrnWidth / 10.11), 0));
        $("#hdrSts").css("width", Math.round(scrnWidth / 10.20), 0);
        $("[id*='rwSts']").css("width", Math.round(scrnWidth / 10.20), 0);
        $("#hdrAud").css("width", Math.round(scrnWidth * 0.1132), 0); //0.1);
        $("[id*='rwAudio']").css("width", Math.round(scrnWidth * 0.1132), 0); //0.110); //0.1);

        //for header
        $("#hdrDate").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);
        $("#hdrRscCde").css("width", Math.round(scrnWidth * 0.2), 0); //0.2);
        $("#hdrGoal").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);
        $("#hdrCmtmnt").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);//
        $("#hdrActl").css("width", Math.round(scrnWidth * 0.072), 0); //0.1);//
        $("#hdrCmt").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);//

        $("#hdrAud").css("padding-right", '11px');


        //for rows
        $("[id*='rwDate']").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);
        // $("[id*='rwMtrc']").css("width", scrnWidth * 0.2);
        $("[id*='rwRscCde']").css("width", Math.round(scrnWidth * 0.2), 0); //0.2);
        $("[id*='rwGoal']").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);
        $("[id*='rwCmtmnt']").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);
        $("[id*='rwActl']").css("width", Math.round(scrnWidth * 0.072), 0); //0.1);
        $("[id*='rwCmt']").css("width", Math.round(scrnWidth * 0.075), 0); //0.1);
        // $("[id*='rwSts']").css("width", scrnWidth * 0.1); //0.1);

    }
    else {

        var mode = checkMode();

        if (mode == "landscape") {

            //for header
            $("#hdrDate").css("width", scrnWidth * 0.075); //0.1);
            $("#hdrMtrc").css("width", scrnWidth * 0.2);
            $("#hdrRscCde").css("width", scrnWidth * 0.2); //0.2);
            $("#hdrGoal").css("width", scrnWidth * 0.075); //0.1);
            $("#hdrCmtmnt").css("width", scrnWidth * 0.075); //0.1);//
            $("#hdrActl").css("width", scrnWidth * 0.075); //0.1);//
            $("#hdrCmt").css("width", scrnWidth * 0.075); //0.1);//
            $("#hdrSts").css("width", scrnWidth * 0.1);
            $("#hdrAud").css("width", scrnWidth * 0.1); //0.1);

            //for rows
            $("[id*='lstVwCoachHistory_rwDate_']").css("width", scrnWidth * 0.075); //0.1);
            $("[id*='lstVwCoachHistory_rwMtrc_']").css("width", scrnWidth * 0.2);
            $("[id*='lstVwCoachHistory_rwRscCde_']").css("width", scrnWidth * 0.2); //0.2);
            $("[id*='lstVwCoachHistory_rwGoal_']").css("width", scrnWidth * 0.075); //0.1);
            $("[id*='lstVwCoachHistory_rwCmtmnt_']").css("width", scrnWidth * 0.080); //0.1);
            $("[id*='lstVwCoachHistory_rwActl_']").css("width", scrnWidth * 0.075); //0.1);
            $("[id*='lstVwCoachHistory_rwCmt_']").css("width", scrnWidth * 0.075); //0.1);
            $("[id*='lstVwCoachHistory_rwSts_']").css("width", scrnWidth * 0.1); //0.1);
            $("[id*='lstVwCoachHistory_rwAudio_']").css("width", scrnWidth * 0.10);
        }
        else {

            //for header
            $("#hdrDate").css("width", scrnWidth * 0.079); //0.1);
            $("#hdrMtrc").css("width", scrnWidth * 0.2);
            $("#hdrRscCde").css("width", scrnWidth * 0.2); //0.2);
            $("#hdrGoal").css("width", scrnWidth * 0.075); //0.1);
            $("#hdrCmtmnt").css("width", scrnWidth * 0.075); //0.1);//
            $("#hdrActl").css("width", scrnWidth * 0.075); //0.1);//
            $("#hdrCmt").css("width", scrnWidth * 0.075); //0.1);//
            $("#hdrSts").css("width", scrnWidth * 0.1);
            $("#hdrAud").css("width", scrnWidth * 0.1); //0.1);

            //for rows
            $("[id*='lstVwCoachHistory_rwDate_']").css("width", scrnWidth * 0.075); //0.1);
            $("[id*='lstVwCoachHistory_rwMtrc_']").css("width", scrnWidth * 0.192);
            $("[id*='lstVwCoachHistory_rwRscCde_']").css("width", scrnWidth * 0.191); //0.2);
            $("[id*='lstVwCoachHistory_rwGoal_']").css("width", scrnWidth * 0.075); //0.1);
            $("[id*='lstVwCoachHistory_rwCmtmnt_']").css("width", scrnWidth * 0.104); //0.1);
            $("[id*='lstVwCoachHistory_rwActl_']").css("width", scrnWidth * 0.075); //0.1);
            $("[id*='lstVwCoachHistory_rwCmt_']").css("width", scrnWidth * 0.088); //0.1);
            $("[id*='lstVwCoachHistory_rwSts_']").css("width", scrnWidth * 0.097); //0.1);
            $("[id*='lstVwCoachHistory_rwAudio_']").css("width", scrnWidth * 0.08);
        }

    }
}


/*----------Credentials Page---------------*/

//$("#Credentials").on("orientationchange", function (event) {
//    var id = $("*:focus").attr("id");
//    $('#btnLogin').focus();
//    var delay = 1000;
//    //setTimeout(function () {
//    //    $('#' + id).focus();
//    //}, delay);

//    Credentials_alignment();

//});
function Credentials_Ready(wndwht, wndwwdth) {
    var platform = navigator.platform;

    if (platform == "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement)
        //    if (isTouchDevice) {
        var isRanFromHomeScreen = navigator.standalone;
        if (isRanFromHomeScreen) {
            //           $("#rmbrId").css("visibility", "hidden");
        }
    }
    else {
        if (screen.width == window.innerWidth && screen.height == window.innerHeight) {
            $("#rmbrId").css("visibility", "hidden");
        }
    }

    //    if (!window.screenTop && !window.screenY) { // make remeber id, frgt psswd in full screen
    //        $("#rmbrId").css("visibility", "hidden");
    //    }
    Credentials_alignment();

}
function Credentials_alignment() {

    $('.ui-checkbox').children().unwrap(); //Aligns the Remember Me check box to the left
    var toppos = ($(window).height() / 2) - ($("#loginFrm").height() / 2) + 115; //107 earlier, after image changed the size also seems be changed.
    var leftpos = ($(window).width() / 2) - ($("#loginFrm").width() / 2);
    $("#loginFrm").css("top", toppos).css("left", leftpos);

    $("#btnLogin").parent().css('padding', '7px');
    $("#btnCancel").parent().css('padding', '7px');
}
function Credentials_checkUserNmPasswrd() {
    if ($("#txtUsrNm").text() == "" && $("#txtPsswrd").text() == "") {
        $("#lblUserNmErr").text("*");
        $("#lblUserNmErr").css("color", "Red");
        $("#lblPasswrdErr").text("*");
        $("#lblPasswrdErr").css("color", "Red");
        return false;
    }
}

function Credentials_loginClick() {
    $("#btnLogin").focus();
    $("#btnLogin").prev().css("color", "RoyalBlue"); // change button color when click
}

function Credentials_areCookiesEnabled() {
    var cookieEnabled = navigator.cookieEnabled;

    // When cookieEnabled flag is present and false then cookies are disabled.
    if (cookieEnabled === false) {
        return false;
    }

    // try to set a test cookie if we can't see any cookies and we're using 
    // either a browser that doesn't support navigator.cookieEnabled
    // or IE (which always returns true for navigator.cookieEnabled)
    if (!document.cookie && (cookieEnabled === null || /*@cc_on!@*/false)) {
        document.cookie = "testcookie=1";

        if (!document.cookie) {
            return false;
        } else {
            document.cookie = "testcookie=; expires=" + new Date(0).toUTCString();
        }
    }

    return true;
}

/*----------Coaching Page---------------*/

function DisablePopUp_Coaching() {

    $('.scrollable').on('scroll', function () {

        $("#coachPopUp").popup("close");
    });
}
var clr1 = 0, clr2 = 0, clr3 = 0;

function coaching_BackButton() {
    $("#backButton").addClass("ui-btn-active");
    var query_params = Coaching_getURLParameters($(location).attr('href'));
    window.location = query_params;
}


function addParam(url, param, value) {
    var a = document.createElement('a'), regex = /[?&]([^=]+)=([^&]*)/g;
    var match, str = []; a.href = url; value = value || "";
    while (match = regex.exec(a.search))
        if (encodeURIComponent(param) != match[1]) str.push(match[1] + "=" + match[2]);
    str.push(encodeURIComponent(param) + "=" + encodeURIComponent(value));
    a.search = (a.search.substring(0, 1) == "?" ? "" : "?") + str.join("&");
    return a.href;
}

var icnsID;
function Coaching_Ready() {
    //    alert("3");   
    DisablePopUp_Coaching();

    setCoachwidth_Coaching();

      

    //    $("[id*='lstVwCoachHistory_lstvwTR_']").click(function (e) {
    //        $("#lblStrength").text($(this).attr("strength"));
    //        $("#lblOppurtunities").text($(this).attr("opprtuntis"));
    //        if ($(this).attr("strength") == '') { $("#lblStrength").text("-"); }
    //        if ($(this).attr("opprtuntis") == '') { $("#lblOppurtunities").text("-"); }
    //        var posCoach = $(this).offset();
    //        var topPos = (posCoach.top - 67) + 'px';
    //        var leftPos = 485 + 'px';
    //        $('#coachPopUp').css({ position: 'fixed', top: topPos, left: leftPos });
    //        $("#coachPopUp").popup("open");
    //    });

    var query_params = Coaching_getURLParameters($(location).attr('href'));
    $("#backButtonCoach").click(function () {      
        $(this).addClass("ui-btn-active");
        if (query_params['readonly'] == "true") {
            if (query_params['From'] == "SingleAgent") { // to go single agent
                window.location = decodeURIComponent(query_params['BkUrl']);
            }
            else if (query_params['From'] == "TMTask") {
                window.location = decodeURIComponent(query_params['BkUrl']);
            }

            else {
                window.location = replaceUrlParam($(location).attr('href'), 'readonly', 'false');
            }
        }
        else {
            //alert(decodeURIComponent(query_params['BkUrl']));
            if (decodeURIComponent(query_params['BkUrl']).indexOf("SingleAgent") >= 0) {
                window.location = decodeURIComponent(query_params['BkUrl']) + "?agentId=" + $("#hdnAgentId").val() + "&periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $("#hdnOffset").val();
            }
            else {
                window.location = decodeURIComponent(query_params['BkUrl']);
            }
        }

    });


    $("#homeBttn").click(function () {
        
        $(this).addClass("ui-btn-active");
        // window.location = "/Pages/FirstLevelManager/Tiles.aspx";
        window.location.href = "AllAgent.aspx?periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $('#hdnOffset').val();
    });

    Coaching_AdjustTableHeight();
    Coaching_showDtpkr();  

    
    $(window).on("orientationchange", function (event) {
        Coaching_AdjustTableHeight();
    });

    window.onresize = function (event) {
        Coaching_AdjustTableHeight();
    }
       

    if ($("#hdnMetric1").val() == "") {
        $("#ddlReasonCodeDk1").selectmenu("disable");
        $("#ddlReasonCodeDk1").selectmenu("refresh");
        // $("#ddlReasonCode2").selectmenu("disable");
    }
    if ($("#hdnMetric2").val() == "") {

        $("#ddlReasonCodeDk2").selectmenu("disable");
        $("#ddlReasonCodeDk2").selectmenu("refresh");
        // $("#ddlReasonCode2").selectmenu("disable");
    }
    if ($("#hdnMetric3").val() == "") {
        $("#ddlReasonCodeDk3").selectmenu("disable");
        $("#ddlReasonCodeDk3").selectmenu("refresh");
        // $("#ddlReasonCode3").selectmenu("disable");
    }

    $("#imgBtnMetric1").click(function () {

        icnsID = 1;
        $("#selMetricDIV1").popup("option", "positionTo", "#txtMetric1");
        $("#selMetricDIV1").popup("open");

    });

    $("#imgBtnMetric2").click(function () {
        
        icnsID = 2;
        $("#selMetricDIV1").popup("option", "positionTo", "#txtMetric2");
        $("#selMetricDIV1").popup("open");

    });

    $("#imgBtnMetric3").click(function () {
        icnsID = 3;
        $("#selMetricDIV1").popup("option", "positionTo", "#txtMetric3");
        $("#selMetricDIV1").popup("open");

    });

    $("#txtMetric1").click(function () {
        icnsID = 1;
        $("#selMetricDIV1").popup("option", "positionTo", "#txtMetric1");
        $("#selMetricDIV1").popup("open");

    });

    $("#txtMetric2").click(function () {
        icnsID = 2;
        $("#selMetricDIV1").popup("option", "positionTo", "#txtMetric2");
        $("#selMetricDIV1").popup("open");

    });

    $("#txtMetric3").click(function () {
        icnsID = 3;
        $("#selMetricDIV1").popup("option", "positionTo", "#txtMetric3");
        $("#selMetricDIV1").popup("open");

    });


    //disable selected metrics in the pop up
    $("[id*='imgBtnMetric']").click(function () {
        $('#selMetric1 li').removeClass('ui-disabled');
        if ($('#txtMetric1').val() != '')
            $("li:contains(" + $('#txtMetric1').val() + ")").addClass('ui-disabled');
        if ($('#txtMetric2').val() != '')
            $("li:contains(" + $('#txtMetric2').val() + ")").addClass('ui-disabled');
        if ($('#txtMetric3').val() != '')
            $("li:contains(" + $('#txtMetric3').val() + ")").addClass('ui-disabled');
    });


    $("[id*='txtMetric']").click(function () {
        $('#selMetric1 li').removeClass('ui-disabled');
        if ($('#txtMetric1').val() != '')
            $("li:contains(" + $('#txtMetric1').val() + ")").addClass('ui-disabled');
        if ($('#txtMetric2').val() != '')
            $("li:contains(" + $('#txtMetric2').val() + ")").addClass('ui-disabled');
        if ($('#txtMetric3').val() != '')
            $("li:contains(" + $('#txtMetric3').val() + ")").addClass('ui-disabled');
    });      

    $(".ui-datepicker-trigger").mouseover(function () {
        $(this).css('cursor', 'pointer');
    });


    //    var isTouchDevice = ('ontouchstart' in document.documentElement);

    var platform = navigator.platform;
    if (platform == "iPad") {

        //        $("#ddlReasonCodeDk1").parent().hide();
        //        $("#ddlReasonCodeDk2").parent().hide();
        //        $("#ddlReasonCodeDk3").parent().hide();
        $("#datepicker").parent().hide();
        $("#datepicker1").parent().hide();
        $("#datepicker2").parent().hide();
        $("#date1").click(function () {
            this.blur();
            document.getElementById("date1").focus();
        });
        $("#date2").click(function () {
            this.blur();
            document.getElementById("date2").focus();
        });
        $("#date3").click(function () {
            this.blur();
            document.getElementById("date3").focus();
        });

        $("#dpimage").click(function () {
            if ($("#hdnMetric1").val() != '' && $("#hdnMetric1").val() != null) {
                document.getElementById("date1").focus();
            }
        });
        $("#dpimage1").click(function () {
            if ($("#hdnMetric2").val() != '' && $("#hdnMetric2").val() != null) {
                document.getElementById("date2").focus();
            }
        });
        $("#dpimage2").click(function () {
            if ($("#hdnMetric3").val() != '' && $("#hdnMetric3").val() != null) {
                document.getElementById("date3").focus();
            }
        });
        document.getElementById("datepicker").style.display = "none";
        document.getElementById("date1").style.display = "block";
        document.getElementById("datepicker1").style.display = "none";
        document.getElementById("date2").style.display = "block";
        document.getElementById("datepicker2").style.display = "none";
        document.getElementById("date3").style.display = "block";

    } else {
        //        $("#ddlReasonCode1").parent().hide();
        //        $("#ddlReasonCode2").parent().hide();
        //        $("#ddlReasonCode3").parent().hide();
        $("#date1").parent().hide();
        $("#date2").parent().hide();
        $("#date3").parent().hide();
        $("#dpimage").click(function () {
            if ($("#hdnMetric1").val() != '' && $("#hdnMetric1").val() != null) {
                $("#datepicker").datepicker({ minDate: 0 });
                $("#datepicker").datepicker("show");
            }
        });
        $("#datepicker").focus(function () {
            if ($("#datepicker").datepicker("widget").is(":visible")) {
            }
            else {
                $("#datepicker").datepicker("destroy");
            }
        });
        $("#datepicker").focusout(function () {
            var txtVal = $('#datepicker').val();
            if ((txtVal) != "") {
                if (!Coaching_isDate(txtVal)) {
                    Coaching_alertTextPopUp("Invalid Date Format", document.getElementById("datepicker"));
                    $('#datepicker').val('');
                    $("#datepicker").focus();
                }
            }
        });
        $("#dpimage1").click(function () {
            if ($("#hdnMetric2").val() != '' && $("#hdnMetric2").val() != null) {
                $("#datepicker1").datepicker({ minDate: 0 });
                $("#datepicker1").datepicker("show");
            }
        });
        $("#datepicker1").focus(function () {
            if ($("#datepicker1").datepicker("widget").is(":visible")) {
            }
            else {
                $("#datepicker1").datepicker("destroy");
            }
        });
        $("#datepicker1").focusout(function () {
            var txtVal = $('#datepicker1').val();
            if ((txtVal) != "") {
                if (!Coaching_isDate(txtVal)) {
                    Coaching_alertTextPopUp("Invalid Date Format", document.getElementById("datepicker1"));
                    $('#datepicker1').val('');
                    $("#datepicker1").focus();
                }
            }
        });
        $("#dpimage2").click(function () {
            if ($("#hdnMetric3").val() != '' && $("#hdnMetric3").val() != null) {
                $("#datepicker2").datepicker({ minDate: 0 });
                $("#datepicker2").datepicker("show");
            }
        });
        $("#datepicker2").focus(function () {
            if ($("#datepicker2").datepicker("widget").is(":visible")) {
            }
            else {
                $("#datepicker2").datepicker("destroy");
            }
        });
        $("#datepicker2").focusout(function () {
            var txtVal = $('#datepicker2').val();
            if ((txtVal) != "") {
                if (!Coaching_isDate(txtVal)) {
                    Coaching_alertTextPopUp("Invalid Date Format", document.getElementById("datepicker2"));
                    $('#datepicker2').val('');
                    $("#datepicker2").focus();
                }
            }
        });
        document.getElementById("datepicker").style.display = "block";
        document.getElementById("date1").style.display = "none";
        document.getElementById("datepicker1").style.display = "block";
        document.getElementById("date2").style.display = "none";
        document.getElementById("datepicker2").style.display = "block";
        document.getElementById("date3").style.display = "none";
    }   // else closing   

    //    $('#coachingHistoryDiv,input[type=text], textarea').on("swipeleft", Coaching_excludePie);
}


function Coaching_Windowload() {


    $("#txtGoal1").prop('readOnly', true);
    $("#txtGoal2").prop('readOnly', true);
    $("#txtGoal3").prop('readOnly', true);

    $("#txtActual1").prop('readOnly', true);
    $("#txtActual2").prop('readOnly', true);
    $("#txtActual3").prop('readOnly', true);

    //    $("#txtMetric1").prop('readOnly', true);
    //    $("#txtMetric2").prop('readOnly', true);
    //    $("#txtMetric3").prop('readOnly', true);

    if ($("#txtMetric2").val() == "") {
        $("#txtCommitment2").prop('readOnly', true);

        var platform = navigator.platform;
        if (platform == "iPad") {
            //        var isTouchDevice = ('ontouchstart' in document.documentElement)
            //        if (isTouchDevice) {
            $("#date2").prop('readOnly', true);
        }
        else {
            $("#datepicker1").prop('readOnly', true);
        }
    }

    if ($("#txtMetric3").val() == "") {

        $("#txtCommitment3").prop('readOnly', true);

        var platform = navigator.platform;
        if (platform == "iPad") {
            //        var isTouchDevice = ('ontouchstart' in document.documentElement)
            //        if (isTouchDevice) {
            $("#date3").prop('readOnly', true);
        }
        else {
            $("#datepicker2").prop('readOnly', true);
        }
    }

    if ($("#hdnReasonct1").val() > 1) {
        //        if (isTouchDevice)
        //            $("#ddlReasonCode1").children("span").eq(1).css('display', 'inline');
        //        else
        $("#ddlReasonCodeDk1-button").children("span").eq(1).css('display', 'inline');
    }
    if ($("#hdnReasonct2").val() > 1) {
        //        if (isTouchDevice)
        //            $("#ddlReasonCode2").children("span").eq(1).css('display', 'inline');
        //        else
        $("#ddlReasonCodeDk2-button").children("span").eq(1).css('display', 'inline');
    }
    if ($("#hdnReasonct3").val() > 1) {
        //        if (isTouchDevice)
        //            $("#ddlReasonCode3").children("span").eq(1).css('display', 'inline');
        //        else
        $("#ddlReasonCodeDk3-button").children("span").eq(1).css('display', 'inline');
    }
}



function Coaching_disableSelMetric() {
    $('#selMetric1 li').removeClass('ui-disabled');
    if ($('#txtMetric1').val() != '')
        $("li:contains(" + $('#txtMetric1').val() + ")").addClass('ui-disabled');

    if ($('#txtMetric2').val() != '')
        $("li:contains(" + $('#txtMetric2').val() + ")").addClass('ui-disabled');

    if ($('#txtMetric3').val() != '')
        $("li:contains(" + $('#txtMetric3').val() + ")").addClass('ui-disabled');

}

function Coaching_showDtpkr() {
    $("#txtMetric2").text($("#hdnMetric2").val());
    $("#txtMetric3").text($("#hdnMetric3").val());

    var platform = navigator.platform;
    if (platform == "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement);
        //    if (isTouchDevice) {
        $("#date1").val($('#hdnDatepicker1').val());
        $("#date2").val($('#hdnDatepicker2').val());
        $("#date3").val($('#hdnDatepicker3').val());
    }
    else {
        $("#datepicker").val($('#hdnDatepicker1').val());
        $("#datepicker1").val($('#hdnDatepicker2').val());
        $("#datepicker2").val($('#hdnDatepicker3').val());
    }
}




function Coaching_excludePie(event) {
    event.stopPropagation();
    event.preventDefault();
}

function Coaching_swiperightHandler(event) {
    // "CoachingPieChart.aspx?agentId=" + $("#hdnAgentId").val() + "&ReturnUrl=" + encodeURIComponent($.mobile.urlHistory.getActive().url)
    $.mobile.changePage("#CoachingPieChart",
            {
                transition: "slide",
                changeHash: false,
                reverse: false
            }, reloadPage = false);
    // window.location = "CoachingPieChart.aspx?agentId=" + $("#hdnAgentId").val() + "&ReturnUrl=" + encodeURIComponent($.mobile.urlHistory.getActive().url);    
}


function Coaching_alertTextPopUp(text, elementID) {
    $("#tableAlert tr").remove();
    $('#btnSave').focus();
    $("#tableAlert").append("<tr><td style=\"width: 18px; color:Red; text-align:center;\">*</td><td style=\"font-size: 11pt;\">" + text + "</td><td style=\"width: 18px;\"></td></tr>");
    $('#popupAlert').popup('open');
}
function coaching_AddValidation(message) {
    $("#tableAlert").append("<tr><td style=\"width: 18px; color:Red; text-align:center;\">*</td><td style=\"font-size: 11pt;\">" + message + "</td><td style=\"width: 18px;\"></td></tr>");
    //    $("#tableAlert").append("<tr style=\"height: 3px;\"></tr>");
}

//function OnCompleteCoachingSessionClick() {


//    $("#tableAlert tr").remove(); //  to vacant Validation pop up
//    $("#tableAlert").append("<tr style=\"height: 5px;\"></tr>");
//    var validOn = 0;

//    var datepicker1, datepicker2, datepicker3


//    var d = new Date();
//    var dat = d.getDate();
//    var mon = d.getMonth();
//    var year = d.getFullYear();

//    var todayDate = mon + 1 + "/" + dat + "/" + year;
//    var Date1 = new Date(Date.parse(todayDate, "MM/dd/yyyy")); // get the current date
//    var Date2 = new Date(Date.parse($("#hdnDatepicker1").val(), "dd-MMM-yyyy"));


//    $("#hdnReason1").val($("#ddlReasonCodeDk1").val());
//    $("#hdnReason2").val($("#ddlReasonCodeDk2").val());
//    $("#hdnReason3").val($("#ddlReasonCodeDk3").val());

//    var platform = navigator.platform;
//    if (platform == "iPad") {
//        //    var isTouchDevice = ('ontouchstart' in document.documentElement)
//        //    if (isTouchDevice) {
//        datepicker1 = $('#date1').val();
//        datepicker2 = $('#date2').val();
//        datepicker3 = $('#date3').val();

//        $("#hdnDatepicker1").val($('#date1').val());
//        $("#hdnDatepicker2").val($('#date2').val());
//        $("#hdnDatepicker3").val($('#date3').val());
//    }
//    else {
//        datepicker1 = $('#datepicker').val();
//        datepicker2 = $('#datepicker1').val();
//        datepicker3 = $('#datepicker2').val();

//        $("#hdnDatepicker1").val($('#datepicker').val());
//        $("#hdnDatepicker2").val($('#datepicker1').val());
//        $("#hdnDatepicker3").val($('#datepicker2').val());
//    }
//    if ($("#txtMetric1").val() == "" && $("#txtMetric2").val() == "" && $("#txtMetric3").val() == "") {
//        coaching_AddValidation("Select any metric");
//        validOn = 1;
//    }

//    if ($("#txtMetric1").val() != "") {

//        if (($("#txtCommitment1").val().trim() == '') && ($("#ddlReasonCodeDk1 :selected").length == 0) && ($("#hdnDatepicker1").val() == '')) {
//            coaching_AddValidation("Enter the Mandatory fields for " + $("#txtMetric1").val());
//            validOn = 1;
//        }

//        else if (($("#txtCommitment1").val().trim() == '') && ($("#ddlReasonCodeDk1 :selected").length == 0)) {
//            coaching_AddValidation("Enter the commitment field and reasoncode for " + $("#txtMetric1").val());
//            validOn = 1;

//        }
//        else if (($("#txtCommitment1").val().trim() == '') && ($("#hdnDatepicker1").val() == '')) {
//            coaching_AddValidation("Enter the commitment field and date for " + $("#txtMetric1").val());
//            validOn = 1;

//        }
//        else if (($("#ddlReasonCodeDk1 :selected").length == 0) && ($("#hdnDatepicker1").val() == '')) {
//            coaching_AddValidation("Enter the reasoncode and commitment date for " + $("#txtMetric1").val());
//            validOn = 1;

//        }

//        else if ($("#txtCommitment1").val().trim() == '') {
//            coaching_AddValidation("Enter the commitment date for " + $("#txtMetric1").val());
//            validOn = 1;

//        }
//        else if ($("#ddlReasonCodeDk1 :selected").length == 0) {
//            coaching_AddValidation("Enter the reasoncode for " + $("#txtMetric1").val());
//            validOn = 1;

//        }
//        else if ($("#hdnDatepicker1").val() == '') {
//            coaching_AddValidation("Enter the commitment date for " + $("#txtMetric1").val());
//            validOn = 1;
//        }

//        if (Coaching_NumericFilter($("#txtCommitment1").val().trim(), 1) == 0) {

//            coaching_AddValidation("Commitment value must be numeric for " + $("#txtMetric1").val());
//            validOn = 1;
//        }

//        if (Date.parse($("#hdnDatepicker1").val()) < Date1) {
//            coaching_AddValidation("Commitment Date for " + $("#txtMetric1").val() + " must be greater than or equal to current date");
//            validOn = 1;
//        }

//        if (Coaching_countCheck(1) == 1) {
//            validOn = 1;
//        }

//    }


//    if ($("#txtMetric2").val() != "") {

//        if (($("#txtCommitment2").val().trim() == '') && ($("#ddlReasonCodeDk2 :selected").length == 0) && (datepicker2 == '')) {
//            coaching_AddValidation("Enter the Mandatory fields for " + $("#txtMetric2").val());
//            validOn = 1;
//        }

//        else if (($("#txtCommitment2").val().trim() == '') && ($("#ddlReasonCodeDk2 :selected").length == 0)) {
//            coaching_AddValidation("Enter the commitment value and reasoncode for " + $("#txtMetric2").val());
//            validOn = 1;

//        }
//        else if (($("#txtCommitment2").val().trim() == '') && (datepicker2 == '')) {
//            coaching_AddValidation("Enter the commitment value and date for " + $("#txtMetric2").val());
//            validOn = 1;

//        }
//        else if (($("#ddlReasonCodeDk2 :selected").length == 0) && (datepicker2 == '')) {
//            coaching_AddValidation("Enter the reasoncode and commitment date for " + $("#txtMetric2").val());
//            validOn = 1;

//        }

//        else if ($("#txtCommitment2").val().trim() == '') {
//            coaching_AddValidation("Enter commitment value for " + $("#txtMetric2").val());
//            validOn = 1;

//        }
//        else if ($("#ddlReasonCodeDk2 :selected").length == 0) {
//            coaching_AddValidation("Enter the reasoncode for " + $("#txtMetric2").val());
//            validOn = 1;

//        }
//        else if ($("#hdnDatepicker2").val() == '') {
//            coaching_AddValidation("Enter the commitment date for " + $("#txtMetric2").val());
//            validOn = 1;

//        }


//        if (Coaching_NumericFilter($("#txtCommitment2").val().trim(), 2) == 0) {

//            coaching_AddValidation("Commitment value must be numeric for " + $("#txtMetric2").val());
//            validOn = 1;
//        }

//        if (Date.parse($("#hdnDatepicker2").val()) < Date1) {
//            coaching_AddValidation("Commitment Date for " + $("#txtMetric2").val() + " Must be greater than or equal to current date");
//            validOn = 1;
//        }

//        if (Coaching_countCheck(2) == 1) {
//            validOn = 1;
//        }

//    }
//    if ($("#txtMetric3").val() != "") {



//        if (($("#txtCommitment3").val().trim() == '') && ($("#ddlReasonCodeDk3 :selected").length == 0) && (datepicker3 == '')) {
//            coaching_AddValidation("Enter the Mandatory fields for " + $("#txtMetric3").val());
//            validOn = 1;
//        }

//        else if (($("#txtCommitment3").val().trim() == '') && ($("#ddlReasonCodeDk3 :selected").length == 0)) {
//            coaching_AddValidation("Enter the commitment value and reasoncode for " + $("#txtMetric3").val());
//            validOn = 1;

//        }
//        else if (($("#txtCommitment3").val().trim() == '') && (datepicker3 == '')) {
//            coaching_AddValidation("Enter the commitment value and commitment date for " + $("#txtMetric3").val());
//            validOn = 1;

//        }
//        else if (($("#ddlReasonCodeDk3 :selected").length == 0) && (datepicker3 == '')) {
//            coaching_AddValidation("Enter the reasoncode for " + $("#txtMetric3").val());
//            validOn = 1;

//        }

//        else if ($("#txtCommitment3").val().trim() == '') {
//            coaching_AddValidation("Enter the commitment value for " + $("#txtMetric3").val());
//            validOn = 1;

//        }
//        else if ($("#ddlReasonCodeDk3 :selected").length == 0) {
//            coaching_AddValidation("Enter the reasoncode for " + $("#txtMetric3").val());
//            validOn = 1;

//        }
//        else if ($("#hdnDatepicker3").val() == '') {
//            coaching_AddValidation("Enter the commitment date for " + $("#txtMetric3").val());
//            validOn = 1;

//        }

//        if (Coaching_NumericFilter($("#txtCommitment3").val().trim(), 3) == 0) {

//            coaching_AddValidation("Commitment value must be numeric for " + $("#txtMetric3").val());
//            validOn = 1;
//        }

//        if (Date.parse($("#hdnDatepicker3").val()) < Date1) {
//            coaching_AddValidation("Commitment Date for " + $("#txtMetric3").val() + " Must be greater than or equal to current date");
//            validOn = 1;
//        }

//        if (Coaching_countCheck(3) == 1) {
//            validOn = 1;
//        }

//    }


//    if (validOn == 1) {
//        $("#tableAlert").append("<tr style=\"height: 5px;\"></tr>");
//        $("#popupAlert").popup("open");
//        return false;
//    }
//        //ajax call to save the Coaching details.
//    else {
//        $("#bttnCompleteCoaching").addClass("ui-btn-active");

//        var metric1, metric2, metric3, commitment1, commitment2, commitment3, dateval1, dateval2, dateval3;
//        var reasn1, reasn2, reasn3, stren, oppr, agentId;
//        metric1 = $("#txtMetric1").val();
//        metric2 = $("#txtMetric2").val();
//        metric3 = $("#txtMetric3").val();
//        commitment1 = $("#txtCommitment1").val();
//        commitment2 = $("#txtCommitment2").val();
//        commitment3 = $("#txtCommitment3").val();
//        dateval1 = $("#hdnDatepicker1").val();
//        dateval2 = $("#hdnDatepicker2").val();
//        dateval3 = $("#hdnDatepicker3").val();
//        reasn1 = $("#hdnReason1").val();
//        reasn2 = $("#hdnReason2").val();
//        reasn3 = $("#hdnReason3").val();
//        stren = $("#txtStren").text().trim();
//        oppr = $("#txtOpp").text().trim();
//        agentId = parseInt($("#hdnAgentId").val());

//        var parameters = {
//            Metric1: metric1, Metric2: metric2, Metric3: metric3,
//            Metric1CommitmentValue: commitment1, Metric2CommitmentValue: commitment2, Metric3CommitmentValue: commitment3,
//            Metric1CommitmentDate: dateval1, Metric2CommitmentDate: dateval2, Metric3CommitmentDate: dateval3,
//            ReasonCode1: reasn1, ReasonCode2: reasn2, ReasonCode3: reasn3,
//            StrengthDesc: stren, OppurtunitiesDesc: oppr, agentId: agentId
//        };

//        jQuery.ajax({
//            url: 'Coaching.aspx/Coaching_Session',
//            type: "POST",
//            data: JSON.stringify({ coachingParams: parameters, KBlst: $("#KBList").val() }),
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (data) {
//                if ($("#hdnReturnTile").val() == "true") {
//                    window.location.href = "/Pages/FirstLevelManager/SingleAgent.aspx?agentId=" + $("#hdnAgentId").val() + "&periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $("#hdnOffset").val() + "&returnTile=true&ReturnPage=" + $("#hdnReturnPage").val();
//                }
//                else {
//                    window.location.href = "/Pages/FirstLevelManager/SingleAgent.aspx?agentId=" + $("#hdnAgentId").val() + "&periodValue=" + $("#hdnOffsetType").val() + "&sliderValue=" + $("#hdnOffset").val() + "&ReturnPage=" + $("#hdnReturnPage").val();
//                }


//            }
//        });
//    }

//    // return true;

//}

function Coaching_NumericFilter(num, control) {


    var pattern = '^[0-9]+(\.[0-9]{1,2})?$';
    var rx = new RegExp(pattern, "g");
    var r;
    if (control == "1") {
        r = document.getElementById("txtCommitment1").value;
    }
    if (control == "2") {
        r = document.getElementById("txtCommitment2").value;
    }
    else if (control == "3") {
        r = document.getElementById("txtCommitment3").value;
    }

    r.match(rx);

    if ((r.match(rx) != null) || (r == '')) {
        return 1;
    }
    else {
        return 0;
    }

}

function Coaching_countCheck(control) {

    var opt;
    //    var isTouchDevice = ('ontouchstart' in document.documentElement)

    if (control == "1") {
        //value = $("#ddlReasonCodeDk1").val();
        opt = document.getElementById('ddlReasonCodeDk1');
        $("#hdnReason1").val($("#ddlReasonCodeDk1").val());
    }
    else if (control == "2") {
        // value = $("#ddlReasonCodeDk2").val();
        opt = document.getElementById('ddlReasonCodeDk2');
        $("#hdnReason2").val($("#ddlReasonCodeDk2").val());
    }
    else if (control == "3") {
        //value = $("#ddlReasonCodeDk3").val();
        opt = document.getElementById('ddlReasonCodeDk3');
        $("#hdnReason3").val($("#ddlReasonCodeDk3").val());
    }

    //   }

    var selected = new Array();
    var count = 0;

    for (var intLoop = 0; intLoop < opt.length; intLoop++) {
        if (opt[intLoop].selected) {
            if (opt.options[intLoop].text != "Select") {
                count++;
            }
        }
    }


    if (count > 2) {
        if (control == "1") {
            coaching_AddValidation("Maximum 2 selections are allowed for Reason Code in " + $("#txtMetric1").val());
            return 1


        }
        else if (control == "2") {
            coaching_AddValidation("Maximum 2 selections are allowed for Reason Code in " + $("#txtMetric2").val());
            return 1
        }
        else if (control == "3") {
            coaching_AddValidation("Maximum 2 selections are allowed for Reason Codein " + $("#txtMetric3").val());
            return 1
        }

        // disable button
    }

    var str = $("#hdnReason1").val();
    var result = str.replace("Select,", "");
    $("#hdnReason1").val(result);

    $("#hdnReason2").val().replace("Select,", "");
    $("#hdnReason3").val().replace("Select,", "");
    return 0;

}

// temperory function  to get goal actual values 
//function Coaching_getActualGoalValues(serial, metric) {

//    var obj = { metric: metric, agentID: $("#hdnAgentId").val(), offsetType: $("#hdnOffsetType").val(), offset: $("#hdnOffset").val() };
//    jQuery.ajax({
//        url: 'Coaching.aspx/GetActualGoal',
//        type: "POST",
//        data: JSON.stringify(obj),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var goal = Number(data.d[1]);
//            var actual = Number(data.d[0]);

//            switch (metric) {
//                case 'AHT':
//                    $("#txtGoal" + serial).val(goal.toFixed(2));
//                    $("#txtActual" + serial).val(actual.toFixed(2));
//                    break;
//                case 'Attendance':
//                    $("#txtGoal" + serial).val(goal.toFixed(2));
//                    $("#txtActual" + serial).val(actual.toFixed(2));
//                    break;
//                case 'Conversion Rate':
//                    $("#txtGoal" + serial).val(goal.toFixed(2));
//                    $("#txtActual" + serial).val(actual.toFixed(2));
//                    break;
//                case 'Quality Score':
//                    $("#txtGoal" + serial).val(goal.toFixed(2));
//                    $("#txtActual" + serial).val(actual.toFixed(2));
//                    break;
//                case 'CSAT Survey Result':
//                    $("#txtGoal" + serial).val(goal.toFixed(2));
//                    $("#txtActual" + serial).val(actual.toFixed(2));
//                    break;
//                case 'Non Productive Time':
//                    $("#txtGoal" + serial).val(goal.toFixed(2));
//                    $("#txtActual" + serial).val(actual.toFixed(2));
//                    break;
//                case 'Bill To Pay':
//                    $("#txtGoal" + serial).val(goal.toFixed(2));
//                    $("#txtActual" + serial).val(actual.toFixed(2));
//                    break;

//            }
//        }
//    });

//}

function Coaching_getURLParameters(url) {


    var result = {};
    var searchIndex = url.indexOf("?");
    if (searchIndex == -1) return result;
    var sPageURL = url.substring(searchIndex + 1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

function Coaching_AdjustTableHeight() {
    var ver = iOSversion();
    var winHeight = $(window).height();

    var platform = navigator.platform;
    if (platform != "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement);
        //    if (!isTouchDevice) {
        $(".scrollable").css("height", winHeight - 550);
        $(".scrollable").css("overflow-y", "scroll");

        //winHeight - 510
    } else {
        if ($(window).width() > $(window).height()) {
            $("#rightDiv").css('float', 'left');
            $("#rightDiv").css('width', '23%');
            $("#rightDiv").css('margin-left', '10px');
            $("#rightDiv").css('margin-top', '10px');

            $(".scrollable").css("height", winHeight - 550);

            //landscape
        }
        else {
            $("#rightDiv").css('float', 'none');
            $("#rightDiv").css('width', '80%');
            $("#rightDiv").css('margin-left', '75px');
            $("#rightDiv").css('margin-top', '350px');
            //$(".extraTr").css("display", "inherit");
            var isRanFromHomeScreen = navigator.standalone;
            if (isRanFromHomeScreen) {
                $(".scrollable").css("height", (winHeight - 835));
            }
            else {
                $(".scrollable").css("height", (winHeight - 830));
            }


            //potrait
        }
        //        if (ver[0] > 6)
        $(".extraTr").css("display", "inherit");

        //        else
        //            $(".extraTr").css("display", "none");

        $(".scrollable").css("overflow-y", "scroll");

    }
}


function Coaching_isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '') {
        return false;
    }
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern);
    if (dtArray == null) {
        return false;
    }

    //Checks for mm/dd/yyyy format.
    dtDay = dtArray[3];
    dtMonth = dtArray[1];
    dtYear = dtArray[5];
    if (dtDay < 1 || dtDay > 31)
        return false;
    else if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}
function Coachng_ToolsClick() {
    // .position() uses position relative to the offset parent,
    var pos = $("#imgToolCoach").position();

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();

    var windowWidth = $(window).width();
    //show the menu directly over the placeholder
    $("#screenshotPopupCoach").css({
        position: "absolute",
        //bottom: pos.top + "px",
        //left: (pos.left - windowWidth / 4.9) + "px"
    });
    $("#screenshotPopupCoach")[0].style.left = (pos.left - ($("#screenshotPopupCoach").width() / 2.4)) + "px";
    $("#screenshotPopupCoach")[0].style.bottom = $("#pos").position().top + "px";

    $("#screenshotPopupCoach").popup("open");
    $("div#screenshotPopupCoach-popup").css("left", "auto");
    $("div#screenshotPopupCoach-popup").css("top", "auto");
}

function Coaching_cancelBookmark() {
    document.getElementById('txtBookmarkName').value = "";
    $('#bookmarkAddPopupCoach').popup("close");
}
function Coaching_viewBookmark() {


    jQuery.ajax({
        url: 'AllAgent.aspx/ViewBookmark',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Coaching_Bookmark
    });
}

function Coaching_Bookmark(data) {

    $("div#bookmarkdivCoach").empty();
    var urlView, pageName, url;
    for (var i = 0; i < data.d.length; i = i + 11) {

        data.d[i] = data.d[i].replace("pages", "Pages");
        url = data.d[i].split('Pages/')

        var pageName = url[1].split('.');

        if (pageName[0] == "BalancedScoreCard" || pageName[0] == "SingleAgent") {

            urlView = data.d[i];

            //var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            // alert(newURL);
            //            newURL = location.host + newURL;

            $("div#bookmarkdivCoach").append('<a href="' + url[1] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else if (pageName[0] == "QualityForm") {

            $("div#bookmarkdivAll").append('<a href="' + url[1] + "?AgentId=" + data.d[i + 9] + "&url=" + data.d[i + 10] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else {

            urlView = data.d[i] + "?id1=" + "Bookmark" + "&id2=" + data.d[i + 1] + "&id3=" + data.d[i + 2] + "&id4=" + data.d[i + 3] + "&id5=" + data.d[i + 4] + "&id6=" + data.d[i + 5] + "&id7=" + data.d[i + 6] + "&id8=" + data.d[i + 7];
            var newUrl = urlView.split('Pages/');
            //  var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            //   newURL = location.host + newURL;
            $("div#bookmarkdivCoach").append('<a href="' + newUrl[1] + '">' + " " + data.d[i + 8] + '</a>' + '<br/>');
        }
    }
}



/*----------CoachingPieChart Page---------------*/


function CoachingPieChart_HideScroll() {

    var platform = navigator.platform;
    if (platform != "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement);
        //    if (!isTouchDevice) {
        $("#parent").css("overflow-y", "scroll");
    }
    else {
        $("#parent").css("overflow-y", "hidden");
    }
}
var pAng = [], rotatedDegree = 0, prevSelectedSegment;
//var startAngle, endAngle, metricNm,
var xValues = [], yValues = [], metricsNm = [], strtAng = [], endAng = [], metricData = [], metricQty = [], segColor = [], segCT, prevXValue, prevYVal, initialAngles = [];
var flagRotate, flag = true, totalMetrics, flagInitial;
var sAngle = [], eAngle = [], mNames = [];
function CoachngPieChart_Ready() {

    $('#pieBrdr').on("swiperight", CoachngPieChart_excludePie);
    document.ontouchmove = function (event) {
        event.preventDefault();
    }
    var query_params = Coaching_getURLParameters($(location).attr('href'));
    $("#backButton").click(function () {
        $(this).addClass("ui-btn-active");
        window.location = decodeURIComponent(query_params['BkUrl']);
    });

    if (flagRotate == null) {
        CoachngPieChart_createPieChart();
    }
    rotatedDegree = 0;

    CoachngPieChart_rotatePieChart();

    // Bind the swiperightHandler callback function to the swipe event on div.box
    // $('#CoachingPieChart').on("swiperight", CoachngPieChart_swiperightHandler); //header1

}


var imgLineChartArray = new Array();
var imgColumnChartArray = new Array();
var imageData = [], ctr = 0;
function loadGraphImages(metric, totalMetricsCount) {

    $.mobile.loading("show", {
        text: "Loading...",
        textVisible: true,
        // theme: $("#hdnTheme").val(),
        textonly: true
    });
    $(document).bind('touchmove', false); //Prevent the touch events when popup appears
    $("body").addClass('ui-disabled');
    $('#cnPiechart').unbind('touchy-rotate', handleTouchyRotate);
    $('#cnPiechart').unbind('touchend', displayLineChart);
    $('#cnPiechart').unbind('touchstart', enableTouchMove);

    var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));

    for (var count = 0; count < totalMetricsCount; count++) {

        imgLineChartArray[metric[count]] = $(document.createElement('img'));
        imgLineChartArray[metric[count]].attr("src", "/Pages/LineGraph.aspx?AgentID=" + agent + "&Metric=" + metric[count]);
        imgLineChartArray[metric[count]].css("height", '100%');
        imgLineChartArray[metric[count]].css("width", '100%');
        if ($("#hdnTheme").val() == "b") {
            imgLineChartArray[metric[count]].css("background-color", "#396B9E");
            $("#CssDivLineChart").css("background-color", "#396B9E");
        }
        else {
            $("#CssDivLineChart").css('background-image', ' url(/Styles/images/MetricLineChartBckgrnd.png)');
            $("#CssDivLineChart").css('margin', '5px 10px 10px 10px');
            $("#CssDivLineChart").css('background-color', 'Black'); /*width: 710px;*/
            $("#CssDivLineChart").css('width', '94%');
            $("#CssDivLineChart").css('height', '200px');
        }
        imgLineChartArray[metric[count]].css("display", 'none');
        imgLineChartArray[metric[count]].appendTo('#CssDivLineChart');
        $("#CssDivLineChart").css('padding-top', '50px');
    }

    for (var count = 0; count < totalMetricsCount; count++) {

        imgColumnChartArray[metric[count]] = $(document.createElement('img'));
        imgColumnChartArray[metric[count]].attr("src", "/Pages/ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metric[count]);
        if ($("#hdnTheme").val() == "b") {
            imgColumnChartArray[metric[count]].css("background-color", "#396B9E");
        }

        imgColumnChartArray[metric[count]].css("height", "100%");
        imgColumnChartArray[metric[count]].css("width", "100%");
        imgColumnChartArray[metric[count]].css("display", 'none');
        imgColumnChartArray[metric[count]].appendTo('#CssDivPieChart');
        $(imgColumnChartArray[metric[count]]).on("load", function () {
            ctr++;
            if (ctr == totalMetricsCount) {

                $.mobile.loading("hide");
                $(document).unbind('touchmove', false); //Prevent the touch events when popup appears
                $("body").removeClass('ui-disabled');
                $('#cnPiechart').bind('touchy-rotate', handleTouchyRotate);
                $('#cnPiechart').bind('touchend', displayLineChart);
                $('#cnPiechart').bind('touchstart', enableTouchMove);
            }

        });
    }
}
var total = 0;
function CoachngPieChart_createPieChart() {
    flagInitial = true;
    var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));
    var obj = { agentId: agent };
    var metric = [], metric1, metric2, metric3, metric4, metric5, metric6, metric7;
    var metricQty1 = 0, metricQty2 = 0, metricQty3 = 0, metricQty4 = 0, metricQty5 = 0, metricQty6 = 0, metricQty7 = 0;
    var color = [[]];
    var count = 0;

    jQuery.ajax({
        url: 'Coaching.aspx/GetPieChartValues',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data.d, function (key, value) {
                metric[count] = value.Metric;
                metricQty[count] = value.Quantity;
                color[count] = [value.Color];
                total = parseInt(total) + parseInt(value.Quantity);
                count++;

            });

            $.each(metricQty, function (index, value) {
                metricQty[index] = (value / total) * 360;
                //                alert(metricQty[index]);
            });


            var pieChart = new PieChart("cnPiechart",
                {
                    includeLabels: true,
                    //data: [s1, s2, s3, s4, s5, s6, s7],
                    //labels: ["AHT", "Attendance", "Conversion Rate", "Quality Score", "CSAT Survey Result", "Non Billable Aux Time", "Bill to Pay"],
                    data: metricQty,
                    labels: metric,
                    colors: color //
                    //[
                    //                        ["rgb(160,102,198)"],
                    //                        ["rgb(235,224,68)"],
                    //                        ["rgb(45,190,220)"],
                    //                        ["rgb(38,218,34)"],
                    //                        ["rgb(255,17,73)"],
                    //                        ["rgb(233,156,48)"],
                    //                        ["rgb(226,85,132)"]
                    //]
                }

        );
            loadGraphImages(metric, count);
            pieChart.draw();
            var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));
            //            $("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricsNm[totalMetrics - 1]);
            //            $("#imgLineChart").attr("src", "LineGraph.aspx?AgentID=" + agent + "&Metric=" + metricsNm[totalMetrics - 1]);

            //            if (metricsNm[totalMetrics - 1] == "Non Billable Aux Time") {
            //                imgColumnChartArray["Non Productive Time"].css("display", "");
            //                imgLineChartArray["Non Productive Time"].css("display", "");
            //                prevSelectedSegment = "Non Productive Time";

            //            }
            //            else {
            
            if (totalMetrics > 0) {
                imgColumnChartArray[metricsNm[totalMetrics - 1]].css("display", "");
                imgLineChartArray[metricsNm[totalMetrics - 1]].css("display", "");
                prevSelectedSegment = metricsNm[totalMetrics - 1];
                //}
                writeLabels(totalMetrics - 1);
            }
            else {
                $.mobile.loading("hide");
                $(document).unbind('touchmove', false); //Prevent the touch events when popup appears
                $("body").removeClass('ui-disabled');
            }
        }
    });
}

function PieChart(id, o) {
    this.includeLabels = false;
    if (o.includeLabels == undefined) {
        this.includeLabels = false;
    }
    else {
        this.includeLabels = o.includeLabels;
    }
    this.data = o.data ? o.data : [30, 70, 45, 65, 20, 130]; // in degrees
    this.labels = o.labels ? o.labels : ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
    this.colors = o.colors ? o.colors : [
                ["#bbddb3", "#1d8e04"], // green
                ["#e2f5b4", "#9edd08"], // yellow green
                ["#fdfbb4", "#faf406"], // yellow
                ["#fbd4b7", "#f2700f"], // orange
                ["#f8bdb4", "#ea2507"], // red
                ["#e2bcbd", "#9e2126"]  // purple
    ];

    this.canvas = document.getElementById(id);
}

function CoachngPieChart_GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function getAngle(cX, cY, mX, mY) {
    var angle = Math.atan2(mY - cY, mX - cX);
    return angle;
}

var degree = 0;
var segmentCount = 0, flagCollision = false;
var totalPercentage = 0;
var angle = 0;
function CoachngPieChart_rotatePieChart() {
    //        $('.drop div canvas').css('-webkit-transform', 'rotate(' + 0 + 'deg)');
    var metricName;
    flagRotate = true;
    var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));

    if (!CoachngPieChart_is_touch_device()) {
        //Desktop Support

        var canvas = document.getElementById("cnPiechart");
        var context = canvas.getContext('2d');

        $('.drop div canvas').mousedown(function (event) {

            var offX = canvas.offsetLeft;
            var offY = canvas.offsetTop;
            var clickAngle = getAngle(350 + offX, 350 + offY, event.clientX, event.clientY) - angle;

            $(document).bind("mousemove.rotateImg", function (event) {
                // calculate move angle minus the angle onclick
                angle = (getAngle(350 + offX, 350 + offY, event.clientX, event.clientY) - clickAngle);

                CoachngPieChart_rotateOnMouse(event, $('.drop div canvas'));

            });
        });


        //        $('.drop div canvas').mousedown(function (e) {
        //            //
        //            e.preventDefault(); // prevents the dragging of the image.
        //            $(document).bind('mousemove.rotateImg', function (e2) {
        //                CoachngPieChart_rotateOnMouse(e2, $('.drop div canvas'));
        //            });
        //            $(document).bind('touchmove.rotateImg', function (e2) {
        //                CoachngPieChart_rotateOnMouse(e2, $('.drop div canvas'));
        //            });
        //        });


        $("#CoachingPieChart").mouseup(function (e) {
            metricName = "";
            //redraw(lblRotAng, xValues, yValues, segCT, metricsNm);
            $(document).unbind('mousemove.rotateImg');
            $(document).unbind('touchmove.rotateImg');

            var canvas = document.getElementById("cnPiechart");
            var context = canvas.getContext('2d');
            //            var pw = $('.drop div canvas')
            //            var offset = pw.offset();
            //            var center_x = 323;
            //            var center_y = 323;
            //            var mouse_x = e.pageX;
            //            var mouse_y = e.pageY;          
            //            var radians = Math.atan2((mouse_x - center_x), (mouse_y - center_y));
            //            var degree = (radians * (180 / Math.PI) * -1) + 0;

            var computedStyle = window.getComputedStyle(canvas, null);
            var tr = computedStyle.getPropertyValue("-webkit-transform") || computedStyle.getPropertyValue("-moz-transform") ||
         computedStyle.getPropertyValue("-ms-transform") ||
         computedStyle.getPropertyValue("-o-transform") ||
         computedStyle.getPropertyValue("transform") ||
         "fail...";

            // With rotate(30deg)...
            // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)        
            //            var values = tr.split('(')[1];
            //            values = values.split(')')[0];
            var values = tr.substring(7, (tr.length - 1));
            values = values.split(',');
            var a = values[0];
            var b = values[1];
            var c = values[2];
            var d = values[3];

            var scale = Math.sqrt(a * a + b * b);

            // arc sin, convert from radians to degrees, round
            // DO NOT USE: see update below
            var sin = b / scale;

            var degree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            var ar = rotate(500, 348, 350, 350, -1 * degree);        //var imgData = context.getImageData(10, 10, 50, 50);
            rotatedDegree = degree * -1;
            var t1 = Math.round(ar[0]);
            var t2 = Math.round(ar[1]);
            
            // getMetricName(p)
            var p = context.getImageData(t1, t2, 2, 2).data;

            if (p[0] == 160 && p[1] == 102 && p[2] == 198) {
                metricName = "AHT";
            }

            if (p[0] == 116 && p[1] == 110 && p[2] == 23) {
                metricName = "Attendance";
            }
            if (p[0] == 45 && p[1] == 190 && p[2] == 220) {
                metricName = "Bill To Pay";
            }

            if (p[0] == 38 && p[1] == 218 && p[2] == 34) {
                if (metricsNm.indexOf('Conversion Rate') == -1)
                    metricName = "Appointment Rate";
                else
                    metricName = "Conversion Rate";

            }

            if (p[0] == 255 && p[1] == 17 && p[2] == 73) {
                metricName = "CSAT Survey Result";
            }

            if (p[0] == 233 && p[1] == 156 && p[2] == 48) {
                metricName = "Non Productive Time";
            }

            if (p[0] == 226 && p[1] == 85 && p[2] == 132) {
                metricName = "Quality Score";
            }
            if (p[0] == 157 && p[1] == 51 && p[2] == 31) {
                metricName = "Coaching Effectiveness";
            }

            if (metricName == "" || metricName == undefined) {
               
                var degree = ((angle) * (180 / Math.PI));
                $("#cnPiechart").css('-moz-transform', 'rotate(' + (degree + 1) + 'deg)');
                $("#cnPiechart").css('-webkit-transform', 'rotate(' + (degree + 1) + 'deg)');
                $("#cnPiechart").css('-o-transform', 'rotate(' + (degree + 1) + 'deg)');
                $("#cnPiechart").css('-ms-transform', 'rotate(' + (degree + 1) + 'deg)');
                $("#cnPiechart").css('transform', 'rotate(' + (degree + 1) + 'deg)');

                var degree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                var ar = rotate(500, 348, 350, 350, -1 * (degree + 1));
                rotatedDegree = (degree + 1) * -1;
                var t1 = Math.round(ar[0]);
                var t2 = Math.round(ar[1]);

                var p = context.getImageData(t1, t2, 2, 2).data;
                metricName = getMetricName(p);
            }
            if (metricName != "" || metricName != undefined) {
                //            $("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricName);
                //            $("#imgLineChart").attr("src", "LineGraph.aspx?AgentID=" + agent + "&Metric=" + metricName);

                imgColumnChartArray[prevSelectedSegment].css("display", "none");

                if (metricName == "Non Billable Aux Time") {
                    imgColumnChartArray["Non Productive Time"].css("display", "");
                    imgLineChartArray[prevSelectedSegment].css("display", "none");
                    imgLineChartArray["Non Productive Time"].css("display", "");
                    prevSelectedSegment = "Non Productive Time";

                }
                else {
                    imgColumnChartArray[metricName].css("display", "");
                    imgLineChartArray[prevSelectedSegment].css("display", "none");
                    imgLineChartArray[metricName].css("display", "");
                    prevSelectedSegment = metricName;
                }

            }
            segmentCount = segCT;

            //display metric labels on mouse up
            flagCollision = false;
            totalPercentage = 0;
            for (var segmentCt = 0; segmentCt < segCT + 1; segmentCt++) {
                context.save();
                //                flagInitial = true;               
                drawMetricLabels(canvas, context, sAngle[segmentCt], eAngle[segmentCt], mNames[segmentCt], segmentCt, -1 * degree);
            }


            degree = degree * -1;
            context.save();
            context.beginPath();
            var tx = 350;
            var ty = 350;
            context.translate(tx, ty);
            context.rotate((degree * Math.PI) / 180);
            context.translate(-tx, -ty);
            context.font = 10 + "pt Arial";
            // context.fillText("Total Coaching", 315, 350);
            context.fillText(total, 340, 355);
            context.restore();

            if (flag)
                writeLabels(segmentCount);

        });

    } else {
        //Touch device support        
        //Rotate the Chart on touch enabled device
        $('#cnPiechart').bind('touchy-rotate', handleTouchyRotate);
        $('#cnPiechart').bind('touchend', displayLineChart);
        $('#cnPiechart').bind('touchstart', enableTouchMove);
    }
}

function getMetricName(p) {
    var metricName;
    if (p[0] == 160 && p[1] == 102 && p[2] == 198) {
        metricName = "AHT";
    }

    if (p[0] == 235 && p[1] == 224 && p[2] == 68) {
        metricName = "Attendance";
    }
    if (p[0] == 45 && p[1] == 190 && p[2] == 220) {
        metricName = "Bill To Pay";
    }

    if (p[0] == 38 && p[1] == 218 && p[2] == 34) {
        if (metricsNm.indexOf('Conversion Rate') == -1)
            metricName = "Appointment Rate";
        else
            metricName = "Conversion Rate";
    }

    if (p[0] == 255 && p[1] == 17 && p[2] == 73) {
        metricName = "CSAT Survey Result";
    }

    if (p[0] == 233 && p[1] == 156 && p[2] == 48) {
        metricName = "Non Productive Time";
    }

    if (p[0] == 226 && p[1] == 85 && p[2] == 132) {
        metricName = "Quality Score";
    }
    if (p[0] == 157 && p[1] == 51 && p[2] == 31) {
        metricName = "Coaching Effectiveness";
    }
    return metricName;
}
var handleTouchyRotate = function (e, phase, $target, data) {

    redraw(-1 * degree, xValues, yValues, segCT, metricsNm);

    //$("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricName);

    //        var obj = { agentId: agent, metric: metricName };
    //        var reasonCode = [];
    //        var quantity = [];
    //        jQuery.ajax({
    //            url: 'CoachingPieChart.aspx/BindChart',
    //            type: "POST",
    //            data: JSON.stringify(obj),
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            error: function (jqXHR, textStatus, errorThrown) {
    //                alert(jqXHR.resultText);
    //            },
    //            success: function (data) {

    //                $.each(data.d, function (key, value) {
    //                    reasonCode = value.ReasonCode.split(',');
    //                    quantity = value.Quantity.split(',');
    //                    //document.title = value.ReasonCode;
    //                    document.title = (value.ReasonCode + "," + value.Quantity);
    //                    // document.title = ("ReasonCode:" + value.ReasonCode+","+  "Quantity:" + value.Quantity);
    //                    // alert("Quantity:" + value.Quantity);
    //                });
    //               
    //                $("#columnChartCoaching_hdnReasonCode").val(reasonCode);
    //                $("#columnChartCoaching_hdnQuantity").val(quantity);
    //            }

    //        });
    if (phase === 'move') {
        degree += data.degreeDelta;
        $target.css('webkitTransform', 'rotate3d(0,0,1,' + degree + 'deg)'); // 3d transforms are not working on the galaxy tab 7" ?  

    }
}

function enableTouchMove() {

    $('#cnPiechart').bind('touchy-rotate', handleTouchyRotate);
}

function displayLineChart() {

    $('#cnPiechart').unbind('touchy-rotate');

    var canvas = document.getElementById("cnPiechart");
    var metricName;
    var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));
    var context = canvas.getContext('2d');

    var ar = rotate(475, 350, 350, 350, -1 * degree);
    var p = context.getImageData(ar[0], ar[1], 1, 1).data;

    if (p[0] == 160 && p[1] == 102 && p[2] == 198) {
        metricName = "AHT";
    }

    if (p[0] == 235 && p[1] == 224 && p[2] == 68) {
        metricName = "Attendance";
    }
    if (p[0] == 45 && p[1] == 190 && p[2] == 220) {
        metricName = "Bill To Pay";
    }

    if (p[0] == 38 && p[1] == 218 && p[2] == 34) {
        if (metricsNm.indexOf('Conversion Rate') == -1)
            metricName = "Appointment Rate";
        else
            metricName = "Conversion Rate";
    }

    if (p[0] == 255 && p[1] == 17 && p[2] == 73) {
        metricName = "CSAT Survey Result";
    }

    if (p[0] == 233 && p[1] == 156 && p[2] == 48) {
        metricName = "Non Productive Time";
    }

    if (p[0] == 226 && p[1] == 85 && p[2] == 132) {
        metricName = "Quality Score";
    }
    if (p[0] == 157 && p[1] == 51 && p[2] == 31) {
        metricName = "Coaching Effectiveness";
    }
    if (metricName == "" || metricName == undefined) {
        degree = degree + 1;
        $('#cnPiechart').bind('touchy-rotate');
        $('#cnPiechart').css('webkitTransform', 'rotate3d(0,0,1,' + degree + 'deg)');
        $('#cnPiechart').unbind('touchy-rotate');
        var ar = rotate(475, 350, 350, 350, -1 * degree);
        var p = context.getImageData(ar[0], ar[1], 1, 1).data;
        metricName = getMetricName(p);
    }

    if (metricName != "" || metricName != undefined) {
        //    $("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricName);
        //    $("#imgLineChart").attr("src", "LineGraph.aspx?AgentID=" + agent + "&Metric=" + metricName);
        imgColumnChartArray[prevSelectedSegment].css("display", "none");

        if (metricName == "Non Billable Aux Time") {
            imgColumnChartArray["Non Productive Time"].css("display", "");
            imgLineChartArray[prevSelectedSegment].css("display", "none");
            imgLineChartArray["Non Productive Time"].css("display", "");
            prevSelectedSegment = "Non Productive Time";

        }
        else {
            imgColumnChartArray[metricName].css("display", "");
            imgLineChartArray[prevSelectedSegment].css("display", "none");
            imgLineChartArray[metricName].css("display", "");
            prevSelectedSegment = metricName;
        }
    }

    var computedStyle = window.getComputedStyle(canvas, null);
    var tr = computedStyle.getPropertyValue("-webkit-transform") || computedStyle.getPropertyValue("-moz-transform") ||
         computedStyle.getPropertyValue("-ms-transform") ||
         computedStyle.getPropertyValue("-o-transform") ||
         computedStyle.getPropertyValue("transform") ||
         "fail...";
    var values = tr.substring(7, (tr.length - 1));
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a * a + b * b);
    var sin = b / scale;
    rotatedDegree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    rotatedDegree = rotatedDegree * -1;
    flagCollision = false;
    totalPercentage = 0;

    for (var segmentCt = 0; segmentCt < segCT + 1; segmentCt++) {
        context.save();
        drawMetricLabels(canvas, context, sAngle[segmentCt], eAngle[segmentCt], mNames[segmentCt], segmentCt, -1 * degree);
    }

    // displaying total coaching sesson at centre   
    context.save();
    context.beginPath();
    var tx = 350;
    var ty = 350;
    context.translate(tx, ty);
    context.rotate(((degree * -1) * Math.PI) / 180);
    context.translate(-tx, -ty);
    context.font = 10 + "pt Arial";
    //   context.fillText("Total Coaching", 315, 350);
    context.fillText(total, 340, 355);

    context.restore();

    if (flag)
        writeLabels(segCT);
}

function writeLabels(segmentCnt) {
    flag = false;
    var canvas = document.getElementById('tip');
    var context = canvas.getContext('2d');
    var percentage = 0;
    context.font = 13 + "px Helvetica";
    for (var count = 0; count <= segmentCnt; count++) {
        context.save();

        if (metricsNm[count] == "Non Productive Time") {

            context.fillStyle = "white";
        }

        context.fillStyle = segColor[count];
        context.fillRect(10, (count + 1) * 18 - 5, 5, 5);
        context.fillText(metricsNm[count], 20, (count + 1) * 18);


        //        percentage = (metricQty[count] * 100) / 360;
        //        context.fillText(percentage.toFixed(2)+"%", 30 + context.measureText(metricsNm[count]).width, (count + 1) * 18);
        context.restore();
    }
}

function CoachngPieChart_rotateOnMouse(e, pw) {

    var offset = pw.offset();
    var degree = (angle * (180 / Math.PI)) + 0;

    $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
    $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
    $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
    $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');
    $(pw).css('transform', 'rotate(' + degree + 'deg)');

    //    context.rotate((degree * Math.PI) / 180);
    redraw(-1 * degree, xValues, yValues, segCT, metricsNm);
    //lblRotAng = degree;
}

function redraw(degree, xValues, yValues, segCT, metricsNm) {

    angleInDegrees = degree;
    var canvas = document.getElementById('cnPiechart');
    var context = canvas.getContext('2d');
    var metricWords;
    var prev_x, prev_y;
    for (var ctr = 0; ctr <= segCT; ctr++) {
        context.beginPath();
        context.save();
        var txtWidth; // = context.measureText(metricsNm[ctr]).width;
        if (ctr == 0) {
            fillCircle(350, 350, 27, context);
        }
        if (metricsNm[ctr] == "AHT") {
            txtWidth = context.measureText(' AHT  ').width;
            //            fillCircle(xValues[ctr], yValues[ctr], 73,context);
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        else if (metricsNm[ctr] == "Attendance") {
            txtWidth = context.measureText(' Attendance  ').width;
            //        fillCircle(xValues[ctr] , yValues[ctr], txtWidth);
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        else if (metricsNm[ctr] == "Conversion Rate") {
            txtWidth = context.measureText(' Conversion Rate ').width;
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        else if (metricsNm[ctr] == "Appointment Rate") {
            txtWidth = context.measureText(' Appointment Rate ').width;
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        else if (metricsNm[ctr] == "Quality Score") {
            txtWidth = context.measureText(' Quality  Score  ').width;
            //            fillCircle(xValues[ctr], yValues[ctr], txtWidth)                 
            clearCircle(xValues[ctr], yValues[ctr], 73, context);

        }
        else if (metricsNm[ctr] == "CSAT Survey Result") {
            txtWidth = context.measureText('CSATSurvey Result').width;
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        else if (metricsNm[ctr] == "Non Billable Aux Time") {
            txtWidth = context.measureText(' Non Billable Aux').width;
            //            fillCircle(xValues[ctr], yValues[ctr], txtWidth)
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        else if (metricsNm[ctr] == "Bill To Pay") {
            txtWidth = context.measureText(' Bill To Pay ').width;
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        else {
            txtWidth = context.measureText(metricsNm[ctr]).width;
            clearCircle(xValues[ctr], yValues[ctr], 73, context);
        }
        context.restore();
    }
}

var fillCircle = function (x, y, radius, context) {
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
};
var clearCircle = function (x, y, radius, context) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.clip();
    context.clearRect(x - radius - 1, y - radius - 1,
                      radius * 2 + 2, radius * 2 + 2);
};


PieChart.prototype = {
    select: function (segment) {
        var self = this;
        var context = this.canvas.getContext("2d");
        this.drawSegment(this.canvas, context, segment, this.data[segment], true, this.includeLabels);
    },

    draw: function () {
        var self = this;
        var context = this.canvas.getContext("2d");

        // Set the shadow properties that control the appearance of the shaow
        totalMetrics = this.data.length;
        for (var segmentCt = 0; segmentCt < this.data.length; segmentCt++) {
            this.drawSegment(this.canvas, context, segmentCt, this.data[segmentCt], false, this.includeLabels);
        }

        context.restore();
        context.beginPath();
        context.arc(Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2), 30, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();

        context.restore();
        context.font = 10 + "pt Arial";
        context.fillStyle = 'white';
        //context.fillText("Total Coaching", 315, 350);
        context.fillText(total, 340, 355);

        //Set Black Rounded Border Around the PieChart
        context.beginPath();
        context.arc(Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2), 180.5, 0, 2 * Math.PI);
        context.lineWidth = 10;
        context.strokeStyle = '#302C30';
        context.stroke();

        //segCT = segmentCt;

    },

    drawSegment: function (canvas, context, segmentCt, size, isSelected, includeLabels) {
        //
        var self = this;

        context.save();
        var centerX = Math.floor(canvas.width / 2);
        var centerY = Math.floor(canvas.height / 2);
        radius = 180; // Math.floor(canvas.width / 2);

        var startingAngle = self.degreesToRadians(self.sumTo(self.data, segmentCt));
        var arcSize = self.degreesToRadians(size);
        var endingAngle = startingAngle + arcSize;
        //var prcnt = self.getPrcent(self.data, segmentCt);

        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
        context.closePath();

        isSelected ?
                        context.fillStyle = self.colors[segmentCt][1] :
                        context.fillStyle = self.colors[segmentCt][0];
        segColor[segmentCt] = self.colors[segmentCt][0];
        context.fill();



        //Sets the path for the Shadow
        context.beginPath();
        context.arc(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 180.5, 0, endingAngle, true);
        context.clip();
        context.closePath();


        // Set the Shadow effect around the PieChart when it reaches the last segment 
        if (segmentCt == 6) {
            context.beginPath();
            context.strokeStyle = "rgba(128, 128, 128, 0.5)";
            context.lineWidth = 10;
            context.shadowBlur = 15;
            context.shadowColor = 'black';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.arc(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 180.5, 0, endingAngle, true);
            context.closePath();
            context.stroke();
        }

        context.restore();
        //Draw tagged Label
        //drawMetricLabels(startingAngle);


        sAngle[segmentCt] = startingAngle;
        eAngle[segmentCt] = endingAngle;
        mNames[segmentCt] = self.labels[segmentCt];


        if (includeLabels && (self.labels.length > segmentCt)) {
            //self.drawSegmentLabel(canvas, context, segmentCt, startingAngle, endingAngle, isSelected);
            drawMetricLabels(canvas, context, startingAngle, endingAngle, self.labels[segmentCt], segmentCt, 0);
            metricsNm[segmentCt] = self.labels[segmentCt];
        }

        segCT = segmentCt;

    },


    drawSegmentLabel: function (canvas, context, segmentCt, startingAngle, endingAngle, isSelected) {

        var self = this;
        context.save();
        var x = Math.floor(canvas.width / 2);
        var y = Math.floor(canvas.height / 2);
        var angle;
        var angleD = self.sumTo(self.data, segmentCt);
        var flip = (angleD < 90 || angleD > 270) ? false : true;
        var prcnt = Math.floor(((self.data[segmentCt] / 360) * 100));

        //        context.translate(x, y);
        //        //Rotate labels
        //        context.textAlign = "right";
        //        angle = self.degreesToRadians(angleD);
        //        context.rotate(angle);

        //var fontSize = Math.floor(canvas.height / 35);
        context.font = 11 + "pt Helvetica";
        context.fillStyle = 'white';
        //var pos1 = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180, self.labels[segmentCt]);
        var dx = Math.floor(canvas.width * 0.5) - 10;
        var dy = Math.floor(Math.floor(canvas.height / 2) * 0.05);
        //var dy = Math.floor(canvas.height / 2) + 180 * Math.sin(((startingAngle + endingAngle) / 2))


        if (self.labels[segmentCt] == "AHT") {
            //context.fillText(prcnt + "%", 200, 60);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx - 90, dy);
        }
        else if (self.labels[segmentCt] == "Attendance") {
            //context.fillText(prcnt + "%", 180, 60);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx - 40, dy);
        }
        else if (self.labels[segmentCt] == "Conversion Rate") {
            //context.fillText(prcnt + "%", 180, 60);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx - 15, dy);
        }
        else if (self.labels[segmentCt] == "Appointment Rate") {
            //context.fillText(prcnt + "%", 180, 60);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx - 15, dy);
        }
        else if (self.labels[segmentCt] == "Quality Score") {
            //context.fillText(prcnt + "%", 180, 60);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx - 40, dy);
        }
        else if (self.labels[segmentCt] == "CSAT Survey Result") {
            //context.fillText(prcnt + "%", 180, 60);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx + 15, dy);
        }
        else if (self.labels[segmentCt] == "Non Billable Aux Time") {
            //context.fillText(prcnt + "%", 180, 60);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx + 12, dy);
        }
        else if (self.labels[segmentCt] == "Bill To Pay") {
            //context.fillText(prcnt + "%", 180, dy + 20);
            if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
            context.fillText(self.labels[segmentCt], dx - 50, dy);
            //alert("diff:" + (endingAngle - startingAngle) + "; sa:" + startingAngle + "; ea:" + endingAngle);

        }
        context.restore();
    },

    drawLabel: function (segmentCt) {
        var self = this;
        var context = this.canvas.getContext("2d");
        var size = self.data[segmentCt];
        self.drawSegmentLabel(this.canvas, context, segmentCt, size, false);
    },


    // helper functions
    degreesToRadians: function (degrees) {
        return (degrees * Math.PI) / 180;
    },

    sumTo: function (a, segmentCt) {
        var sum = 0;
        for (var j = 0; j < segmentCt; j++) {
            sum += a[j];
        }
        return sum;
    }
}

function getPointsOnCircle(cx, cy, a, r, metricName) {
    if (metricName == "AHT") {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    else if (metricName == "Attendance") {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    else if (metricName == "Bill To Pay") {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    else if (metricName == "Conversion Rate") {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    else if (metricName == "Appointment Rate") {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    else if (metricName == "CSAT Survey Result") {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    else if (metricName == "Quality Score") {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    else {
        x = cx + (r + 80) * Math.cos(a)
        y = cy + (r + 80) * Math.sin(a)
    }
    return { x: x, y: y };
}

function getSegmentCenter(cx, cy, a, r) {

    x = cx + r * Math.cos(a);
    y = cy + r * Math.sin(a);

    return { x: x, y: y };
}


function drawMetricLabels(canvas, context, startingAngle, endingAngle, metricName, ct, angleInDegrees) {

    var platform = navigator.platform;
    if (platform == "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement)
        //    if (isTouchDevice) {

        angleInDegrees = rotatedDegree;
    }
    context.save();
    context.beginPath();
    var words, angleDiff;

    var xPosition, yPosition, xLineEnd, yLineENd;
    var pos = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180, metricName);
    metricsNm[ct] = metricName;
    strtAng[ct] = startingAngle;
    endAng[ct] = endingAngle;

    var percentage;
    percentage = ((metricQty[ct] * 100) / 360);
    var percentageRounded = Number(percentage.toFixed(1));

    if (ct == (totalMetrics - 1)) {

        percentageRounded = (100 - totalPercentage).toFixed(1);
    }
    totalPercentage = totalPercentage + percentageRounded;

    var txtWidth = context.measureText(percentage.toFixed(2)).width;
    var segmentCenter = getSegmentCenter(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180);
    xPosition = pos.x;
    yPosition = pos.y;
    xLineEnd = pos.x;
    yLineENd = pos.y;

    var ar = rotate(475, 350, 350, 350, angleInDegrees);
    var t1 = Math.round(ar[0]);
    var t2 = Math.round(ar[1]);

    //angle between segment center,arrow head,center of circle(0-90-180)
    var AB = Math.sqrt(Math.pow(350 - segmentCenter.x, 2) + Math.pow(350 - segmentCenter.y, 2));
    var BC = Math.sqrt(Math.pow(350 - t1, 2) + Math.pow(350 - t2, 2));
    var AC = Math.sqrt(Math.pow(t1 - segmentCenter.x, 2) + Math.pow(t2 - segmentCenter.y, 2));
    var angle = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
    var angleAfterRotation = Math.round(angle * (180 / Math.PI));

    //    if (angleInDegrees != 0) {

    var tx = pos.x;
    var ty = pos.y + 5;
    context.translate(tx, ty);
    context.rotate((angleInDegrees * Math.PI) / 180);
    context.translate(-tx, -ty);
    //    }

    //setting the initial angle for segments to get in (0 to -90 to -180).
    if (flagInitial) {

        if (yPosition > t2) {
            pAng[ct] = angleAfterRotation * -1;
            angleAfterRotation = angleAfterRotation * -1;
        }
        else {
            pAng[ct] = angleAfterRotation;
        }

        if (ct == totalMetrics - 1) {

            flagInitial = false;
        }
    }

    //calc for angle b/w segment center,arrow head,center of circle (180-90-0 to-90 to-180) while rotation
    if (angleInDegrees > 0) {
        // +ve

        if (pAng[ct] > 0) {
            angleAfterRotation = pAng[ct] + angleInDegrees;
            if (angleAfterRotation > 180) {
                angleAfterRotation = angleAfterRotation - 360;
            }
        }
        if (pAng[ct] < 0) {
            angleAfterRotation = pAng[ct] + angleInDegrees;

        }
    }
    else {
        //-ve
        if (pAng[ct] > 0) {
            angleAfterRotation = pAng[ct] + angleInDegrees;

        }
        else {
            angleAfterRotation = pAng[ct] + angleInDegrees;
            if (angleAfterRotation < -180) {
                angleAfterRotation = 360 + angleAfterRotation;
            }
        }
    }

    //shifting values either left or right

    if (angleAfterRotation <= 90 && angleAfterRotation >= 0) {

        xPosition = xPosition + 5;

    } else if (angleAfterRotation >= -90 && angleAfterRotation <= 0) {
        xPosition = xPosition + 5;
    }
    else {

        xPosition = xPosition - (txtWidth);
    }

    //collision check

    if (angleAfterRotation <= 120 && angleAfterRotation >= 90) {
        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {

            //  alert("collision");
            yPosition = yPosition - 15;
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 + 15, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
        else {

            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 5, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }

    } else if (angleAfterRotation >= -120 && angleAfterRotation <= -90) {

        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {

            //  alert("collision");
            yPosition = yPosition + 15;
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 15, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
        else {
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 20, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
    }
    else if (angleAfterRotation < 180 && angleAfterRotation >= 120) {
        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {

            yPosition = yPosition - 15;
            // alert("collision");
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 5, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
        else {

            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 15, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
    }
    else if (angleAfterRotation >= -180 && angleAfterRotation <= -120) {

        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
            // alert('collision');
            yPosition = yPosition - 15;
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 5, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
        else {

            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 15, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
    }
    else if (angleAfterRotation >= -90 && angleAfterRotation <= -40) {
        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
            //  alert('collision');
            yPosition = yPosition + 15;

            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
        else {
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 20, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
    }
    else if (angleAfterRotation >= -40 && angleAfterRotation <= 0) {
        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
            yPosition = yPosition + 15;
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;

        }
        else {
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }
    }
    else if (angleAfterRotation >= 40 && angleAfterRotation <= 90) {
        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
            yPosition = yPosition + 15;
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;

        }
        else {
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }

    }
    else {
        if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
            // alert('collision');
            yPosition = yPosition + 15;
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;

        }
        else {
            var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
            yLineENd = newPosition.y;
            xLineEnd = newPosition.x;
        }


    }

    context.beginPath();
    //context.font = "italic bold 10pt Calibri";
    context.font = 10 + "pt Arial";
    //    context.shadowColor = "black";
    //    context.shadowBlur = 0;

    // context.fillStyle = 'white';
    if ($("#hdnTheme").val() == "b") {
        context.fillStyle = 'black';
    }
    else if ($("#hdnTheme").val() == "c") {
        context.fillStyle = 'black';
    }
    else if ($("#hdnTheme").val() == "e") {
        context.fillStyle = 'black';
    }
    else {
        context.fillStyle = 'white';
    }




    //    if (metricName == "Conversion Rate") {

    //        words = metricName.split(' ');
    //        context.fillText(words[0], xPosition, yPosition);
    //        context.fillText(words[1], xPosition, yPosition + 10);
    //    }
    //    else if (metricName == "CSAT Survey Result") {

    //        words = metricName.split(' ');
    //        context.fillText(words[0], xPosition, yPosition);
    //        context.fillText(words[1] + " " + words[2], xPosition, yPosition + 10);
    //    }
    //    else if (metricName == "Non Billable Aux Time") {

    //        words = metricName.split(' ');
    //        context.fillText(words[0] + " " + words[1], xPosition, yPosition);
    //        context.fillText(words[1] + " " + words[2], xPosition, yPosition + 10);
    //    }
    //    else {



    context.fillText(percentageRounded + "%", xPosition, yPosition);
    //    }

    prevXValue = xPosition;
    prevYVal = yPosition;
    context.restore();

    //draw line from segment center to the values
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    var lineStart = getSegmentCenter(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 + 7.2);
    context.moveTo(lineStart.x, lineStart.y);
    context.lineTo(xLineEnd, yLineENd);
    context.stroke();

    if ($("#hdnTheme").val() == "b") {
        context.fillStyle = 'black';
    }
    else if ($("#hdnTheme").val() == "c") {
        context.fillStyle = 'black';
    }
    else if ($("#hdnTheme").val() == "e") {
        context.fillStyle = 'black';
    }
    else {
        context.fillStyle = 'white';
    }

    //context.fillStyle = 'white';
    context.fillRect(xLineEnd - 1, yLineENd - 1, 4, 4);
    context.restore();

    //save the x,y pos for clearing in redraw()
    xValues[ct] = pos.x;
    yValues[ct] = pos.y;
}

rect_collision = function (context, angle, x1, y1, size1, x2, y2, size2) {

    var DistanceX = x1 - x2;
    var DistanceY = y1 - y2;
    var DistanceCenter = Math.sqrt(DistanceX * DistanceX + DistanceY * DistanceY);
    var CollisionDistance = 18;
    if (20) CollisionDistance += 18;

    if ((DistanceCenter <= CollisionDistance)) {

        return true;
    }
};

function rotate(x, y, xm, ym, a) {
    var cos = Math.cos,
        sin = Math.sin,

        a = a * Math.PI / 180, // Convert to radians because that's what
    // JavaScript likes

    // Subtract midpoints, so that midpoint is translated to origin
    // and add it in the end again
        xr = (x - xm) * cos(a) - (y - ym) * sin(a) + xm,
        yr = (x - xm) * sin(a) + (y - ym) * cos(a) + ym;

    return [xr, yr];
}

function CoachngPieChart_is_touch_device() {
    var platform = navigator.platform;
    if (platform == "iPad") {

        return true;
    }
    else {

        return false;
    }

    //    return 'ontouchstart' in window // works on most browsers 
    //                || 'onmsgesturechange' in window; // works on ie10


};

function CoachngPieChart_swiperightHandler(event) {
    //var ReturnUrl1 = window.history.go(-1);
    $.mobile.changePage("",
            {
                transition: "slide",
                changeHash: true,
                reverse: true
            }, reloadPage = false);
}

function CoachngPieChart_excludePie(event) {
    event.stopPropagation();
    event.preventDefault();
}



/*----------SingleAgent Page---------------*/


function AddEventClient() {



    var title = $("#txtTitle").val();
    var From = $("#txtFrom").val();
    var To = $("#txtTo").val();
    var Descr = $("#txtDescrp").val();
    var EventData = JSON.stringify({ Summary: title, Start: From, End: To, Description: Descr });
    $("#hdnEventData").val(EventData);
    $("#popUpCreateEvent").popup("close");

    return true;
}

function SingleAgnt_addBookmark() {


    var selected = $("input[type='radio'][name='radio-choice-h-2']:checked");

    var url = document.URL;
    var newUrl = url.split('&');
    url = newUrl[0] + "&periodValue=" + selected.val() + "&sliderValue=" + $('#slider-1').val();
    // alert(url);
    //    var result = [];
    //    var searchIndex = url.indexOf("?");
    //    var sPageURL = url.substring(searchIndex + 1);
    //    var sURLVariables = sPageURL.split('&');

    //    for (var i = 0; i < sURLVariables.length; i++) {
    //        var sParameterName = sURLVariables[i].split('=');
    //        result[sParameterName[0]] = sParameterName[1];
    //    }
    //    result["sliderValue"] = $('#slider-1').val();
    //    result["periodValue"] = selected.val();

    // var urlsplit = url.split('?');
    var description = document.getElementById('txtBookmarkName').value;
    var startTenure = "";
    var endTenure = "";
    var calltype = $('#select-choice').val();
    var multipleValues = "";
    var obj = { offsetValue: $('#slider-1').val(), period: selected.val(), description: description, startTenure: startTenure, endTenure: endTenure, callType: calltype, tenure: multipleValues, url: url };
    jQuery.ajax({
        url: 'AllAgent.aspx/AddBookmark',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            document.getElementById('txtBookmarkName').value = "";
            $('#bookmarkAddPopupSingl').popup("close");
        }
    });

}

function SingleAgnt_cancelBookmark() {
    document.getElementById('txtBookmarkName').value = "";
    $('#bookmarkAddPopupSingl').popup("close");
}

function SingleAgnt_viewBookmark() {
    $('#bookmarkPopupSingl').popup("close");
    jQuery.ajax({
        url: 'AllAgent.aspx/ViewBookmark',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SingleAgnt_Bookmark
    });
}

function SingleAgnt_Bookmark(data) {
    $("div#bookmarkdivSingl").empty();
    var urlView, pageName, url;

    for (var i = 0; i < data.d.length; i = i + 11) {

        data.d[i] = data.d[i].replace("pages", "Pages");
        url = data.d[i].split('Pages/')

        var pageName = url[1].split('.');

        if (pageName[0] == "FirstLevelManager/BalancedScoreCard" || pageName[0] == "FirstLevelManager/SingleAgent") {

            urlView = data.d[i];

            //var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            // alert(newURL);
            //            newURL = location.host + newURL;

            $("div#bookmarkdivSingl").append('<a href="' + url[1] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else if (pageName[0] == "QualityForm") {

            $("div#bookmarkdivAll").append('<a href="' + url[1] + "?AgentId=" + data.d[i + 9] + "&url=" + data.d[i + 10] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else {

            urlView = data.d[i] + "?id1=" + "Bookmark" + "&id2=" + data.d[i + 1] + "&id3=" + data.d[i + 2] + "&id4=" + data.d[i + 3] + "&id5=" + data.d[i + 4] + "&id6=" + data.d[i + 5] + "&id7=" + data.d[i + 6] + "&id8=" + data.d[i + 7];
            var newUrl = urlView.split('Pages/');
            //  var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            //   newURL = location.host + newURL;
            $("div#bookmarkdivSingl").append('<a href="' + newUrl[1] + '">' + " " + data.d[i + 8] + '</a>' + '<br/>');
        }
    }
}

function DisablePopUp_SingleAgent() {
    $('.scrollable').on('scroll', function () {
        $("#coachTablePopUp").popup("close");
    });
}

function SngleAgnt_Ready() {
    $("#popupLineGraph").bind({
        popupafterclose: function (event, ui) {
            $("#imgLineGraph").attr("src", "");
            $(document).unbind('touchmove', false); //Unbind the prevented touch events after popup close
        }
    });

    DisablePopUp_SingleAgent();
    $("#homeBttn").click(function () {
        $(this).addClass("ui-btn-active");
        // window.location = "/Pages/FirstLevelManager/Tiles.aspx";
        window.location.href = "AllAgent.aspx?periodValue=" + $("#hdnPeriodValue").val() + "&sliderValue=" + $('#hdnSliderValue').val();
    });
    setInterval(function () { SngleAgnt_getDate() }, 250);

    setCoachwidth();

    $("#select-choice-2").val($("#hdnCallType").val());
    $("#select-choice-2").selectmenu("refresh", true);

    SngleAgnt_AdjustTableHeight();
    SngleAgnt_getServerDate();

    var periodValue = $("#hdnPeriodValue").val();
    $("#radio" + periodValue).attr('checked', 'checked').checkboxradio("refresh");
    $("#slider-1").val($("#hdnSliderValue").val()); //slider sustainablity

    $(window).on("orientationchange", function (event) {
        SngleAgnt_AdjustTableHeight();
    });
    window.onresize = function (event) {
        SngleAgnt_AdjustTableHeight();
    }

    // get server date when slider stop
    $("#slider-1").on('slidestop', function (event) {

        SngleAgnt_getServerDate();
        $("#hdnSliderValue").val($('#slider-1').val());
        //$("#btnApply").click();

    });

    var popupDisplayed = false;



    $.mobile.loading("show", {
        text: "Loading...",
        textVisible: true,
        // theme: $("#hdnTheme").val(),
        textonly: true
    });

    $(document).on('change', '[name="radio-choice-h-2"]', function () {
        var selected = $("input[type='radio'][name='radio-choice-h-2']:checked");
        $("#hdnPeriodValue").val(selected.val());
        SngleAgnt_getDate();
        //$("#btnApply").click();
    });

    $("#slider-1").slider("refresh");
}


var metricValue;

function btnApplyClick() {
    $("#btnApply").prev().css("color", "RoyalBlue");
    $("#hdnCallType").val($("#select-choice-2").val());
}
function RedirectToQualityForm() {
    if ($("#hdnTheme").val() == "a") {
        //$("#lnkSchedule").css("background-color", "#3388CC");
        $("#lnkQualityForm").css("background-color", "#3388CC");
        //$("#lnkAssignTraining").css("background-color", "#3388CC");
    }
    else {
        $("#lnkQualityForm").addClass("ui-btn-active");
    }
 
    var url = document.URL;
    window.location.href = "/Pages/FirstLevelManager/QualityForm.aspx?AgentId=" + document.getElementById('hdnAgentId').value + "&periodValue=" + $("#hdnPeriodValue").val() + "&sliderValue=" + $("#hdnSliderValue").val() + "&url=" + encodeURIComponent(url);  //+ "&AgentId=" + document.getElementById('hdnAgentId').value;
}
function SngleAgnt_PageRedirect() {
    if ($("#hdnTheme").val() == "a") {
        $("#lnkCoachNow").css("background-color", "#3388CC");
        //$("#lnkSchedule").css("background-color", "#3388CC");
        //$("#lnkQualityForm").css("background-color", "#3388CC");
        //$("#lnkAssignTraining").css("background-color", "#3388CC");
    }
    else {
        $("#lnkCoachNow").addClass("ui-btn-active");
    }
    var refrr = $('#hdnUrl').val();
    var hidderValue = document.getElementById('hdnAgentId').value;
    var offsetType = document.getElementById('hdnPeriodValue').value;
    var offset = document.getElementById('hdnSliderValue').value;
    
    var metricValue = $("#popUpCoach").attr('MetricName');
    if (refrr.indexOf("AllAgent.aspx") >= 0 || refrr.indexOf("BalancedScoreCard.aspx") >= 0) {

        if (refrr.indexOf("Coaching.aspx") >= 0) {

            refrr = refrr.split('&ReturnPage=');
            window.location = "/Pages/FirstLevelManager/Coaching.aspx?agentId=" + hidderValue + "&metricValue=" + metricValue + "&BkUrl=" + encodeURIComponent(document.URL) + "&periodValue=" + offsetType + "&sliderValue=" + offset + "&ReturnPage=" + encodeURIComponent(refrr[1]);
        }
        else {

            window.location = "/Pages/FirstLevelManager/Coaching.aspx?agentId=" + hidderValue + "&metricValue=" + metricValue + "&BkUrl=" + encodeURIComponent(document.URL) + "&periodValue=" + offsetType + "&sliderValue=" + offset + "&ReturnPage=" + encodeURIComponent(refrr);
        }
    }
    else {

        refrr = "";
        window.location = "/Pages/FirstLevelManager/Coaching.aspx?agentId=" + hidderValue + "&metricValue=" + metricValue + "&BkUrl=" + encodeURIComponent(document.URL.split("?")[0]) + "&periodValue=" + offsetType + "&sliderValue=" + offset + "&ReturnPage=" + encodeURIComponent(refrr);
    }

}


function SngleAgnt_KnowledgeBase_PageRedirect() {
 
    if ($("#hdnTheme").val() == "a") {
        //$("#lnkSchedule").css("background-color", "#3388CC");
        $("#lnkAssignTraining").css("background-color", "#3388CC");
    }
    else {
        $("#lnkAssignTraining").addClass("ui-btn-active");
    }

    var agentId = Coaching_getURLParameters($(location).attr('href'))['agentId'];
    window.location.href = "/Pages/FirstLevelManager/KnowledgeBase.aspx?MetricName=" + $("#popUpCoach").attr('MetricName') + "&agentId=" + agentId + "&BkUrl=" + encodeURIComponent(document.URL);

}

//function CoachingPieChart_Redirect() {
//    alert("Hi");
//    window.location.href = "CoachingPieChart.aspx?agentId=" + $("#hdnAgentId").val() + "&BkUrl=" + encodeURIComponent($.mobile.urlHistory.getActive().url);
//}


function SngleAgnt_displayCoach(value) {
    
    value=value.replace(/%20/g, " ");
    $("#popUpCoach").attr('MetricName', value);

    $("#popUpCoach").popup("open"); //, 400, 400);
}

function SngleAgnt_getServerDate() {
    var obj = {};
    jQuery.ajax({
        url: 'SingleAgent.aspx/GetServerDate',
        type: "POST",
        data: JSON.stringify(obj),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            
            $("#hdnSrvtDtime").val(data.d);
            SngleAgnt_getDate();
        }

    });
}


function checkMode() {
    var o = window.orientation; var orNm;
    if (o != 90 && o != -90) {
        // here goes code for portrait...
        orNm = "portrait";
    } else {
        // here goes for landscape...
        orNm = "landscape";
    }
    return orNm;
}

function SngleAgnt_AdjustTableHeight() {
    var ver = iOSversion();
    var winHeight = $(window).height();

    var platform = navigator.platform;
    if (platform != "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement)
        //    if (!isTouchDevice) {
        $(".scrollable").css("height", winHeight - 544);
        $(".scrollable").css("overflow-y", "scroll");

    } else {
        if (ver[0] > 6)
            $(".extraTr").css("display", "inherit");
        else
            $(".extraTr").css("display", "none");
        var mode = checkMode();
        if (mode == "landscape") {
            $(".scrollable").css("height", winHeight - 540);
        }
        else {
            $(".scrollable").css("height", winHeight - 560);
        }
        $(".scrollable").css("overflow-y", "scroll");
    }
}

function SngleAgnt_getDate() {
    var servrDat = $("#hdnSrvtDtime").val();
    var sliderVal = $("#slider-1").val();
    if (servrDat != '') {

        var mySplitResult = servrDat.split(",");

        var a = new Date(mySplitResult[0], mySplitResult[1]-1, mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);

        var selected = $("input[type='radio'][name='radio-choice-h-2']:checked");
        
        switch (selected.val()) {

            case 'MONTHLY':
                $("#LblDaily").text(a.addMonths(parseInt(sliderVal)).toString('MMM yyyy'));
                break;

            case 'DAILY':
                var dt = a.addDays(sliderVal);
                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');

                if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                }

                else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                }
                else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                }
                else {
                    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                }
                break;

            case 'WEEKLY':

                var dt;
                if (sliderVal == 0) {
                    dt = a;
                }
                else {
                    dt = a.sunday();
                    dt.addWeeks(sliderVal);
                }

                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');

                if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                }

                else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                }
                else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                }
                else {
                    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                }

                break;

            case 'INTRADAY':

                var dt = a.addHours(sliderVal);
                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');
                var hr = dt.toString('h');
                var tt = dt.toString('tt');
                if (hr == 0) { hr = 12; }

                if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                }

                else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                }
                else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                }
                else {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                }
                break;
        }
    }
}

function SngleAgnt_BackPage() {
    

    var prevUrl = $('#hdnUrl').val();
    if ($("#hdnReturnTile").val() == "true") {
        window.location = "/Pages/FirstLevelManager/Tiles.aspx";
    }
    else {

        if ($("#hdnReturnPage").val() != "") {
            var ret = decodeURIComponent($("#hdnReturnPage").val());


            if (ret.indexOf("BalancedScoreCard") >= 0) {
                if ($("#hdnTileUrl").val() == "true") {
                    window.location = "/Pages/FirstLevelManager/BalancedScoreCard.aspx?agentId=" + $("#hdnMngrId").val() + "&periodValue=" + $("input[type='radio'][name='radio-choice-h-2']:checked").val() + "&sliderValue=" + $('#slider-1').val() + "&tileUrl=true";
                }
                else {
                    window.location = "/Pages/FirstLevelManager/BalancedScoreCard.aspx?agentId=" + $("#hdnMngrId").val() + "&periodValue=" + $("input[type='radio'][name='radio-choice-h-2']:checked").val() + "&sliderValue=" + $('#slider-1').val();
                }
            }
            else {
                window.location = "/Pages/FirstLevelManager/AllAgent.aspx?periodValue=" + $("input[type='radio'][name='radio-choice-h-2']:checked").val() + "&sliderValue=" + $('#slider-1').val();
            }
        }
        else if (prevUrl.indexOf("BalancedScoreCard") >= 0) {
            if ($("#hdnTileUrl").val() == "true") {
                window.location = "/Pages/FirstLevelManager/BalancedScoreCard.aspx?agentId=" + $("#hdnMngrId").val() + "&periodValue=" + $("input[type='radio'][name='radio-choice-h-2']:checked").val() + "&sliderValue=" + $('#slider-1').val() + "&tileUrl=true";
            }
            else {
                window.location = "/Pages/FirstLevelManager/BalancedScoreCard.aspx?agentId=" + $("#hdnMngrId").val() + "&periodValue=" + $("input[type='radio'][name='radio-choice-h-2']:checked").val() + "&sliderValue=" + $('#slider-1').val();
            }
        }
        else {
            window.location = "/Pages/FirstLevelManager/AllAgent.aspx?periodValue=" + $("input[type='radio'][name='radio-choice-h-2']:checked").val() + "&sliderValue=" + $('#slider-1').val();
        }
    }

    $("#backButton").addClass("ui-btn-active");
}



function SingleAgent_WindowLoad() {
    $("#imgAhtGraph").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgAhtGraph").data("yvalue"));
    $("#imgAttGraph").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgAttGraph").data("yvalue"));
    $("#imgCRGraph").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgCRGraph").data("yvalue"));
    $("#imgQSGraph").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgQSGraph").data("yvalue"));
    $("#imgCSATGraph").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgCSATGraph").data("yvalue"));
    $("#imgNBATGraph").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgNBATGraph").data("yvalue"));
    $("#imgBTPGraph").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgBTPGraph").data("yvalue"));
}

function SinglAgnt_ToolsClick() {

    // .position() uses position relative to the offset parent,
    var pos = $("#imgToolSingl").position();

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();

    var windowWidth = $(window).width();
    //show the menu directly over the placeholder
    $("#screenshotPopupSingle").css({
        position: "absolute",
        //bottom: pos.top + "px",
        // left: (pos.left - windowWidth / 4.9) + "px"
    });
    $("#screenshotPopupSingle")[0].style.left = (pos.left - ($("#screenshotPopupSingle").width() / 2.4)) + "px";
    $("#screenshotPopupSingle")[0].style.bottom = $("#pos").position().top + "px";

    $("#screenshotPopupSingle").popup("open");
    $("div#screenshotPopupSingle-popup").css("left", "auto");
    $("div#screenshotPopupSingle-popup").css("top", "auto");
}

/*----------AllAgent Page---------------*/
var varbookmark;
function AllAgnt_Ready() {


    setInterval(function () { AllAgnt_getDate() }, 250);

    var url = document.URL;
    var result = [];
    var searchIndex = url.indexOf("?");
    var sPageURL = url.substring(searchIndex + 1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }

    if (result["id1"] != "Bookmark") {
        $("#hdnSlider").val($("#hdnSlidrSesn").val());
    }

    // $("#hdnSlider").val($("#hdnSlidrSesn").val());
    //$("#hdnPeriod").val($("#hdnPeriodSesn").val());


    AllAgnt_lblTenureStyle();
    AllAgnt_setControlValues(); //setting slider values here. when post back, back button click, first load


    AllAgnt_tableSort();

    AllAgnt_listTableHeight();

    $(window).on("orientationchange", function (event) {
        AllAgnt_listTableHeight();
    });

    $("input[type='radio'][name='radio-choice-h-1']").bind("change", function (event, ui) {//-
        $("#hdnPeriod").val($("input[type='radio'][name='radio-choice-h-1']:checked").val());
    });
    window.onresize = function (event) {
        AllAgnt_listTableHeight();
    }


    $('#sliderDiv').on("swipeleft", AllAgnt_excludeSlider);

    $.mobile.loading("show", {
        text: "Loading...",
        textVisible: true,
        // theme: $("#hdnTheme").val(),
        textonly: true
    });

    AllAgnt_tenureSelect();

    //    $("#AgentNameTh").click(function () {
    //        AllAgnt_sortTable();
    //    });
    // get server date when slider stop
    $("#slider-1").on('slidestop', function (event) {

        AllAgnt_getServerDate();
        $("#hdnSlider").val($('#slider-1').val());
        //        $("#btnleftApply").click();


    });



    // AllAgnt_getServerDate();
    AllAgnt_selectedPeriodVal();
    AllAgnt_chkBookMark();
    $("#slider-1").slider("refresh");

    $("#root").sortable(
    {
        axis: "y"
    });
    $("#root").disableSelection();

    $("#popupLineGraph").bind({
        popupafterclose: function (event, ui) {
            $("#imgLineGraph").attr("src", "");
            $(document).unbind('touchmove', false); //Unbind the prevented touch events after popup close
        }
    });


    $("#scrCrd").click(function () {

        $("#scrCrd").addClass("ui-btn-active");
        $(this).css("color", "");
        var periodValue = $("input[type='radio'][name='radio-choice-h-1']:checked").val();
        window.location = "/Pages/FirstLevelManager/BalancedScoreCard.aspx?agentId=" + $("#hdnMngrId").val() + "&periodValue=" + periodValue + "&sliderValue=" + $("#hdnSlider").val();
    });

    $("#taskLnk").click(function () {
        var periodValue2 = $("input[type='radio'][name='radio-choice-h-1']:checked").val();
        window.location = "/Pages/FirstLevelManager/TMTaskLists.aspx?agentId=" + $("#hdnMngrId").val() + "&periodValue=" + periodValue2 + "&sliderValue=" + $("#hdnSlider").val();
    });


    $("[id*='lstD_imgAht_']").click(function (e) {
        $.ajax("DemoPage.aspx",
    {
        //        complete: function (data) {
        //            //alert(data.responseText);
        //            alert("Complete");
        //            //SuccessFunction(imgRef);
        //        },
        success: function () {
            //            alert("Success");
            //AllAgentDisplayPopupLineGraph($(this));
            SuccessFunction($(this));
        },
        statusCode: {
            404: function (data) {
                //                alert("404");
                //                i = 401;
                window.location = "/Pages/Authentication/Credentials.aspx";
            }, 400: function () {
                //                alert("Success");
                //                i = 400;
            }
        }
    });
    });



}
$(document).on("popupafteropen", "#bookmarkViewPopupAll", function (event, ui) {
    AllAgnt_viewBookmark();
});


$("#fwdBttn").click(function (e) {
    window.location = "AllAgentTrigger.aspx";
});

function leftPanelClose() {
    var cntTenureItems = $('#select-choice-1 option').size();
    var tenureItems = [];

    $('#select-choice-1 option').each(function () {
        tenureItems.push($(this).val());
    });


    for (var count = 0; count < cntTenureItems; count++) {
        $("select#select-choice-1 option:contains(" + tenureItems[count] + ")").attr('selected', false);
    }

    $('#select-choice-1').selectmenu('refresh', true);


    var tenureValue = $("#hdnTenureValue").val().split(",");
    if ($("#hdnTenureValue").val() == '') {
        $('#select-choice-1').val('All').selected = true;
    }

    else {
        var i = 0;
        for (i = 0; i < tenureValue.length; i++) {
            $("select#select-choice-1 option:contains(" + tenureValue[i] + ")").attr('selected', true);
        }
    }

    var callType = $('#hdnCallTypeValue').val();


    $('#select-choice-1').selectmenu('refresh', true);
    $('#select-choice-2').val(callType).selected = true;
    $('#select-choice-2').selectmenu('refresh', true);
}


function AllAgentDisplayPopupLineGraph(imgRef) {


    $("#imgLineGraph").attr("src", "/Pages/GenerateGraph.aspx?yValues=" + imgRef.attr("data-yvalue"));
    $('#imgLineGraph').css("width", "800px");
    $('#imgLineGraph').css("height", "500px");

    $.mobile.loading("show", {
        text: "Loading...",
        textVisible: true,
        //theme: $("#hdnTheme").val()
    });

    $('#imgLineGraph')
            .load(function () {
                $.mobile.loading("hide");
                $("#popupLineGraph").popup("open");
            });
    $(document).bind('touchmove', false); //Prevent the touch events when popup appears
}


function AllAgnt_lblTenureStyle() {

    var platform = navigator.platform;
    if (platform == "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement)
        //    if (isTouchDevice) {

        //$("#lblTen").removeClass('select lblTenureDk');
        $("#lblTen").addClass('select lblTenureTouch');

    }
    else {

        //$("#lblTen").removeClass('select lblTenureTouch');
        $("#lblTen").addClass('select lblTenureDk');

    }
}





function AllAgnt_selectedPeriodVal() {
    var selected1 = $("input[type='radio'][name='radio-choice-h-1']:checked");
    $("#hdnPeriod").val(selected1.val());
}
$(document).on('change', '[name="radio-choice-h-1"]', function () {
    
    var selected = $("input[type='radio'][name='radio-choice-h-1']:checked");
    $("#hdnPeriod").val(selected.val());
});




function AllAgnt_swipeleftHandler(event) {
    window.location = "AllAgentTrigger.aspx";
}

function AllAgnt_excludeSlider(event) {
    event.stopPropagation();
    event.preventDefault();
}

function AllAgnt_tenureSelect() {
    var tenureArray = $("#hdnTenrSelctd").val().split(",");
    if ($("#hdnTenrSelctd").val() == '') {
        $("select#select-choice-1 option:contains(All)").attr('selected', true);
    }

    else {
        var i = 0;
        for (i = 0; i < tenureArray.length; i++) {
            $("select#select-choice-1 option:contains(" + tenureArray[i] + ")").attr('selected', true);
        }

    }
    $("#select-choice-1").selectmenu("refresh");
    $('select#select-choice-2').val($("#hdnCallType").val()).selectmenu("refresh");

}

function AllAgnt_tableSort() {

    var table = $("#tableagentdetails").smarttable();
    table.bind('aftertablesort', function (event, data) {
        var th = $(this).find("th");
        var dir = $.fn.smarttable.dir;
        var imgAr;


        $("#imgNmAr").hide();
        $("#imgArAHT").hide();
        $("#imgArATT").hide();
        $("#imgArCR").hide();
        $("#imgArQS").hide();
        $("#imgArCSR").hide();
        $("#imgArNBAT").hide();
        $("#imgArBTP").hide();
        if (data.direction == dir.ASC && $("#hdnSortflag").val() == 1) {

            if (data.column == 0) {
                imgAr = $("#imgArAHT");
                imgAr.show();
            }
            else if (data.column == 5) {
                imgAr = $("#imgArATT");
                imgAr.show();
            }
            else if (data.column == 10) {
                imgAr = $("#imgArCR");
                imgAr.show();
            }
            else if (data.column == 15) {
                imgAr = $("#imgArQS");
                imgAr.show();
            }
            else if (data.column == 20) {
                imgAr = $("#imgArCSR");
                imgAr.show();
            }
            else if (data.column == 25) {
                imgAr = $("#imgArNBAT");
                imgAr.show();
            }
            else if (data.column == 30) {
                imgAr = $("#imgArBTP");
                imgAr.show();
            }

            imgAr.attr("src", "../Styles/images/upArrow-1.png");

        }
        else if (data.direction == dir.DESC && $("#hdnSortflag").val() == 1) {

            if (data.column == 0) {
                imgAr = $("#imgArAHT");
                imgAr.show();
            }
            else if (data.column == 5) {
                imgAr = $("#imgArATT");
                imgAr.show();
            }
            else if (data.column == 10) {
                imgAr = $("#imgArCR");
                imgAr.show();
            }
            else if (data.column == 15) {
                imgAr = $("#imgArQS");
                imgAr.show();
            }
            else if (data.column == 20) {
                imgAr = $("#imgArCSR");
                imgAr.show();
            }
            else if (data.column == 25) {
                imgAr = $("#imgArNBAT");
                imgAr.show();
            }
            else if (data.column == 30) {
                imgAr = $("#imgArBTP");
                imgAr.show();
            }
            imgAr.attr("src", "../Styles/images/dwnArrow-1.png");
        }
        var table = document.getElementById('tableagentdetails');
        var destination = document.getElementById('tableagents');

        var rowLength = table.rows.length;


        var arrAgentName = new Array();
        var arrAgentId = new Array();
        $('.AlList').each(function () {

            arrAgentName.push(this.getAttribute("EmpName"));
            arrAgentId.push(this.getAttribute("AgentId"));
        });

        var i = 0;
        $('.AgentList').each(function () {
            $(this).attr('agentId', arrAgentId[i]);
            $(this).text(arrAgentName[i]);
            i = i + 1;
        });


    });
}
var dateCheck;
function AllAgnt_chkBookMark() {
    if (varbookmark != 1) {
        AllAgnt_getServerDate();

        $(document).on('change', '[name="radio-choice-h-1"]', function () {
            AllAgnt_getDate();
            //            $("#btnleftApply").click();
        });


    } else {
        $("#slider-1").val($("#hdnSlider").val());
        $('#slider-1').slider();
        $('#slider-1').slider('refresh');
        dateCheck = 1;

        //alert("hidden date "+$("#hdncrntDate").val());

        $("#hdnSrvtDtime").val($("#arrSplit").val());
        AllAgnt_getDate();

        $(document).on('change', '[name="radio-choice-h-1"]', function () {


            $("#hdnSrvtDtime").val($("#hdncrntDate").val());
            AllAgnt_getDate();

        });

        $("#slider-1").bind("slidestop", function (event, ui) {
            //AllAgnt_setDate($("#hdnSlider").val(), $("#hdnPeriod").val(), $("#hdncrntDate").val());
            $("#hdnSrvtDtime").val($("#hdncrntDate").val());
            AllAgnt_getDate();
        });
    }
}

//function AllAgnt_textColor() {
//    
//    $("#btnleftApply").prev().css("color", "RoyalBlue");
//    var arr = new Array();
//    $('#root li').each(function () {
//        arr.push(this.getAttribute("data-metric"));
//    });
//    $('#hdnColumnOrder').val(arr);


////    document.getElementById('<%=hdnCountBubble.ClientID%>').value = arr;
//}
function AllAgnt_listTableHeight() {
    var winHeight = $(window).height();

    var platform = navigator.platform;
    if (platform != "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement);
        //    if (!isTouchDevice) {
        var height = ($('#tableagentdetails tbody').children().length) * 45;
        var isRanFromHomeScreen = navigator.standalone;
        //        if (isRanFromHomeScreen) {
        //            $('#listviewTr').css('height', winHeight - height - 300)
        //            $('#agentLastRow').css('height', winHeight - height - 300);
        //        }
        //        else {
        $('#listviewTr').css('height', winHeight - height - 300)
        $('#agentLastRow').css('height', winHeight - height - 300);
        //        }
      
        if (height <= winHeight - 300) {
            // $(".scrollContent").css("height", height);
            //   $("#scrollAgentName").css("height", height);
            $(".scrollClass").css("height", height);

            document.getElementById("tableagentdetails").deleteTFoot();
        } else {
            //  $(".scrollContent").css("height", winHeight - 300);

            // $("#scrollAgentName").css("height", winHeight - 300);
            $(".scrollClass").css("height", winHeight - 300);

        }

        var s = screen.width - 130; // - 165;
        $('#scrollablex').css("width", s);
        //To Display the Vertical scroll for the table
        $('#scrollablex').css("overflow-y", "scroll");
        //        $('#scrollAgentName').css("overflow-y", "hidden"); 

    } else {
        var height = ($('#tableagentdetails tbody').children().length) * 45;
        $('#listviewTr').css('height', winHeight - height - 300)
        $('#agentLastRow').css('height', winHeight - height - 300);

        if (height <= winHeight - 300) {
            //$(".scrollContent").css("height", height);
            $(".scrollClass").css("height", height);

        } else {
            // $(".scrollContent").css("height", winHeight - 300);
            $(".scrollClass").css("height", winHeight - 300);

        }
        if ($(window).width() > $(window).height()) {

            var s = screen.width + 130  //LandScape
            $('#scrollablex').css("width", s);

        } else {
            var s = screen.width - 125 //Potrait
            $('#scrollablex').css("width", s);
        }
    }
}
var sort = 1;
function AllAgnt_sortTable() {

    sort++;
    var tbl = document.getElementById("tableagentdetails").tBodies[0];
    var imgnmAr;

    $("#imgAgNmAr").hide();


    $("#imgArAHT").hide();
    $("#imgArATT").hide();
    $("#imgArCR").hide();
    $("#imgArQS").hide();
    $("#imgArCSR").hide();
    $("#imgArNBAT").hide();
    $("#imgArBTP").hide();
    var store = [];
    for (var i = 0, len = tbl.rows.length; i < len; i++) {
        var row = tbl.rows[i];
        var sortnr = row.cells[1].getAttribute("data-agentname");
        if (isNaN(sortnr)) store.push([sortnr, row]);

    }
    if (sort % 2 == 0) {
        store.sort(function (x, y) {
            imgnmAr = $("#imgNmAr")
            imgnmAr.show();
            imgnmAr.attr("src", "../Styles/images/dwnArrow-1.png");
            return y[0].localeCompare(x[0]);

        });

    } else {
        imgnmAr = $("#imgNmAr");
        imgnmAr.show();
        imgnmAr.attr("src", "../Styles/images/upArrow-1.png");
        store.sort(function (x, y) {
            return x[0].localeCompare(y[0]);
        });
    }
    for (var i = 0, len = store.length; i < len; i++) {

        tbl.appendChild(store[i][1]);
    }
    store = null;
    AllAgnt_sortTable2();
}

var sort1 = 1;
function AllAgnt_sortTable2() {
    {
        sort1++;
        var tbl = document.getElementById("tableagents").tBodies[0];
        var store = [];
        for (var i = 0, len = tbl.rows.length; i < len; i++) {
            var row = tbl.rows[i];

            var sortnr = (row.cells[0].textContent || row.cells[0].innerText);
            if (isNaN(sortnr)) store.push([sortnr, row]);

        }

        if (sort1 % 2 == 0) {
            store.sort(function (x, y) {
                return y[0].localeCompare(x[0]);
            });
        } else {
            store.sort(function (x, y) {
                return x[0].localeCompare(y[0]);
            });
        }
        for (var i = 0, len = store.length; i < len; i++) {
            tbl.appendChild(store[i][1]);
        }

        store = null;

    }
}

function AllAgnt_setControlValues() {

    var url = document.URL;
    var result = [];
    var searchIndex = url.indexOf("?");
    var sPageURL = url.substring(searchIndex + 1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }

    if (result["id1"] == "Bookmark") {

        $("#slider-1").val($("#hdnSlider").val());
        $("input[type='radio'][name='radio-choice-h-1'][ value=" + $("#hdnPeriod").val() + "]").attr("checked", "checked").checkboxradio("refresh");


    }
    else if ($("#hdnSlider").val() != '') { //post back
        $("#slider-1").val($("#hdnSlider").val());
        $("#slider-1").slider('refresh');
        if ($("#hdnPeriod").val() != '')
            $("input[type='radio'][name='radio-choice-h-1'][ value=" + $("#hdnPeriod").val() + "]").attr("checked", "checked").checkboxradio("refresh");

    }
    else if ((AllAgnt_getParameterByName('sliderValue') != '') && (AllAgnt_getParameterByName('periodValue') != '')) {//url having parameter & back button click

        $("#slider-1").val(AllAgnt_getParameterByName('sliderValue'));
        $("#hdnSlider").val(AllAgnt_getParameterByName('sliderValue'));
        $("#slider-1").slider('refresh');

        $("input[type='radio'][name='radio-choice-h-1'][ value=" + AllAgnt_getParameterByName('periodValue') + "]").attr("checked", "checked").checkboxradio("refresh");

    }
    else { // have no url parameter

        $("#hdnSlider").val('0');
        $("#slider-1").val('0');
        $("#slider-1").slider('refresh');

        $("input[type='radio'][name='radio-choice-h-1'][ value=DAILY]").attr("checked", "checked").checkboxradio("refresh");

    }
}


function AllAgnt_getServerDate() {
    var obj = {};
    jQuery.ajax({
        url: 'AllAgent.aspx/GetServerDate',
        type: "POST",
        data: JSON.stringify(obj),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#hdnSrvtDtime").val(data.d);
            // alert("from get server date :"+ $("#hdnSrvtDtime").val());
            AllAgnt_getDate();
        }
    });

}
function AllAgnt_selectvalue1(value) {



    if (value == "All") {

        if ($("#hdnAllFlagTenure").val() == 1) {
            $("select#select-choice-1 option:contains(All)").attr('selected', false); //remove 'all'
            $("#hdnAllFlagTenure").val('0');
        }
        else {

            $("select#select-choice-1 option:contains()").attr('selected', false);
            $("select#select-choice-1 option:contains(All)").attr('selected', true);
            $("#hdnAllFlagTenure").val('1');
        }
    }
    else {

        $("select#select-choice-1 option:contains(All)").attr('selected', false);
    }
    $("#select-choice-1").selectmenu("refresh", true);
    $("#hdnTenrSelctd").val($("#select-choice-1").val());


}


function AllAgnt_selectvalue2(value) {
    $("#hdnCallType").val($("#select-choice-2").val());
}


function AllAgnt_setDate(Slider, period, crntDate) {
    if ($('#slider-1').val() == "") {

    } else {
        Slider = $('#slider-1').val();
    }

    var obj = { offsetValue: Slider, periodValue: period, currentDate: crntDate };
    jQuery.ajax({
        url: 'AllAgent.aspx/Setdate',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#LblDaily").text(data.d);
        }

    });
}

function AllAgnt_getDate() {
    if ($("#hdnSrvtDtime").val() != '') {
        if (dateCheck != 1) {
            var mySplitResult = $("#hdnSrvtDtime").val().split(",");
            var a = new Date(mySplitResult[0], mySplitResult[1] - 1, mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);

        } else {
            var splitResult = $("#hdnSrvtDtime").val().split("/");
            var splitResult1 = splitResult[2].split(" ");
            var splitResult2 = splitResult1[1].split(":");
            var arrSplit = [splitResult1[0], splitResult[0], splitResult[1], splitResult2[0], splitResult2[1], splitResult2[2]];
            var a = new Date(arrSplit[0], arrSplit[1] - 1, arrSplit[2], arrSplit[3], arrSplit[4], arrSplit[5]);

        }


        var selected = $("input[type='radio'][name='radio-choice-h-1']:checked");
        switch (selected.val()) {

            case 'MONTHLY':
                $("#LblDaily").text(a.addMonths(parseInt($("#slider-1").val())).toString('MMM yyyy'));
                break;
            case 'DAILY':

                var dt = a.addDays($("#slider-1").val());
                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');


                if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                }

                else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                }
                else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                }
                else {
                    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                }
                break;

            case 'WEEKLY':

                var dt;
                if ($("#slider-1").val() == 0) {
                    dt = a;
                }
                else {

                    dt = a.sunday();
                    dt.addWeeks($("#slider-1").val());

                }
                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');

                if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                }

                else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                }
                else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                }
                else {
                    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                }


                break;

            case 'INTRADAY':

                var dt = a.addHours($("#slider-1").val());
                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');

                var hr = dt.toString('h');

                var tt = dt.toString('tt');


                if (hr == 0) { hr = 12; }

                if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                }

                else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                }
                else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                }
                else {
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                }

                break;
        }


    }
}


//Get param values from the url
function AllAgnt_getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function AllAgnt_screenShot() {
    $.mobile.ajaxEnabled = true;
    document.getElementById("toolBar").style.display = "none";
    html2canvas($(document.body), {
        onrendered: function (canvas) {


            var extra_canvas = document.createElement("canvas");
            extra_canvas.setAttribute('width', $(window).width());
            extra_canvas.setAttribute('height', $(window).height());
            var ctx = extra_canvas.getContext('2d');
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, $(window).width(), $(window).height());
            var img = extra_canvas.toDataURL("image/png");
            var imageElement = document.getElementById("imgScrnSht");
            imageElement.src = img;
            $("#popupTest").popup("open");

        }
    });

    $.mobile.ajaxEnabled = false;

}
function AllAgent_ErrorPopup() {

    if ($('#tableagentdetails tbody').children().length == 0) {
        $("body").removeClass('ui-disabled');
        $(document).unbind('touchmove', false);
        $.mobile.loading("hide");
        $("#left-panel").panel("close");
        $("#popupError").popup("open");
    }

}
function AllAgnt_WindowLoad() {
    //    $("a[id^='lnkAgNm']").removeAttr('onclick');
    //    $("a[id^='lnkAgNm']").click(function () {
    //        var periodValue = $("input[type='radio'][name='radio-choice-h-1']:checked").val();
    //        window.location = "SingleAgent.aspx?agentId=" + $(this).data("agentid") + "&periodValue=" + periodValue + "&sliderValue=" + $("#hdnSlider").val();

    //    });

    $.mobile.loading("hide");
    $(document).unbind('touchmove', false);
}

function AllAgnt_cancelBookmark() {
    document.getElementById('txtBookmarkName').value = "";
    $('#bookmarkAddPopupAll').popup("close");
}

function AllAgnt_addBookmark() {

    var url = document.URL;
    var urlsplit = url.split('?');
    var selected = $("input[type='radio'][name='radio-choice-h-1']:checked");
    var description = document.getElementById('txtBookmarkName').value;
    var startTenure = "";
    var endTenure = "";
    var calltype = $('#select-choice-2').val();
    var multipleValues = $("#select-choice-1").val().join(",");
    var obj = { offsetValue: $('#slider-1').val(), period: selected.val(), description: description, startTenure: startTenure, endTenure: endTenure, callType: calltype, tenure: multipleValues, url: urlsplit[0] };
    jQuery.ajax({
        url: 'AllAgent.aspx/AddBookmark',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            document.getElementById('txtBookmarkName').value = "";
            $('#bookmarkAddPopupAll').popup("close");
        }
    });

}
function AllAgnt_viewBookmark() {
    $('#bookmarkPopupAll').popup("close");
    jQuery.ajax({
        url: 'AllAgent.aspx/ViewBookmark',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AllAgnt_Bookmark
    });
}

function AllAgnt_Bookmark(data) {
    $("div#bookmarkdivAll").empty();
    var urlView, pageName, url;
    for (var i = 0; i < data.d.length; i = i + 11) {

        data.d[i] = data.d[i].replace("pages", "Pages");

        url = data.d[i].split('Pages/')
        var pageName = url[1].split('.');

        if (pageName[0] == "BalancedScoreCard" || pageName[0] == "SingleAgent") {

            urlView = data.d[i];
            // var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            // newURL = location.host + newURL;
            $("div#bookmarkdivAll").append('<a href="' + url[1] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else if (pageName[0] == "QualityForm") {

            $("div#bookmarkdivAll").append('<a href="' + url[1] + "?AgentId=" + data.d[i + 9] + "&url=" + data.d[i + 10] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else {

            urlView = data.d[i] + "?id1=" + "Bookmark" + "&id2=" + data.d[i + 1] + "&id3=" + data.d[i + 2] + "&id4=" + data.d[i + 3] + "&id5=" + data.d[i + 4] + "&id6=" + data.d[i + 5] + "&id7=" + data.d[i + 6] + "&id8=" + data.d[i + 7];
            var newUrl = urlView.split('Pages/');
            // var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            //  newURL = location.host + newURL;
            $("div#bookmarkdivAll").append('<a href="' + newUrl[1] + '">' + " " + data.d[i + 8] + '</a>' + '<br/>');
        }
    }
}
function AllAgnt_ToolsClick() {
    // .position() uses position relative to the offset parent,
    var pos = $("#imgToolsAll").position();

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();

    var windowWidth = $(window).width();
    
    //show the menu directly over the placeholder

    $("#screenshotPopupAll").css({
        position: "absolute",
        // bottom: pos.top + "px",
        // left: (pos.left - ($("#screenshotPopupAll").width()/2)) + "px"
    });
    $("#screenshotPopupAll")[0].style.left = (pos.left - ($("#screenshotPopupAll").width() / 2.4)) + "px";
    $("#screenshotPopupAll")[0].style.bottom = $("#pos").position().top + "px";

    $("#screenshotPopupAll").popup("open");
    $("div#screenshotPopupAll-popup").css("left", "auto");
    $("div#screenshotPopupAll-popup").css("top", "auto");
}

function AllAgnt_BookmarkClick() {
    // .position() uses position relative to the offset parent,
    var pos = $(this).position();
    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();

    var windowWidth = $(window).width();
    //alert(pos.left - windowWidth / 2.8);
    //show the menu directly over the placeholder

    //    $("#bookmarkPopup").css({
    //        position: "absolute",
    //        bottom: pos.top + "px",
    //        left: (pos.left - windowWidth / 2.8) + "px"
    //    }).show();
}

/***************************** Second Level  Page*****************************/


function ManagerLevelView(imgObj) {


    var src = $(imgObj).attr('src');
    if ($("#" + imgObj.id).hasClass("ui-icon-plus")) {
        rowCount = rowCount + 1;
        //$(imgObj).attr('src', '../Styles/images/data-icon_minus.png');
        $("#" + imgObj.id).addClass('ui-icon-minus')
                     .removeClass('ui-icon-plus')

        //$("#" + self.liDailyId()).removeClass('ui-icon-delete').addClass('ui-icon-check');
        $("[id*=divAgntVw_" + imgObj.getAttribute('data-managerid') + "]").css('display', 'table');
        $("[id*=divAgntMetricVw_" + imgObj.getAttribute('data-managerid') + "]").css('display', 'block');

    }
    else {
        rowCount = rowCount - 1;
        // $(imgObj).attr('src', '../Styles/images/data-icon_plus.png');
        $("#" + imgObj.id).addClass('ui-icon-plus')
                     .removeClass('ui-icon-minus')
        $("[id*=divAgntVw_" + imgObj.getAttribute('data-managerid') + "]").css('display', 'none');
        $("[id*=divAgntMetricVw_" + imgObj.getAttribute('data-managerid') + "]").css('display', 'none');
    }

    if (rowCount == 0) {

        $("[id*=mangerRow_").css({
            //"border-color": "rgb(54,54,54)",
            //"border-width": "1px",
            //"border-style": "solid"
            "border-right": "1px solid Black",
            "border-bottom": "1px solid Black"
        });
    }
    else {
        $("[id*=mangerRow_").css({
            "border-right": "1px solid Black",
            "border-bottom": "1px solid Black"
        });
    }
    SecondLevel_listTableHeight();
}

function SecondLevel_listTableHeight() {
    var winHeight = $(window).height();


    var platform = navigator.platform;
    if (platform != "iPad") {
        //    var isTouchDevice = ('ontouchstart' in document.documentElement);
        //    if (!isTouchDevice) {
     
        var height = (($('#tableagentdetails tbody tr:visible').length)) * 35;
        if (winHeight - height >= 350) {
            $('#listviewTr').css('height', winHeight - height - 350)
            $('#agentLastRow').css('height', winHeight - height - 350);
            $('#agentLastRowColumn').css('height', winHeight - height - 350);
        }
        else {
            $('#listviewTr').css('height', height - 350)
            $('#agentLastRow').css('height', height - 350);
            $('#agentLastRowColumn').css('height', height - 350);
        }

        if (height <= (winHeight - 200)) {
            if (height > 0) {
                $(".scrollClass").css("height", height + 15);
            }
            else {
                $(".scrollClass").css("height", height);
            }
        } else {
            $(".scrollClass").css("height", winHeight - 200);
        }
        var s = screen.width - 166; //145; //130; // - 165;
        $('#scrollablex').css("width", s);
        //To Display the Vertical scroll for the table
        $('#scrollMetricContent').css("overflow-y", "scroll");
        //        $('#scrollAgentName').css("overflow-y", "hidden"); 

    } else {
        var height = (($('#tableagentdetails tbody tr:visible').length)) * 35;
        var isRanFromHomeScreen = navigator.standalone;
        //        if (isRanFromHomeScreen) {
        //            $('#listviewTr').css('height', winHeight - height - 250)
        //            $('#agentLastRow').css('height', winHeight - height - 250);
        //            $('#agentLastRowColumn').css('height', winHeight - height - 250);
        //        }
        //        else {
        $('#listviewTr').css('height', winHeight - height - 300)
        $('#agentLastRow').css('height', winHeight - height - 300);

        $('#agentLastRowColumn').css('height', winHeight - height - 300);
        //        }
        if (height <= (winHeight - 300)) {
            $(".scrollClass").css("height", height + 15);
        } else {
            $(".scrollContent").css("height", winHeight - 300);
        }
        if ($(window).width() > $(window).height()) {

            var s = screen.width + 130  //LandScape
            $('#scrollablex').css("width", s);

        } else {
            var s = screen.width - 125 //Potrait
            $('#scrollablex').css("width", s);
        }
    }
}


var varbookmark;
function SecondLevel_Ready() {
    setInterval(function () { AllAgnt_getDate() }, 250);

    $("#hdnSlider").val($("#hdnSlidrSesn").val());
    $("#hdnPeriod").val($("#hdnPeriodSesn").val());
    $("a[id^='lstA_lnkAgNm']").attr("href", "#");
    $("#imgAhtAvg").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgAhtAvg").data("yvalue"));
    $("#imgAttAvg").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgAttAvg").data("yvalue"));
    $("#imgCrAvg").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgCrAvg").data("yvalue"));
    $("#imgQSAvg").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgQSAvg").data("yvalue"));
    $("#imgCSATAvg").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgCSATAvg").data("yvalue"));
    $("#imgNbatAvg").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgNbatAvg").data("yvalue"));
    $("#imgBtpAvg").attr("src", "/Pages/GetGraph.aspx?YValue=" + $("#imgBtpAvg").data("yvalue"));
    $(".ch").each(function () {
        $(this).attr("src", "/Pages/GetGraph.aspx?YValue=" + $(this).data("yvalue"));
    });
    AllAgnt_lblTenureStyle();
    AllAgnt_setControlValues(); //setting slider values here. when post back, back button click, first load

    var url = document.URL;
    var result = [];
    var searchIndex = url.indexOf("?");
    var sPageURL = url.substring(searchIndex + 1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }

    if (result["id1"] == "Bookmark") {
        $("#hdnSlider").val(result["id7"]);
    }

    AllAgnt_tableSort();

    SecondLevel_listTableHeight();

    $(window).on("orientationchange", function (event) {
        SecondLevel_listTableHeight();
    });

    $("input[type='radio'][name='radio-choice-h-1']").bind("change", function (event, ui) {
        $("#hdnPeriod").val($("input[type='radio'][name='radio-choice-h-1']:checked").val());
    });
    window.onresize = function (event) {
        SecondLevel_listTableHeight();
    }


    $('#sliderDiv').on("swipeleft", AllAgnt_excludeSlider);

    $.mobile.loading("show", {
        text: "Loading...",
        textVisible: true,
        // theme: $("#hdnTheme").val(),
        textonly: true
    });
    $(document).bind('touchmove', false);

    AllAgnt_tenureSelect();

    //    $("#AgentNameTh").click(function () {
    //        AllAgnt_sortTable();
    //    });
    // get server date when slider stop
    $("#slider-1").on('slidestop', function (event) {

        Secondlevel_getServerDate();
        $("#hdnSlider").val($('#slider-1').val());
        //        $("#btnleftApply").click();


    });


    // AllAgnt_getServerDate();
    AllAgnt_selectedPeriodVal();
    SecondLevel_chkBookMark();
    $("#slider-1").slider("refresh");

    $("#root").sortable(
    {
        axis: "y"
    });
    $("#root").disableSelection();

    $("#popupLineGraph").bind({
        popupafterclose: function (event, ui) { $("#imgLineGraph").attr("src", ""); }
    });

    $("[id*='lstD_imgAht_']").click(function (e) {
        $.ajax("DemoPage.aspx",
    {
        success: function () {
            SuccessFunction($(this));
        },
        statusCode: {
            404: function (data) {
                window.location = "/Pages/Authentication/Credentials.aspx";
            }, 400: function () {
            }
        }
    });
    });
}

function Secondlevel_WindowLoad() {

    //    $("a[id^='lnkAgNm']").click(function () {
    //        var periodValue = $("input[type='radio'][name='radio-choice-h-1']:checked").val();
    //        window.location = "SingleAgent.aspx?agentId=" + $(this).data("agentid") + "&periodValue=" + periodValue + "&sliderValue=" + $("#hdnSlider").val();

    //    });

    $.mobile.loading("hide");
    $(document).unbind('touchmove', false);
}

function Secondlevel_getServerDate() {
    var obj = {};
    jQuery.ajax({
        url: 'SecondLevel.aspx/GetServerDate',
        type: "POST",
        data: JSON.stringify(obj),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#hdnSrvtDtime").val(data.d);
            // alert("from get server date :"+ $("#hdnSrvtDtime").val());
            AllAgnt_getDate();
        }
    });

}

var dateCheck;
function SecondLevel_chkBookMark() {
    if (varbookmark != 1) {
        Secondlevel_getServerDate();

        $(document).on('change', '[name="radio-choice-h-1"]', function () {
            AllAgnt_getDate();
            //            $("#btnleftApply").click();
        });


    } else {
        $("#slider-1").val($("#hdnSlider").val());
        $('#slider-1').slider();
        $('#slider-1').slider('refresh');
        dateCheck = 1;

        //alert("hidden date "+$("#hdncrntDate").val());

        $("#hdnSrvtDtime").val($("#arrSplit").val());
        AllAgnt_getDate();

        $(document).on('change', '[name="radio-choice-h-1"]', function () {


            $("#hdnSrvtDtime").val($("#hdncrntDate").val());
            AllAgnt_getDate();

        });

        $("#slider-1").bind("slidestop", function (event, ui) {
            //AllAgnt_setDate($("#hdnSlider").val(), $("#hdnPeriod").val(), $("#hdncrntDate").val());
            $("#hdnSrvtDtime").val($("#hdncrntDate").val());
            AllAgnt_getDate();
        });
    }
}

/***************************** Score Card Page*****************************/
function ScoreCard_addBookmark() {
    var url = document.URL;
    var result = [];
    var searchIndex = url.indexOf("?");
    var sPageURL = url.substring(searchIndex + 1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }


    // var urlsplit = url.split('?');
    var description = document.getElementById('txtBookmarkName').value;
    var startTenure = "";
    var endTenure = "";
    var calltype = "";
    var multipleValues = "";
    var obj = { offsetValue: result["sliderValue"], period: result["periodValue"], description: description, startTenure: startTenure, endTenure: endTenure, callType: calltype, tenure: multipleValues, url: url };
    jQuery.ajax({
        url: 'AllAgent.aspx/AddBookmark',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            document.getElementById('txtBookmarkName').value = "";
            $('#bookmarkAddPopupAll').popup("close");
        }
    });

}

function ScoreCard_viewBookmark() {
    $('#bookmarkPopupAll').popup("close");
    jQuery.ajax({
        url: 'BalancedScoreCard.aspx/ViewBookmark',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ScoreCard_Bookmark
    });
}

function ScoreCard_Bookmark(data) {
    $("div#bookmarkdivAll").empty();
    var urlView, pageName, url;
    for (var i = 0; i < data.d.length; i = i + 11) {
        url = data.d[i].split('Pages/')
        var pageName = url[1].split('.');

        if (pageName[0] == "BalancedScoreCard" || pageName[0] == "SingleAgent") {

            urlView = data.d[i];


            // var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            // newURL = location.host + newURL;


            $("div#bookmarkdivAll").append('<a href="' + url[1] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        } else if (pageName[0] == "QualityForm") {

            $("div#bookmarkdivAll").append('<a href="' + url[1] + "?AgentId=" + data.d[i + 9] + "&url=" + data.d[i + 10] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else {
            urlView = data.d[i] + "?id1=" + "Bookmark" + "&id2=" + data.d[i + 1] + "&id3=" + data.d[i + 2] + "&id4=" + data.d[i + 3] + "&id5=" + data.d[i + 4] + "&id6=" + data.d[i + 5] + "&id7=" + data.d[i + 6] + "&id8=" + data.d[i + 7];
            var newUrl = urlView.split('Pages/');
            // var newURL = urlView.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
            // newURL = location.host + newURL;

            $("div#bookmarkdivAll").append('<a href="' + newUrl[1] + '">' + " " + data.d[i + 8] + '</a>' + '<br/>');
        }
    }

    //    for (var i = 0; i < data.d.length; i = i + 9) {
    //        var urlView = data.d[i];
    //        $("div#bookmarkdivAll").append('<a href="' + urlView + '">'+ data.d[i + 8] +'</a>' + '<br/>');
    //    }
}

function ScoreCardPage_ToolsClick() {
    // .position() uses position relative to the offset parent,
    var pos = $("#imgToolScore").position();

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();

    var windowWidth = $(window).width();
    
    //show the menu directly over the placeholder

    $("#screenshotPopupSingle").css({
        position: "absolute",
        //bottom: pos.top + "px",
        //  left: (pos.left - windowWidth / 6) + "px"
    });
    $("#screenshotPopupSingle")[0].style.left = (pos.left - ($("#screenshotPopupSingle").width() / 2.4)) + "px";
    $("#screenshotPopupSingle")[0].style.bottom = (pos.top) + "px";

    $("#screenshotPopupSingle").popup("open");
    $("div#screenshotPopupSingle-popup").css("left", "auto");
    $("div#screenshotPopupAll-popup").css("top", "auto");
}
/***************************** Quality Form Page*****************************/
function QualityForm_ToolsClick() {
    // .position() uses position relative to the offset parent,
    var pos = $("#imgToolsAll").position();

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();

    var windowWidth = $(window).width();
    
    //show the menu directly over the placeholder

    $("#screenshotPopupAll").css({
        position: "absolute",
        bottom: pos.top + "px",
        //  left: (pos.left - windowWidth / 6) + "px"
    });
    $("#screenshotPopupAll")[0].style.left = (pos.left - ($("#screenshotPopupAll").width() / 2.4)) + "px";
    // $("#screenshotPopupAll")[0].style.bottom = (pos.top) + "px";

    $("#screenshotPopupAll").popup("open");
    $("div#screenshotPopupAll-popup").css("left", "auto");
    // $("div#screenshotPopupAll-popup").css("top", "auto");
}

function QualityFormBackBtn() {
    var url = document.URL;
    if ($("#hdnMngrId").val() == 300001) {
        window.location = "/Pages/SecondLevelManager/SecondLevel.aspx";
    }
    else {
        var newURL = url.split("url=");
        var urlStr = newURL[1];
        if (urlStr.indexOf("Coaching") >= 0) {
            urlStr = urlStr.split("ReturnPage");
            var newPageURL = urlStr[0].split("&AgentId=");
            window.location.href = decodeURIComponent(newPageURL[0]);
        }
        else if (urlStr.indexOf("BalancedScoreCard") >= 0) {
            window.location.href = decodeURIComponent(urlStr);
        }
        else if (urlStr.indexOf("AllAgentTrigger") >= 0) {
            urlStr = urlStr.split("?");
            window.location.href = decodeURIComponent(urlStr[0]);
        }
        else {
            if (urlStr.indexOf("AgentId") >= 0) {
                var newPageURL = urlStr.replace("AgentId", "agentId");
                window.location.href = decodeURIComponent(newPageURL);
            }
            else {
                window.location.href = decodeURIComponent(urlStr);
            }

        }

    }
}
function QualityForm_addBookmark() {

    var url = document.URL;
    var description = document.getElementById('txtBookmarkName').value;
    url = url.split("?")[0];
    var returnUrl = document.URL.split("&url=")[1];
    var agentId = document.URL.split("AgentId=")[1].split("&")[0];

    var obj = { description: description, url: url, ReturnUrl: returnUrl, AgentId: agentId };
    jQuery.ajax({
        url: 'QualityForm.aspx/AddBookmark',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            document.getElementById('txtBookmarkName').value = "";
            $('#bookmarkAddPopupAll').popup("close");
        }
    });

}

/**********************Agent Portal Page****************************/

function AgntPortal_cancelBookmark() {

    document.getElementById('txtBookmarkName').value = "";
    $('#bookmarkAddPopupAgentPortal').popup("close");
}

function AgntPortal_viewBookmark() {

    $('#bookmarkPopupSingl').popup("close");
    jQuery.ajax({
        url: 'AllAgent.aspx/ViewBookmark',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AgntPortal_Bookmark
    });
}

function AgntPortal_Bookmark(data) {

    $("div#bookmarkdivAgentPortal").empty();
    var urlView, pageName, url;
    for (var i = 0; i < data.d.length; i = i + 11) {
        data.d[i] = data.d[i].replace("pages", "Pages");
        url = data.d[i].split('Pages/');
        var pageName = url[1].split('.');

        if (pageName[0] == "BalancedScoreCard" || pageName[0] == "SingleAgent") {

            urlView = data.d[i];
            $("div#bookmarkdivAgentPortal").append('<a href="' + url[1] + '">' + data.d[i + 8] + '</a>' + '<br/>');
        }
        else {

            urlView = data.d[i] + "?id1=" + "Bookmark" + "&id2=" + data.d[i + 1] + "&id3=" + data.d[i + 2] + "&id4=" + data.d[i + 3] + "&id5=" + data.d[i + 4] + "&id6=" + data.d[i + 5] + "&id7=" + data.d[i + 6] + "&id8=" + data.d[i + 7];
            var newUrl = urlView.split('Pages/');
            $("div#bookmarkdivAgentPortal").append('<a href="' + newUrl[1] + '">' + " " + data.d[i + 8] + '</a>' + '<br/>');
        }
    }
}

function AgntPortal_addBookmark() {

    var url = document.URL;
    var description = document.getElementById('txtBookmarkName').value;
    var startTenure = "";
    var endTenure = "";
    var calltype = "";
    var multipleValues = "";

    var obj = { offsetValue: Number(""), period: "", description: description, startTenure: startTenure, endTenure: endTenure, callType: calltype, tenure: multipleValues, url: url };
    jQuery.ajax({
        url: 'AllAgent.aspx/AddBookmark',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            document.getElementById('txtBookmarkName').value = "";
            $('#bookmarkAddPopupAgentPortal').popup("close");
        }
    });

}

function AgntPortal_ToolsClick() {
    // .position() uses position relative to the offset parent,
    var pos = $("#imgToolSingl").position();

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();

    var windowWidth = $(window).width();
    
    //show the menu directly over the placeholder

    $("#screenshotPopupAgentPortal").css({
        position: "absolute",
        bottom: pos.top + "px",
        //  left: (pos.left - windowWidth / 6) + "px"
    });
    $("#screenshotPopupAgentPortal")[0].style.left = (pos.left - ($("#screenshotPopupAgentPortal").width() / 2.4)) + "px";
    // $("#screenshotPopupAgentPortal")[0].style.bottom = (pos.top) + "px";

    $("#screenshotPopupAgentPortal").popup("open");
    $("div#screenshotPopupAgentPortal-popup").css("left", "auto");
    // $("div#screenshotPopupAgentPortal-popup").css("top", "auto");
}

//***************************Sonic Dashboard************************************//

function SonicDashboard_getDate() {
    var servrDat = $("#hdnSrvtDtime").val();
    var sliderVal = $("#slider-110").val();
    if (servrDat != '') {
       
        var mySplitResult = servrDat.split(",");
        var a = new Date(mySplitResult[0], (mySplitResult[1]-1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);   
        var selected = $("input[type='radio'][name='radio-choice-h-230']:checked");
        var mydate;
        switch (selected.val()) {

            case 'MONTHLY':
                mydate = a.addMonths(parseInt(sliderVal));
                $("#LblDaily").text(mydate.toString('MMM yyyy'));               
                $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                break;

            case 'DAILY':
               
                var dt = a.addDays(sliderVal);
                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');
                $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                //}

                //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                //}
                //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                //}
                //else {
                //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                //}
                break;

            case 'WEEKLY':

                var dt;
                if (sliderVal == 0) {
                    dt = a;
                }
                else {
                    dt = a.sunday();
                    dt.addWeeks(sliderVal);
                }

                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');
                $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                //if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                //}

                //else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                //}
                //else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                //}
                //else {
                //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                //}

                break;

            case 'INTRADAY':
              
                var dt = a.addHours(sliderVal);
                var dy = dt.toString('d');
                var mt = dt.toString('MMM');
                var yr = dt.toString('yyyy');
                var hr = dt.toString('h');
                var tt = dt.toString('tt');
                var hour = dt.toString('hh');
                if (tt == "PM" && hour < 12) {
                    hour =parseInt(hour) + 12;
                }
                $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') +" "+ hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                if (hr == 0) { hr = 12; }

                $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' + dy + ' ' + yr);
                //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                //}

                //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                //}
                //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                //}
                //else {
                //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                //}
                break;
        }
    }
}
function SonicDashboard_getServerDate() {
   
    var obj = {};
    jQuery.ajax({
        url: 'CallsDashboard.aspx/GetServerDate',
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {        
            $("#hdnSrvtDtime").val(data.d);
            SonicDashboard_getDate();
            sonicDashboardViewModel.GetEmojiData();
            sonicDashboardViewModel.GetLevel1DispositionData();
            sonicDashboardViewModel.bindArrayData();
        }
    });
}
$(document).on('change', '[name="radio-choice-h-230"]', function () {
    $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
    $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
    $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
    $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
    $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";
    var selected = $("input[type='radio'][name='radio-choice-h-230']:checked");
    if (selected.val() == "MONTHLY") {
        $("#slider-110").attr("min", "-12").slider("refresh");;
    }
    else {
        $("#slider-110").attr("min", "-90").slider("refresh");;
    }
    $("#hdnPeriodValue").val(selected.val());
    SonicDashboard_getDate();
    sonicDashboardViewModel.GetLevel1DispositionData();
    sonicDashboardViewModel.bindArrayData();
});
$(document).on('slidestop', '#slider-110', function () {
    sonicDashboardViewModel.GetLevel1DispositionData();
    sonicDashboardViewModel.bindArrayData();
    $("#tblBarChart").css("display", "none");
    $("#tblSAppChart").css("display", "none");
    $("#tblDealerships").css("display", "none");
    $("#tblBarChartSales").css("display", "none");
    $("#expToExcelDiv").css("display", "none");
});
var resizeTimeout = false;
$(document).on('change', '#slider-110', function () {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(function () {
        sonicDashboardViewModel.GetLevel1DispositionData();
        sonicDashboardViewModel.bindArrayData();
        $("#tblBarChart").css("display", "none");
        $("#tblSAppChart").css("display", "none");
        $("#tblDealerships").css("display", "none");
        $("#tblBarChartSales").css("display", "none");
        $("#expToExcelDiv").css("display", "none");
    }, 500);

});



    //***************************Sonic Dashboard with bubbleChart************************************//

    function SonicDashboardBubble_getDate() {
        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-210").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-330']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');

                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                        $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    }

                    else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                        $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    }
                    else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                        $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    }
                    else {
                        $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    }
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                        $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    }

                    else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                        $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    }
                    else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                        $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    }
                    else {
                        $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    }

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    if (hr == 0) { hr = 12; }

                    if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                        $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                    }

                    else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                        $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                    }
                    else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                        $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                    }
                    else {
                        $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                    }
                    break;
            }
        }
    }
    function SonicDashboardBubble_getServerDate() {
        var obj = {};
        jQuery.ajax({
            url: 'SonicDashboardWBubbleChart.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#hdnSrvtDtime").val(data.d);
                SonicDashboardBubble_getDate();
                sonicDashBoardWBubbleViewModel.GetLevel1DispositionData();
            }
        });
    }
    $("#SonicDashboardWBubbleChart").on('change', '[name="radio-choice-h-330"]', function () {
        var selected = $("input[type='radio'][name='radio-choice-h-330']:checked");   
        SonicDashboardBubble_getDate();
        sonicDashBoardWBubbleViewModel.GetLevel1DispositionData();
    });

//***************************Appointments Chart************************************//

    function AppointmentsChart_getDate() {      
        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-ApptChrt").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-231']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                    //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    var hour = dt.toString('hh');
                    if (tt == "PM" && hour < 12) {
                        hour = parseInt(hour) + 12;
                    }
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') + " " + hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                    if (hr == 0) { hr = 12; }
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;
            }
        }

    }
    function AppointmentsChart_getServerDate() {        
        var obj = {};
        jQuery.ajax({
            url: 'AppointmentsChart.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {               
                $("#hdnSrvtDtime").val(data.d);
                AppointmentsChart_getDate();
                //appointmentsChartViewModel.LoadBarChartData();
                appointmentsChartViewModel.LoadPieChartData();
                //appointmentsChartViewModel.GetAgentCount();
                //appointmentsChartViewModel.GetArrayData();
                //
                //DailyExcelReport();
                //ExportToExcel();
            }
        });

    }
    $(document).on('change', '[name="radio-choice-h-231"]', function () {       
        $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
        $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";
        if (navigator.platform == "iPad") {
            $("#ApptsbarChart").css("display", "none");
            $("#imgPrev").css("display", "none");
            $("#imgNext").css("display", "none");
        }
        $.mobile.loading("show", {
            text: "Loading...",
            textVisible: true,
            // theme: currentTheme_Page,
            textonly: true
        });
        //$(document).bind('touchmove', function (e) {
        //    e.preventDefault();
        //    return false;
        //});
        $(document).bind('mousewheel', function (e) {
            e.preventDefault();
        });
        $("body").addClass('ui-disabled');
        var selected = $("input[type='radio'][name='radio-choice-h-231']:checked");
        if (selected.val() == "MONTHLY") {
            $("#slider-ApptChrt").attr("min", "-12").slider("refresh");
        }
        else {
            $("#slider-ApptChrt").attr("min", "-90").slider("refresh");
        }
        AppointmentsChart_getDate();
        //DailyExcelReport();
        //ExportToExcel();        
        //appointmentsChartViewModel.LoadPieChartData();
        //appointmentsChartViewModel.GetAgentCount();
        //appointmentsChartViewModel.GetArrayData();
        if (appointmentsChartViewModel.TabSelected() == "Set %")
            appointmentsChartViewModel.tabSetPercntClick();
        else if (appointmentsChartViewModel.TabSelected() == "Show %")
            appointmentsChartViewModel.tabShowPercntClick();
        else if (appointmentsChartViewModel.TabSelected() == "Show %")
            appointmentsChartViewModel.tabSoldPercntClick();
        else
            appointmentsChartViewModel.tabApptSummClick();
        $("body").removeClass('ui-disabled');
        $.mobile.loading("hide");
    });
    $(document).on('slidestop', '#slider-ApptChrt', function () {        
         AppointmentsChart_getDate();
        if (navigator.platform == "iPad") {
            $("#ApptsbarChart").css("display", "none");
            $("#imgPrev").css("display", "none");
            $("#imgNext").css("display", "none");
        }
        $.mobile.loading("show", {
            text: "Loading...",
            textVisible: true,
            // theme: currentTheme_Page,
            textonly: true
        });
        $("body").addClass('ui-disabled');
        //$(document).bind('touchmove', function (e) {
        //    e.preventDefault();
        //    return false;
        //});
        $(document).bind('mousewheel', function (e) {
            e.preventDefault();
        });
        //appointmentsChartViewModel.LoadPieChartData();
        //appointmentsChartViewModel.GetAgentCount();
        //appointmentsChartViewModel.GetArrayData();
        if (appointmentsChartViewModel.TabSelected() == "Set %")
            appointmentsChartViewModel.tabSetPercntClick();
        else if (appointmentsChartViewModel.TabSelected() == "Show %")
            appointmentsChartViewModel.tabShowPercntClick();
        else if (appointmentsChartViewModel.TabSelected() == "Show %")
            appointmentsChartViewModel.tabSoldPercntClick();
        else
            appointmentsChartViewModel.tabApptSummClick();
        $("body").removeClass('ui-disabled');
        $(document).unbind('mousewheel');
        $.mobile.loading("hide");
    });
    //debugger;
    //var resizeTimeoutAppt = false;
    //$(document).on('change', '#slider-ApptChrt', function () {
    //    debugger;
    //    if (resizeTimeoutAppt) {
    //        clearTimeout(resizeTimeoutAppt);
    //    }
    //    resizeTimeoutAppt = setTimeout(function () {
    //        debugger;
    //        if (navigator.platform == "iPad") {
    //            $("#ApptsbarChart").css("display", "none");
    //            $("#imgPrev").css("display", "none");
    //            $("#imgNext").css("display", "none");
    //        }
    //        $.mobile.loading("show", {
    //            text: "Loading...",
    //            textVisible: true,
    //            textonly: true
    //        });
    //        $("body").addClass('ui-disabled');
    //        $(document).bind('mousewheel', function (e) {
    //            e.preventDefault();
    //        });
    //        debugger;
    //        DailyExcelReport();
    //        ExportToExcel();
    //        appointmentsChartViewModel.LoadPieChartData();
    //        appointmentsChartViewModel.GetAgentCount();
    //        appointmentsChartViewModel.GetArrayData();
    //    }, 500);
    //});


//**********************QAMainScreen Form******************************//
    

    $(document).on('slidestop', '#slider-QAMainScreen', function () {
       
        QAMainScreen_getDate();
        //$.mobile.loading("show", {
        //    text: "Loading...",
        //    textVisible: true,
        //    // theme: currentTheme_Page,
        //    textonly: true
        //});
        //$("body").addClass('ui-disabled');
        qaMainScreenViewModel.LoadAggregateData();
        $(document).bind('mousewheel', function (e) {
            e.preventDefault();
        });
    });
    $(document).on('change', '[name="radio-choice-h-530"]', function () {
        $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
        $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";
        setTimeout(function () {
            qaMainScreenViewModel.LoadAggregateData();
        }, 1000);
        var selected = $("input[type='radio'][name='radio-choice-h-530']:checked");
        if (selected.val() == "MONTHLY") {
            $("#slider-QAMainScreen").attr("min", "-12").slider("refresh");
        }
        else {
            $("#slider-QAMainScreen").attr("min", "-90").slider("refresh");
        }
    });
    function QAMainScreen_getDate() {
        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-QAMainScreen").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-530']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                    //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    var hour = dt.toString('hh');
                    if (tt == "PM" && hour < 12) {
                        hour = parseInt(hour) + 12;
                    }
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') + " " + hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                    if (hr == 0) { hr = 12; }
                    $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;
            }
        }

    }
    function QAMainScreen_getServerDate() {
        var obj = {};
        jQuery.ajax({
            url: 'QAMainScreen.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {              
                $("#hdnSrvtDtime").val(data.d);
                QAMainScreen_getDate();                          
            },
            complete: function () {
                qaMainScreenViewModel.LoadAggregateData();
            }
        });

    }

//****************************************Employee Performance****************************//


    $(document).on('slidestop', '#slider-EmpPerformance', function () {

        Emp_Performance_getDate();
        //$.mobile.loading("show", {
        //    text: "Loading...",
        //    textVisible: true,
        //    // theme: currentTheme_Page,
        //    textonly: true
        //});
        //$("body").addClass('ui-disabled');     
        if (empPerformanceViewModel.superColor() != undefined) {
            empPerformanceViewModel.GetAgentTileData();
        }
    });
    $(document).on('change', '[name="radio-choice-h-EmpPreformance"]', function () {
      
        $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
        $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";
        var selected = $("input[type='radio'][name='radio-choice-h-EmpPreformance']:checked");
        if (selected.val().trim() == "MONTHLY") {
            $("#slider-EmpPerformance").attr("min", "-12").slider("refresh");;
        }
        else {
            $("#slider-EmpPerformance").attr("min", "-90").slider("refresh");;
        }
        if (empPerformanceViewModel.superColor() != undefined) {
            empPerformanceViewModel.GetAgentTileData();
        }
    });

    function Emp_Performance_getDate() {       
        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-EmpPerformance").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-EmpPreformance']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(dy + 'st' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                    //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    var hour = dt.toString('hh');
                    if (tt == "PM" && hour < 12) {
                        hour = parseInt(hour) + 12;
                    }
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') + " " + hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                    if (hr == 0) { hr = 12; }

                    $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' +dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;
            }
        }

    }
    function Emp_Performance_getServerDate() {
        var obj = {};
        jQuery.ajax({
            url: 'EmployeePerformance.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#hdnSrvtDtime").val(data.d);
                Emp_Performance_getDate();
                empPerformanceViewModel.loadMetricsData();
                empPerformanceViewModel.loadConfigData();
            }
        });

    }

//****************************** Individual Employee Performance page******************************//

    $(document).on('slidestop', '#slider-IndividualEmpPerformance', function () {

        IndividualEmp_Performance_getDate();
        if (individualEmployeePerformance.superColor() != undefined) {
            individualEmployeePerformance.loadIndividualAgentData();
        }
        individualEmployeePerformance.CoachingHistoryData();
        individualEmployeePerformance.loadTeamCompTileData(individualEmployeePerformance.page());
    });
    $(document).on('change', '[name="radio-choice-h-IndividualEmpPerformance"]', function () {
       
        $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
        $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";
        if (individualEmployeePerformance.superColor() != undefined) {
            individualEmployeePerformance.loadIndividualAgentData();
        }
        individualEmployeePerformance.CoachingHistoryData();
        individualEmployeePerformance.loadTeamCompTileData(individualEmployeePerformance.page());

        var selected = $("input[type='radio'][name='radio-choice-h-IndividualEmpPerformance']:checked");
        if (selected.val().trim() == "MONTHLY") {
            $("#slider-IndividualEmpPerformance").attr("min", "-12").slider("refresh");;

        }
        else {
            $("#slider-IndividualEmpPerformance").attr("min", "-90").slider("refresh");;

        }

    });

    function IndividualEmp_Performance_getDate() {
       
        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-IndividualEmpPerformance").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-IndividualEmpPerformance']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(dy + 'st' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 0) == '1') || (dy.substring(dy.length, 1) == '1') && (dy != '11'))) {
                    //    $("#LblDaily").text(dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 0) == '2') || (dy.substring(dy.length, 1) == '2') && (dy != '12'))) {
                    //    $("#LblDaily").text(dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 0) == '3') || (dy.substring(dy.length, 1) == '3') && (dy != '13'))) {
                    //    $("#LblDaily").text(dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(dy + 'th ' + mt + ' ' + yr);
                    //}

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    var hour = dt.toString('hh');
                    if (tt == "PM" && hour < 12) {
                        hour = parseInt(hour) + 12;
                    }
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') + " " + hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                    if (hr == 0) { hr = 12; }

                    $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' + dy + ' ' + yr);
                    //if (((dy.substring(dy.length, 1) == '1') && (dy != '11')) || (dy == '1')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'st ' + mt + ' ' + yr);
                    //}

                    //else if (((dy.substring(dy.length, 1) == '2') && (dy != '12')) || (dy == '2')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'nd ' + mt + ' ' + yr);
                    //}
                    //else if (((dy.substring(dy.length, 1) == '3') && (dy != '13')) || (dy == '3')) {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'rd ' + mt + ' ' + yr);
                    //}
                    //else {
                    //    $("#LblDaily").text(hr + ' ' + tt + ' ' + dy + 'th ' + mt + ' ' + yr);
                    //}
                    break;
            }
        }

    }
    function IndividualEmp_Performance_getServerDate() {
       
        var obj = {};
        jQuery.ajax({
            url: 'IndividualEmployeePerformance.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {               
                $("#hdnSrvtDtime").val(data.d);
                IndividualEmp_Performance_getDate();
                individualEmployeePerformance.loadConfigData();
                individualEmployeePerformance.loadTasksDataForAgent();
               // individualEmployeePerformance.loadTeamCompTileData("I_EmpPerformance");
                //individualEmployeePerformance.loadTeamCompTileData("organisationComparison");
                
            }
        });

    }


    //********************************Coaching Page for UAT************************************//
    

    function Coaching_getActualGoalValues(serial, metric) {
        var goaltxtVal = $("#txtGoal" + serial).val();
        var actualtxtVal = $("#txtActual" + serial).val();
        var obj = { metric: metric, agentID: $("#hdnAgentId").val(), offsetType: $("#hdnOffsetType").val(), offset: $("#hdnOffset").val() };
       
        jQuery.ajax({
            url: 'CoachingPage.aspx/GetActualGoal',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              
                var dataCoaching = data.d;
                var goal = parseInt(dataCoaching.Goal);
                var actual = parseInt(dataCoaching.Actual);
                $("#txtGoal" + serial).val(goal.toFixed(2));
                $("#txtActual" + serial).val(actual.toFixed(2));
                //switch (metric) {
                       
                //    case 'AHT':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'Attendance':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'Conversion Rate':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'Appointment Rate':
                          
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'Quality Score':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'CSAT Survey Result':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'Non Productive Time':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'Bill To Pay':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;
                //    case 'Coaching Effectiveness':
                           
                //        $("#txtGoal" + serial).val(goal.toFixed(2));
                //        $("#txtActual" + serial).val(actual.toFixed(2));
                //        break;

                //}
            }
        });

    }
/*----------CoachingPieChart Page---------------*/
    function CoachingPieChart_HideScroll() {

        var platform = navigator.platform;
        if (platform != "iPad") {
            //    var isTouchDevice = ('ontouchstart' in document.documentElement);
            //    if (!isTouchDevice) {
            $("#parent").css("overflow-y", "scroll");
        }
        else {
            $("#parent").css("overflow-y", "hidden");
        }
    }
    var pAng = [], rotatedDegree = 0, prevSelectedSegment;
    //var startAngle, endAngle, metricNm,
    var xValues = [], yValues = [], metricsNm = [], strtAng = [], endAng = [], metricData = [], metricQty = [], segColor = [], segCT, prevXValue, prevYVal, initialAngles = [];
    var flagRotate, flag = true, totalMetrics, flagInitial;
    var sAngle = [], eAngle = [], mNames = [];
    function CoachngPieChart_Ready() {

        $('#pieBrdr').on("swiperight", CoachngPieChart_excludePie);
        document.ontouchmove = function (event) {
            event.preventDefault();
        }
        var query_params = Coaching_getURLParameters($(location).attr('href'));
        $("#backButton").click(function () {
            $(this).addClass("ui-btn-active");
            window.location = decodeURIComponent(query_params['BkUrl']);
        });

        if (flagRotate == null) {
            CoachngPieChart_createPieChart();
        }
        rotatedDegree = 0;

        CoachngPieChart_rotatePieChart();

        // Bind the swiperightHandler callback function to the swipe event on div.box
        // $('#CoachingPieChart').on("swiperight", CoachngPieChart_swiperightHandler); //header1

    }


    var imgLineChartArray = new Array();
    var imgColumnChartArray = new Array();
    var imageData = [], ctr = 0;
    function loadGraphImages(metric, totalMetricsCount) {

        $.mobile.loading("show", {
            text: "Loading...",
            textVisible: true,
            // theme: $("#hdnTheme").val(),
            textonly: true
        });
        $(document).bind('touchmove', false); //Prevent the touch events when popup appears
        $("body").addClass('ui-disabled');
        $('#cnPiechart').unbind('touchy-rotate', handleTouchyRotate);
        $('#cnPiechart').unbind('touchend', displayLineChart);
        $('#cnPiechart').unbind('touchstart', enableTouchMove);

        var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));

        for (var count = 0; count < totalMetricsCount; count++) {

            imgLineChartArray[metric[count]] = $(document.createElement('img'));
            imgLineChartArray[metric[count]].attr("src", "/Pages/LineGraph.aspx?AgentID=" + agent + "&Metric=" + metric[count]);
            imgLineChartArray[metric[count]].css("height", '100%');
            imgLineChartArray[metric[count]].css("width", '100%');
            if ($("#hdnTheme").val() == "b") {
                imgLineChartArray[metric[count]].css("background-color", "#396B9E");
                $("#CssDivLineChart").css("background-color", "#396B9E");
            }
            else {
                $("#CssDivLineChart").css('background-image', ' url(/Styles/images/MetricLineChartBckgrnd.png)');
                $("#CssDivLineChart").css('margin', '5px 10px 10px 10px');
                $("#CssDivLineChart").css('background-color', 'Black'); /*width: 710px;*/
                $("#CssDivLineChart").css('width', '94%');
                $("#CssDivLineChart").css('height', '200px');
            }
            imgLineChartArray[metric[count]].css("display", 'none');
            imgLineChartArray[metric[count]].appendTo('#CssDivLineChart');
            $("#CssDivLineChart").css('padding-top', '50px');
        }

        for (var count = 0; count < totalMetricsCount; count++) {

            imgColumnChartArray[metric[count]] = $(document.createElement('img'));
            imgColumnChartArray[metric[count]].attr("src", "/Pages/ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metric[count]);
            if ($("#hdnTheme").val() == "b") {
                imgColumnChartArray[metric[count]].css("background-color", "#396B9E");
            }

            imgColumnChartArray[metric[count]].css("height", "100%");
            imgColumnChartArray[metric[count]].css("width", "100%");
            imgColumnChartArray[metric[count]].css("display", 'none');
            imgColumnChartArray[metric[count]].appendTo('#CssDivPieChart');
            $(imgColumnChartArray[metric[count]]).on("load", function () {
                ctr++;
                if (ctr == totalMetricsCount) {

                    $.mobile.loading("hide");
                    $(document).unbind('touchmove', false); //Prevent the touch events when popup appears
                    $("body").removeClass('ui-disabled');
                    $('#cnPiechart').bind('touchy-rotate', handleTouchyRotate);
                    $('#cnPiechart').bind('touchend', displayLineChart);
                    $('#cnPiechart').bind('touchstart', enableTouchMove);
                }

            });
        }
    }
    var total = 0;
    function CoachngPieChart_createPieChart() {
        flagInitial = true;
        var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));
        var obj = { agentId: agent };
        var metric = [], metric1, metric2, metric3, metric4, metric5, metric6, metric7;
        var metricQty1 = 0, metricQty2 = 0, metricQty3 = 0, metricQty4 = 0, metricQty5 = 0, metricQty6 = 0, metricQty7 = 0;
        var color = [[]];
        var count = 0;

        jQuery.ajax({
            url: 'CoachingPage.aspx/GetPieChartValues',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                $.each(data.d, function (key, value) {
                    metric[count] = value.Metric;
                    metricQty[count] = value.Quantity;
                    color[count] = [value.Color];
                    total = parseInt(total) + parseInt(value.Quantity);
                    count++;

                });

                $.each(metricQty, function (index, value) {
                    metricQty[index] = (value / total) * 360;
                    //                alert(metricQty[index]);
                });


                var pieChart = new PieChart("cnPiechart",
                    {
                        includeLabels: true,
                        //data: [s1, s2, s3, s4, s5, s6, s7],
                        //labels: ["AHT", "Attendance", "Conversion Rate", "Quality Score", "CSAT Survey Result", "Non Billable Aux Time", "Bill to Pay"],
                        data: metricQty,
                        labels: metric,
                        colors: color //
                        //[
                        //                        ["rgb(160,102,198)"],
                        //                        ["rgb(235,224,68)"],
                        //                        ["rgb(45,190,220)"],
                        //                        ["rgb(38,218,34)"],
                        //                        ["rgb(255,17,73)"],
                        //                        ["rgb(233,156,48)"],
                        //                        ["rgb(226,85,132)"]
                        //]
                    }

            );
                loadGraphImages(metric, count);
                pieChart.draw();
                var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));
                //            $("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricsNm[totalMetrics - 1]);
                //            $("#imgLineChart").attr("src", "LineGraph.aspx?AgentID=" + agent + "&Metric=" + metricsNm[totalMetrics - 1]);

                //            if (metricsNm[totalMetrics - 1] == "Non Billable Aux Time") {
                //                imgColumnChartArray["Non Productive Time"].css("display", "");
                //                imgLineChartArray["Non Productive Time"].css("display", "");
                //                prevSelectedSegment = "Non Productive Time";

                //            }
                //            else {

                if (totalMetrics > 0) {
                    imgColumnChartArray[metricsNm[totalMetrics - 1]].css("display", "");
                    imgLineChartArray[metricsNm[totalMetrics - 1]].css("display", "");
                    prevSelectedSegment = metricsNm[totalMetrics - 1];
                    //}
                    writeLabels(totalMetrics - 1);
                }
                else {
                    $.mobile.loading("hide");
                    $(document).unbind('touchmove', false); //Prevent the touch events when popup appears
                    $("body").removeClass('ui-disabled');
                }
            }
        });
    }

    function PieChart(id, o) {
        this.includeLabels = false;
        if (o.includeLabels == undefined) {
            this.includeLabels = false;
        }
        else {
            this.includeLabels = o.includeLabels;
        }
        this.data = o.data ? o.data : [30, 70, 45, 65, 20, 130]; // in degrees
        this.labels = o.labels ? o.labels : ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
        this.colors = o.colors ? o.colors : [
                    ["#bbddb3", "#1d8e04"], // green
                    ["#e2f5b4", "#9edd08"], // yellow green
                    ["#fdfbb4", "#faf406"], // yellow
                    ["#fbd4b7", "#f2700f"], // orange
                    ["#f8bdb4", "#ea2507"], // red
                    ["#e2bcbd", "#9e2126"]  // purple
        ];

        this.canvas = document.getElementById(id);
    }

    function CoachngPieChart_GetQueryStringParams(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    function getAngle(cX, cY, mX, mY) {
        var angle = Math.atan2(mY - cY, mX - cX);
        return angle;
    }

    var degree = 0;
    var segmentCount = 0, flagCollision = false;
    var totalPercentage = 0;
    var angle = 0;
    function CoachngPieChart_rotatePieChart() {
        //        $('.drop div canvas').css('-webkit-transform', 'rotate(' + 0 + 'deg)');
        var metricName;
        flagRotate = true;
        var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));

        if (!CoachngPieChart_is_touch_device()) {
            //Desktop Support

            var canvas = document.getElementById("cnPiechart");
            var context = canvas.getContext('2d');

            $('.drop div canvas').mousedown(function (event) {

                var offX = canvas.offsetLeft;
                var offY = canvas.offsetTop;
                var clickAngle = getAngle(350 + offX, 350 + offY, event.clientX, event.clientY) - angle;

                $(document).bind("mousemove.rotateImg", function (event) {
                    // calculate move angle minus the angle onclick
                    angle = (getAngle(350 + offX, 350 + offY, event.clientX, event.clientY) - clickAngle);

                    CoachngPieChart_rotateOnMouse(event, $('.drop div canvas'));

                });
            });


            //        $('.drop div canvas').mousedown(function (e) {
            //            //
            //            e.preventDefault(); // prevents the dragging of the image.
            //            $(document).bind('mousemove.rotateImg', function (e2) {
            //                CoachngPieChart_rotateOnMouse(e2, $('.drop div canvas'));
            //            });
            //            $(document).bind('touchmove.rotateImg', function (e2) {
            //                CoachngPieChart_rotateOnMouse(e2, $('.drop div canvas'));
            //            });
            //        });


            $("#CoachingPieChart").mouseup(function (e) {
                metricName = "";
                //redraw(lblRotAng, xValues, yValues, segCT, metricsNm);
                $(document).unbind('mousemove.rotateImg');
                $(document).unbind('touchmove.rotateImg');

                var canvas = document.getElementById("cnPiechart");
                var context = canvas.getContext('2d');
                //            var pw = $('.drop div canvas')
                //            var offset = pw.offset();
                //            var center_x = 323;
                //            var center_y = 323;
                //            var mouse_x = e.pageX;
                //            var mouse_y = e.pageY;          
                //            var radians = Math.atan2((mouse_x - center_x), (mouse_y - center_y));
                //            var degree = (radians * (180 / Math.PI) * -1) + 0;

                var computedStyle = window.getComputedStyle(canvas, null);
                var tr = computedStyle.getPropertyValue("-webkit-transform") || computedStyle.getPropertyValue("-moz-transform") ||
             computedStyle.getPropertyValue("-ms-transform") ||
             computedStyle.getPropertyValue("-o-transform") ||
             computedStyle.getPropertyValue("transform") ||
             "fail...";

                // With rotate(30deg)...
                // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)        
                //            var values = tr.split('(')[1];
                //            values = values.split(')')[0];
                var values = tr.substring(7, (tr.length - 1));
                values = values.split(',');
                var a = values[0];
                var b = values[1];
                var c = values[2];
                var d = values[3];

                var scale = Math.sqrt(a * a + b * b);

                // arc sin, convert from radians to degrees, round
                // DO NOT USE: see update below
                var sin = b / scale;

                var degree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                var ar = rotate(500, 348, 350, 350, -1 * degree);        //var imgData = context.getImageData(10, 10, 50, 50);
                rotatedDegree = degree * -1;
                var t1 = Math.round(ar[0]);
                var t2 = Math.round(ar[1]);

                // getMetricName(p)
                var p = context.getImageData(t1, t2, 2, 2).data;

                if (p[0] == 160 && p[1] == 102 && p[2] == 198) {
                    metricName = "AHT";
                }

                if (p[0] == 116 && p[1] == 110 && p[2] == 23) {
                    metricName = "Attendance";
                }
                if (p[0] == 45 && p[1] == 190 && p[2] == 220) {
                    metricName = "Bill To Pay";
                }

                if (p[0] == 38 && p[1] == 218 && p[2] == 34) {
                    if (metricsNm.indexOf('Conversion Rate') == -1)
                        metricName = "Appointment Rate";
                    else
                        metricName = "Conversion Rate";

                }

                if (p[0] == 255 && p[1] == 17 && p[2] == 73) {
                    metricName = "CSAT Survey Result";
                }

                if (p[0] == 233 && p[1] == 156 && p[2] == 48) {
                    metricName = "Non Productive Time";
                }

                if (p[0] == 226 && p[1] == 85 && p[2] == 132) {
                    metricName = "Quality Score";
                }
                if (p[0] == 157 && p[1] == 51 && p[2] == 31) {
                    metricName = "Coaching Effectiveness";
                }

                if (metricName == "" || metricName == undefined) {

                    var degree = ((angle) * (180 / Math.PI));
                    $("#cnPiechart").css('-moz-transform', 'rotate(' + (degree + 1) + 'deg)');
                    $("#cnPiechart").css('-webkit-transform', 'rotate(' + (degree + 1) + 'deg)');
                    $("#cnPiechart").css('-o-transform', 'rotate(' + (degree + 1) + 'deg)');
                    $("#cnPiechart").css('-ms-transform', 'rotate(' + (degree + 1) + 'deg)');
                    $("#cnPiechart").css('transform', 'rotate(' + (degree + 1) + 'deg)');

                    var degree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                    var ar = rotate(500, 348, 350, 350, -1 * (degree + 1));
                    rotatedDegree = (degree + 1) * -1;
                    var t1 = Math.round(ar[0]);
                    var t2 = Math.round(ar[1]);

                    var p = context.getImageData(t1, t2, 2, 2).data;
                    metricName = getMetricName(p);
                }
                if (metricName != "" || metricName != undefined) {
                    //            $("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricName);
                    //            $("#imgLineChart").attr("src", "LineGraph.aspx?AgentID=" + agent + "&Metric=" + metricName);

                    imgColumnChartArray[prevSelectedSegment].css("display", "none");

                    if (metricName == "Non Billable Aux Time") {
                        imgColumnChartArray["Non Productive Time"].css("display", "");
                        imgLineChartArray[prevSelectedSegment].css("display", "none");
                        imgLineChartArray["Non Productive Time"].css("display", "");
                        prevSelectedSegment = "Non Productive Time";

                    }
                    else {
                        imgColumnChartArray[metricName].css("display", "");
                        imgLineChartArray[prevSelectedSegment].css("display", "none");
                        imgLineChartArray[metricName].css("display", "");
                        prevSelectedSegment = metricName;
                    }

                }
                segmentCount = segCT;

                //display metric labels on mouse up
                flagCollision = false;
                totalPercentage = 0;
                for (var segmentCt = 0; segmentCt < segCT + 1; segmentCt++) {
                    context.save();
                    //                flagInitial = true;               
                    drawMetricLabels(canvas, context, sAngle[segmentCt], eAngle[segmentCt], mNames[segmentCt], segmentCt, -1 * degree);
                }


                degree = degree * -1;
                context.save();
                context.beginPath();
                var tx = 350;
                var ty = 350;
                context.translate(tx, ty);
                context.rotate((degree * Math.PI) / 180);
                context.translate(-tx, -ty);
                context.font = 10 + "pt Arial";
                // context.fillText("Total Coaching", 315, 350);
                context.fillText(total, 340, 355);
                context.restore();

                if (flag)
                    writeLabels(segmentCount);

            });

        } else {
            //Touch device support        
            //Rotate the Chart on touch enabled device
            $('#cnPiechart').bind('touchy-rotate', handleTouchyRotate);
            $('#cnPiechart').bind('touchend', displayLineChart);
            $('#cnPiechart').bind('touchstart', enableTouchMove);
        }
    }

    function getMetricName(p) {
        var metricName;
        if (p[0] == 160 && p[1] == 102 && p[2] == 198) {
            metricName = "AHT";
        }

        if (p[0] == 235 && p[1] == 224 && p[2] == 68) {
            metricName = "Attendance";
        }
        if (p[0] == 45 && p[1] == 190 && p[2] == 220) {
            metricName = "Bill To Pay";
        }

        if (p[0] == 38 && p[1] == 218 && p[2] == 34) {
            if (metricsNm.indexOf('Conversion Rate') == -1)
                metricName = "Appointment Rate";
            else
                metricName = "Conversion Rate";
        }

        if (p[0] == 255 && p[1] == 17 && p[2] == 73) {
            metricName = "CSAT Survey Result";
        }

        if (p[0] == 233 && p[1] == 156 && p[2] == 48) {
            metricName = "Non Productive Time";
        }

        if (p[0] == 226 && p[1] == 85 && p[2] == 132) {
            metricName = "Quality Score";
        }
        if (p[0] == 157 && p[1] == 51 && p[2] == 31) {
            metricName = "Coaching Effectiveness";
        }
        return metricName;
    }
    var handleTouchyRotate = function (e, phase, $target, data) {

        redraw(-1 * degree, xValues, yValues, segCT, metricsNm);

        //$("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricName);

        //        var obj = { agentId: agent, metric: metricName };
        //        var reasonCode = [];
        //        var quantity = [];
        //        jQuery.ajax({
        //            url: 'CoachingPieChart.aspx/BindChart',
        //            type: "POST",
        //            data: JSON.stringify(obj),
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            error: function (jqXHR, textStatus, errorThrown) {
        //                alert(jqXHR.resultText);
        //            },
        //            success: function (data) {

        //                $.each(data.d, function (key, value) {
        //                    reasonCode = value.ReasonCode.split(',');
        //                    quantity = value.Quantity.split(',');
        //                    //document.title = value.ReasonCode;
        //                    document.title = (value.ReasonCode + "," + value.Quantity);
        //                    // document.title = ("ReasonCode:" + value.ReasonCode+","+  "Quantity:" + value.Quantity);
        //                    // alert("Quantity:" + value.Quantity);
        //                });
        //               
        //                $("#columnChartCoaching_hdnReasonCode").val(reasonCode);
        //                $("#columnChartCoaching_hdnQuantity").val(quantity);
        //            }

        //        });
        if (phase === 'move') {
            degree += data.degreeDelta;
            $target.css('webkitTransform', 'rotate3d(0,0,1,' + degree + 'deg)'); // 3d transforms are not working on the galaxy tab 7" ?  

        }
    }

    function enableTouchMove() {

        $('#cnPiechart').bind('touchy-rotate', handleTouchyRotate);
    }

    function displayLineChart() {

        $('#cnPiechart').unbind('touchy-rotate');

        var canvas = document.getElementById("cnPiechart");
        var metricName;
        var agent = parseInt(CoachngPieChart_GetQueryStringParams('agentId'));
        var context = canvas.getContext('2d');

        var ar = rotate(475, 350, 350, 350, -1 * degree);
        var p = context.getImageData(ar[0], ar[1], 1, 1).data;

        if (p[0] == 160 && p[1] == 102 && p[2] == 198) {
            metricName = "AHT";
        }

        if (p[0] == 235 && p[1] == 224 && p[2] == 68) {
            metricName = "Attendance";
        }
        if (p[0] == 45 && p[1] == 190 && p[2] == 220) {
            metricName = "Bill To Pay";
        }

        if (p[0] == 38 && p[1] == 218 && p[2] == 34) {
            if (metricsNm.indexOf('Conversion Rate') == -1)
                metricName = "Appointment Rate";
            else
                metricName = "Conversion Rate";
        }

        if (p[0] == 255 && p[1] == 17 && p[2] == 73) {
            metricName = "CSAT Survey Result";
        }

        if (p[0] == 233 && p[1] == 156 && p[2] == 48) {
            metricName = "Non Productive Time";
        }

        if (p[0] == 226 && p[1] == 85 && p[2] == 132) {
            metricName = "Quality Score";
        }
        if (p[0] == 157 && p[1] == 51 && p[2] == 31) {
            metricName = "Coaching Effectiveness";
        }
        if (metricName == "" || metricName == undefined) {
            degree = degree + 1;
            $('#cnPiechart').bind('touchy-rotate');
            $('#cnPiechart').css('webkitTransform', 'rotate3d(0,0,1,' + degree + 'deg)');
            $('#cnPiechart').unbind('touchy-rotate');
            var ar = rotate(475, 350, 350, 350, -1 * degree);
            var p = context.getImageData(ar[0], ar[1], 1, 1).data;
            metricName = getMetricName(p);
        }

        if (metricName != "" || metricName != undefined) {
            //    $("#imgColumnChart").attr("src", "ColumnChart.aspx?AgentID=" + agent + "&Metric=" + metricName);
            //    $("#imgLineChart").attr("src", "LineGraph.aspx?AgentID=" + agent + "&Metric=" + metricName);
            imgColumnChartArray[prevSelectedSegment].css("display", "none");

            if (metricName == "Non Billable Aux Time") {
                imgColumnChartArray["Non Productive Time"].css("display", "");
                imgLineChartArray[prevSelectedSegment].css("display", "none");
                imgLineChartArray["Non Productive Time"].css("display", "");
                prevSelectedSegment = "Non Productive Time";

            }
            else {
                imgColumnChartArray[metricName].css("display", "");
                imgLineChartArray[prevSelectedSegment].css("display", "none");
                imgLineChartArray[metricName].css("display", "");
                prevSelectedSegment = metricName;
            }
        }

        var computedStyle = window.getComputedStyle(canvas, null);
        var tr = computedStyle.getPropertyValue("-webkit-transform") || computedStyle.getPropertyValue("-moz-transform") ||
             computedStyle.getPropertyValue("-ms-transform") ||
             computedStyle.getPropertyValue("-o-transform") ||
             computedStyle.getPropertyValue("transform") ||
             "fail...";
        var values = tr.substring(7, (tr.length - 1));
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);
        var sin = b / scale;
        rotatedDegree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        rotatedDegree = rotatedDegree * -1;
        flagCollision = false;
        totalPercentage = 0;

        for (var segmentCt = 0; segmentCt < segCT + 1; segmentCt++) {
            context.save();
            drawMetricLabels(canvas, context, sAngle[segmentCt], eAngle[segmentCt], mNames[segmentCt], segmentCt, -1 * degree);
        }

        // displaying total coaching sesson at centre   
        context.save();
        context.beginPath();
        var tx = 350;
        var ty = 350;
        context.translate(tx, ty);
        context.rotate(((degree * -1) * Math.PI) / 180);
        context.translate(-tx, -ty);
        context.font = 10 + "pt Arial";
        //   context.fillText("Total Coaching", 315, 350);
        context.fillText(total, 340, 355);

        context.restore();

        if (flag)
            writeLabels(segCT);
    }

    function writeLabels(segmentCnt) {
        flag = false;
        var canvas = document.getElementById('tip');
        var context = canvas.getContext('2d');
        var percentage = 0;
        context.font = 13 + "px Helvetica";
        for (var count = 0; count <= segmentCnt; count++) {
            context.save();

            if (metricsNm[count] == "Non Productive Time") {

                context.fillStyle = "white";
            }

            context.fillStyle = segColor[count];
            context.fillRect(10, (count + 1) * 18 - 5, 5, 5);
            context.fillText(metricsNm[count], 20, (count + 1) * 18);


            //        percentage = (metricQty[count] * 100) / 360;
            //        context.fillText(percentage.toFixed(2)+"%", 30 + context.measureText(metricsNm[count]).width, (count + 1) * 18);
            context.restore();
        }
    }

    function CoachngPieChart_rotateOnMouse(e, pw) {

        var offset = pw.offset();
        var degree = (angle * (180 / Math.PI)) + 0;

        $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
        $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
        $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
        $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');
        $(pw).css('transform', 'rotate(' + degree + 'deg)');

        //    context.rotate((degree * Math.PI) / 180);
        redraw(-1 * degree, xValues, yValues, segCT, metricsNm);
        //lblRotAng = degree;
    }

    function redraw(degree, xValues, yValues, segCT, metricsNm) {

        angleInDegrees = degree;
        var canvas = document.getElementById('cnPiechart');
        var context = canvas.getContext('2d');
        var metricWords;
        var prev_x, prev_y;
        for (var ctr = 0; ctr <= segCT; ctr++) {
            context.beginPath();
            context.save();
            var txtWidth; // = context.measureText(metricsNm[ctr]).width;
            if (ctr == 0) {
                fillCircle(350, 350, 27, context);
            }
            if (metricsNm[ctr] == "AHT") {
                txtWidth = context.measureText(' AHT  ').width;
                //            fillCircle(xValues[ctr], yValues[ctr], 73,context);
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            else if (metricsNm[ctr] == "Attendance") {
                txtWidth = context.measureText(' Attendance  ').width;
                //        fillCircle(xValues[ctr] , yValues[ctr], txtWidth);
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            else if (metricsNm[ctr] == "Conversion Rate") {
                txtWidth = context.measureText(' Conversion Rate ').width;
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            else if (metricsNm[ctr] == "Appointment Rate") {
                txtWidth = context.measureText(' Appointment Rate ').width;
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            else if (metricsNm[ctr] == "Quality Score") {
                txtWidth = context.measureText(' Quality  Score  ').width;
                //            fillCircle(xValues[ctr], yValues[ctr], txtWidth)                 
                clearCircle(xValues[ctr], yValues[ctr], 73, context);

            }
            else if (metricsNm[ctr] == "CSAT Survey Result") {
                txtWidth = context.measureText('CSATSurvey Result').width;
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            else if (metricsNm[ctr] == "Non Billable Aux Time") {
                txtWidth = context.measureText(' Non Billable Aux').width;
                //            fillCircle(xValues[ctr], yValues[ctr], txtWidth)
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            else if (metricsNm[ctr] == "Bill To Pay") {
                txtWidth = context.measureText(' Bill To Pay ').width;
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            else {
                txtWidth = context.measureText(metricsNm[ctr]).width;
                clearCircle(xValues[ctr], yValues[ctr], 73, context);
            }
            context.restore();
        }
    }

    var fillCircle = function (x, y, radius, context) {
        context.fillStyle = 'black';
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fill();
    };
    var clearCircle = function (x, y, radius, context) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.clip();
        context.clearRect(x - radius - 1, y - radius - 1,
                          radius * 2 + 2, radius * 2 + 2);
    };


    PieChart.prototype = {
        select: function (segment) {
            var self = this;
            var context = this.canvas.getContext("2d");
            this.drawSegment(this.canvas, context, segment, this.data[segment], true, this.includeLabels);
        },

        draw: function () {
            var self = this;
            var context = this.canvas.getContext("2d");

            // Set the shadow properties that control the appearance of the shaow
            totalMetrics = this.data.length;
            for (var segmentCt = 0; segmentCt < this.data.length; segmentCt++) {
                this.drawSegment(this.canvas, context, segmentCt, this.data[segmentCt], false, this.includeLabels);
            }

            context.restore();
            context.beginPath();
            context.arc(Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2), 30, 0, 2 * Math.PI);
            context.fillStyle = 'black';
            context.fill();

            context.restore();
            context.font = 10 + "pt Arial";
            context.fillStyle = 'white';
            //context.fillText("Total Coaching", 315, 350);
            context.fillText(total, 340, 355);

            //Set Black Rounded Border Around the PieChart
            context.beginPath();
            context.arc(Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2), 180.5, 0, 2 * Math.PI);
            context.lineWidth = 10;
            context.strokeStyle = '#302C30';
            context.stroke();

            //segCT = segmentCt;

        },

        drawSegment: function (canvas, context, segmentCt, size, isSelected, includeLabels) {
            //
            var self = this;

            context.save();
            var centerX = Math.floor(canvas.width / 2);
            var centerY = Math.floor(canvas.height / 2);
            radius = 180; // Math.floor(canvas.width / 2);

            var startingAngle = self.degreesToRadians(self.sumTo(self.data, segmentCt));
            var arcSize = self.degreesToRadians(size);
            var endingAngle = startingAngle + arcSize;
            //var prcnt = self.getPrcent(self.data, segmentCt);

            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
            context.closePath();

            isSelected ?
                            context.fillStyle = self.colors[segmentCt][1] :
                            context.fillStyle = self.colors[segmentCt][0];
            segColor[segmentCt] = self.colors[segmentCt][0];
            context.fill();



            //Sets the path for the Shadow
            context.beginPath();
            context.arc(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 180.5, 0, endingAngle, true);
            context.clip();
            context.closePath();


            // Set the Shadow effect around the PieChart when it reaches the last segment 
            if (segmentCt == 6) {
                context.beginPath();
                context.strokeStyle = "rgba(128, 128, 128, 0.5)";
                context.lineWidth = 10;
                context.shadowBlur = 15;
                context.shadowColor = 'black';
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.arc(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 180.5, 0, endingAngle, true);
                context.closePath();
                context.stroke();
            }

            context.restore();
            //Draw tagged Label
            //drawMetricLabels(startingAngle);


            sAngle[segmentCt] = startingAngle;
            eAngle[segmentCt] = endingAngle;
            mNames[segmentCt] = self.labels[segmentCt];


            if (includeLabels && (self.labels.length > segmentCt)) {
                //self.drawSegmentLabel(canvas, context, segmentCt, startingAngle, endingAngle, isSelected);
                drawMetricLabels(canvas, context, startingAngle, endingAngle, self.labels[segmentCt], segmentCt, 0);
                metricsNm[segmentCt] = self.labels[segmentCt];
            }

            segCT = segmentCt;

        },


        drawSegmentLabel: function (canvas, context, segmentCt, startingAngle, endingAngle, isSelected) {

            var self = this;
            context.save();
            var x = Math.floor(canvas.width / 2);
            var y = Math.floor(canvas.height / 2);
            var angle;
            var angleD = self.sumTo(self.data, segmentCt);
            var flip = (angleD < 90 || angleD > 270) ? false : true;
            var prcnt = Math.floor(((self.data[segmentCt] / 360) * 100));

            //        context.translate(x, y);
            //        //Rotate labels
            //        context.textAlign = "right";
            //        angle = self.degreesToRadians(angleD);
            //        context.rotate(angle);

            //var fontSize = Math.floor(canvas.height / 35);
            context.font = 11 + "pt Helvetica";
            context.fillStyle = 'white';
            //var pos1 = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180, self.labels[segmentCt]);
            var dx = Math.floor(canvas.width * 0.5) - 10;
            var dy = Math.floor(Math.floor(canvas.height / 2) * 0.05);
            //var dy = Math.floor(canvas.height / 2) + 180 * Math.sin(((startingAngle + endingAngle) / 2))


            if (self.labels[segmentCt] == "AHT") {
                //context.fillText(prcnt + "%", 200, 60);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx - 90, dy);
            }
            else if (self.labels[segmentCt] == "Attendance") {
                //context.fillText(prcnt + "%", 180, 60);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx - 40, dy);
            }
            else if (self.labels[segmentCt] == "Conversion Rate") {
                //context.fillText(prcnt + "%", 180, 60);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx - 15, dy);
            }
            else if (self.labels[segmentCt] == "Appointment Rate") {
                //context.fillText(prcnt + "%", 180, 60);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx - 15, dy);
            }
            else if (self.labels[segmentCt] == "Quality Score") {
                //context.fillText(prcnt + "%", 180, 60);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx - 40, dy);
            }
            else if (self.labels[segmentCt] == "CSAT Survey Result") {
                //context.fillText(prcnt + "%", 180, 60);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx + 15, dy);
            }
            else if (self.labels[segmentCt] == "Non Billable Aux Time") {
                //context.fillText(prcnt + "%", 180, 60);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx + 12, dy);
            }
            else if (self.labels[segmentCt] == "Bill To Pay") {
                //context.fillText(prcnt + "%", 180, dy + 20);
                if ((endingAngle - startingAngle) < 0.05) { dy -= 10; }
                context.fillText(self.labels[segmentCt], dx - 50, dy);
                //alert("diff:" + (endingAngle - startingAngle) + "; sa:" + startingAngle + "; ea:" + endingAngle);

            }
            context.restore();
        },

        drawLabel: function (segmentCt) {
            var self = this;
            var context = this.canvas.getContext("2d");
            var size = self.data[segmentCt];
            self.drawSegmentLabel(this.canvas, context, segmentCt, size, false);
        },


        // helper functions
        degreesToRadians: function (degrees) {
            return (degrees * Math.PI) / 180;
        },

        sumTo: function (a, segmentCt) {
            var sum = 0;
            for (var j = 0; j < segmentCt; j++) {
                sum += a[j];
            }
            return sum;
        }
    }

    function getPointsOnCircle(cx, cy, a, r, metricName) {
        if (metricName == "AHT") {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        else if (metricName == "Attendance") {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        else if (metricName == "Bill To Pay") {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        else if (metricName == "Conversion Rate") {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        else if (metricName == "Appointment Rate") {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        else if (metricName == "CSAT Survey Result") {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        else if (metricName == "Quality Score") {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        else {
            x = cx + (r + 80) * Math.cos(a)
            y = cy + (r + 80) * Math.sin(a)
        }
        return { x: x, y: y };
    }

    function getSegmentCenter(cx, cy, a, r) {

        x = cx + r * Math.cos(a);
        y = cy + r * Math.sin(a);

        return { x: x, y: y };
    }


    function drawMetricLabels(canvas, context, startingAngle, endingAngle, metricName, ct, angleInDegrees) {

        var platform = navigator.platform;
        if (platform == "iPad") {
            //    var isTouchDevice = ('ontouchstart' in document.documentElement)
            //    if (isTouchDevice) {

            angleInDegrees = rotatedDegree;
        }
        context.save();
        context.beginPath();
        var words, angleDiff;

        var xPosition, yPosition, xLineEnd, yLineENd;
        var pos = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180, metricName);
        metricsNm[ct] = metricName;
        strtAng[ct] = startingAngle;
        endAng[ct] = endingAngle;

        var percentage;
        percentage = ((metricQty[ct] * 100) / 360);
        var percentageRounded = Number(percentage.toFixed(1));

        if (ct == (totalMetrics - 1)) {

            percentageRounded = (100 - totalPercentage).toFixed(1);
        }
        totalPercentage = totalPercentage + percentageRounded;

        var txtWidth = context.measureText(percentage.toFixed(2)).width;
        var segmentCenter = getSegmentCenter(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180);
        xPosition = pos.x;
        yPosition = pos.y;
        xLineEnd = pos.x;
        yLineENd = pos.y;

        var ar = rotate(475, 350, 350, 350, angleInDegrees);
        var t1 = Math.round(ar[0]);
        var t2 = Math.round(ar[1]);

        //angle between segment center,arrow head,center of circle(0-90-180)
        var AB = Math.sqrt(Math.pow(350 - segmentCenter.x, 2) + Math.pow(350 - segmentCenter.y, 2));
        var BC = Math.sqrt(Math.pow(350 - t1, 2) + Math.pow(350 - t2, 2));
        var AC = Math.sqrt(Math.pow(t1 - segmentCenter.x, 2) + Math.pow(t2 - segmentCenter.y, 2));
        var angle = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
        var angleAfterRotation = Math.round(angle * (180 / Math.PI));

        //    if (angleInDegrees != 0) {

        var tx = pos.x;
        var ty = pos.y + 5;
        context.translate(tx, ty);
        context.rotate((angleInDegrees * Math.PI) / 180);
        context.translate(-tx, -ty);
        //    }

        //setting the initial angle for segments to get in (0 to -90 to -180).
        if (flagInitial) {

            if (yPosition > t2) {
                pAng[ct] = angleAfterRotation * -1;
                angleAfterRotation = angleAfterRotation * -1;
            }
            else {
                pAng[ct] = angleAfterRotation;
            }

            if (ct == totalMetrics - 1) {

                flagInitial = false;
            }
        }

        //calc for angle b/w segment center,arrow head,center of circle (180-90-0 to-90 to-180) while rotation
        if (angleInDegrees > 0) {
            // +ve

            if (pAng[ct] > 0) {
                angleAfterRotation = pAng[ct] + angleInDegrees;
                if (angleAfterRotation > 180) {
                    angleAfterRotation = angleAfterRotation - 360;
                }
            }
            if (pAng[ct] < 0) {
                angleAfterRotation = pAng[ct] + angleInDegrees;

            }
        }
        else {
            //-ve
            if (pAng[ct] > 0) {
                angleAfterRotation = pAng[ct] + angleInDegrees;

            }
            else {
                angleAfterRotation = pAng[ct] + angleInDegrees;
                if (angleAfterRotation < -180) {
                    angleAfterRotation = 360 + angleAfterRotation;
                }
            }
        }

        //shifting values either left or right

        if (angleAfterRotation <= 90 && angleAfterRotation >= 0) {

            xPosition = xPosition + 5;

        } else if (angleAfterRotation >= -90 && angleAfterRotation <= 0) {
            xPosition = xPosition + 5;
        }
        else {

            xPosition = xPosition - (txtWidth);
        }

        //collision check

        if (angleAfterRotation <= 120 && angleAfterRotation >= 90) {
            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {

                //  alert("collision");
                yPosition = yPosition - 15;
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 + 15, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
            else {

                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 5, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }

        } else if (angleAfterRotation >= -120 && angleAfterRotation <= -90) {

            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {

                //  alert("collision");
                yPosition = yPosition + 15;
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 15, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
            else {
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 20, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
        }
        else if (angleAfterRotation < 180 && angleAfterRotation >= 120) {
            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {

                yPosition = yPosition - 15;
                // alert("collision");
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 5, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
            else {

                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 15, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
        }
        else if (angleAfterRotation >= -180 && angleAfterRotation <= -120) {

            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
                // alert('collision');
                yPosition = yPosition - 15;
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 5, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
            else {

                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 15, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
        }
        else if (angleAfterRotation >= -90 && angleAfterRotation <= -40) {
            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
                //  alert('collision');
                yPosition = yPosition + 15;

                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
            else {
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 20, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
        }
        else if (angleAfterRotation >= -40 && angleAfterRotation <= 0) {
            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
                yPosition = yPosition + 15;
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;

            }
            else {
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }
        }
        else if (angleAfterRotation >= 40 && angleAfterRotation <= 90) {
            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
                yPosition = yPosition + 15;
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;

            }
            else {
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }

        }
        else {
            if (rect_collision(context, angleInDegrees, xPosition, yPosition, txtWidth, prevXValue, prevYVal, txtWidth)) {
                // alert('collision');
                yPosition = yPosition + 15;
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;

            }
            else {
                var newPosition = getPointsOnCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 - 10, metricName);
                yLineENd = newPosition.y;
                xLineEnd = newPosition.x;
            }


        }

        context.beginPath();
        //context.font = "italic bold 10pt Calibri";
        context.font = 10 + "pt Arial";
        //    context.shadowColor = "black";
        //    context.shadowBlur = 0;

        // context.fillStyle = 'white';
        if ($("#hdnTheme").val() == "b") {
            context.fillStyle = 'black';
        }
        else if ($("#hdnTheme").val() == "c") {
            context.fillStyle = 'black';
        }
        else if ($("#hdnTheme").val() == "e") {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'white';
        }




        //    if (metricName == "Conversion Rate") {

        //        words = metricName.split(' ');
        //        context.fillText(words[0], xPosition, yPosition);
        //        context.fillText(words[1], xPosition, yPosition + 10);
        //    }
        //    else if (metricName == "CSAT Survey Result") {

        //        words = metricName.split(' ');
        //        context.fillText(words[0], xPosition, yPosition);
        //        context.fillText(words[1] + " " + words[2], xPosition, yPosition + 10);
        //    }
        //    else if (metricName == "Non Billable Aux Time") {

        //        words = metricName.split(' ');
        //        context.fillText(words[0] + " " + words[1], xPosition, yPosition);
        //        context.fillText(words[1] + " " + words[2], xPosition, yPosition + 10);
        //    }
        //    else {



        context.fillText(percentageRounded + "%", xPosition, yPosition);
        //    }

        prevXValue = xPosition;
        prevYVal = yPosition;
        context.restore();

        //draw line from segment center to the values
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        var lineStart = getSegmentCenter(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), (startingAngle + endingAngle) / 2, 180 + 7.2);
        context.moveTo(lineStart.x, lineStart.y);
        context.lineTo(xLineEnd, yLineENd);
        context.stroke();

        if ($("#hdnTheme").val() == "b") {
            context.fillStyle = 'black';
        }
        else if ($("#hdnTheme").val() == "c") {
            context.fillStyle = 'black';
        }
        else if ($("#hdnTheme").val() == "e") {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'white';
        }

        //context.fillStyle = 'white';
        context.fillRect(xLineEnd - 1, yLineENd - 1, 4, 4);
        context.restore();

        //save the x,y pos for clearing in redraw()
        xValues[ct] = pos.x;
        yValues[ct] = pos.y;
    }

    rect_collision = function (context, angle, x1, y1, size1, x2, y2, size2) {

        var DistanceX = x1 - x2;
        var DistanceY = y1 - y2;
        var DistanceCenter = Math.sqrt(DistanceX * DistanceX + DistanceY * DistanceY);
        var CollisionDistance = 18;
        if (20) CollisionDistance += 18;

        if ((DistanceCenter <= CollisionDistance)) {

            return true;
        }
    };

    function rotate(x, y, xm, ym, a) {
        var cos = Math.cos,
            sin = Math.sin,

            a = a * Math.PI / 180, // Convert to radians because that's what
        // JavaScript likes

        // Subtract midpoints, so that midpoint is translated to origin
        // and add it in the end again
            xr = (x - xm) * cos(a) - (y - ym) * sin(a) + xm,
            yr = (x - xm) * sin(a) + (y - ym) * cos(a) + ym;

        return [xr, yr];
    }

    function CoachngPieChart_is_touch_device() {
        var platform = navigator.platform;
        if (platform == "iPad") {

            return true;
        }
        else {

            return false;
        }

        //    return 'ontouchstart' in window // works on most browsers 
        //                || 'onmsgesturechange' in window; // works on ie10


    };

    function CoachngPieChart_swiperightHandler(event) {
        //var ReturnUrl1 = window.history.go(-1);
        $.mobile.changePage("",
                {
                    transition: "slide",
                    changeHash: true,
                    reverse: true
                }, reloadPage = false);
    }

    function CoachngPieChart_excludePie(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    //****************************** My Metrics page******************************//

    $(document).on('slidestop', '#slider-MyMetrics', function () {

        MyMetrics_getDate();
        if (myMetrics.superColor() != undefined) {
            myMetrics.loadIndividualAgentData();
        }
        myMetrics.CoachingHistoryData();
    });
    $(document).on('change', '[name="radio-choice-h-MyMetrics"]', function () {

        $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
        $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";
        if (myMetrics.superColor() != undefined) {
            myMetrics.loadIndividualAgentData();
        }
        var selected = $("input[type='radio'][name='radio-choice-h-MyMetrics']:checked");
        
        if (selected.val().trim() == "MONTHLY") {
            $("#slider-MyMetrics").attr("min", "-12").slider("refresh");;
        }
        else {
            $("#slider-MyMetrics").attr("min", "-90").slider("refresh");;
        }

        myMetrics.CoachingHistoryData();
    });

    function MyMetrics_getDate() {

        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-MyMetrics").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-MyMetrics']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);                   
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);                

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    var hour = dt.toString('hh');
                    if (tt == "PM" && hour < 12) {
                        hour = parseInt(hour) + 12;
                    }
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') + " " + hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                    if (hr == 0) { hr = 12; }

                    $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' + dy + ' ' + yr);                   
                    break;
            }
        }

    }
    function MyMetrics_getServerDate() {
       
        var obj = {};
        jQuery.ajax({
            url: 'MyMetrics.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {               
                $("#hdnSrvtDtime").val(data.d);
                MyMetrics_getDate();
                myMetrics.loadConfigData();
                myMetrics.loadTasksDataForAgent();
            }
        });

    }

    //****************************** Team Comparison page******************************//

    $(document).on('slidestop', '#slider-TeamComparison', function () {

        TeamComparison_getDate();       
        teamComparisonViewModel.CoachingHistoryData();
        teamComparisonViewModel.loadTeamCompTileData();
    });
    $(document).on('change', '[name="radio-choice-h-TeamComparison"]', function () {

        var selected = $("input[type='radio'][name='radio-choice-h-TeamComparison']:checked");
        if (selected.val().trim() == "MONTHLY") {
            $("#slider-TeamComparison").attr("min", "-12").slider("refresh");;
        }
        else {
            $("#slider-TeamComparison").attr("min", "-90").slider("refresh");;
        }

        $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
        $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";
        
        teamComparisonViewModel.CoachingHistoryData();
        teamComparisonViewModel.loadTeamCompTileData();
    });

    function TeamComparison_getDate() {

        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-TeamComparison").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-TeamComparison']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    var hour = dt.toString('hh');
                    if (tt == "PM" && hour < 12) {
                        hour = parseInt(hour) + 12;
                    }
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') + " " + hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                    if (hr == 0) { hr = 12; }

                    $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' + dy + ' ' + yr);
                    break;
            }
        }

    }
    function TeamComparison_getServerDate() {

        var obj = {};
        jQuery.ajax({
            url: 'MyMetrics.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#hdnSrvtDtime").val(data.d);
                TeamComparison_getDate();
                teamComparisonViewModel.loadTasksDataForAgent();
                teamComparisonViewModel.loadTeamCompTileData();


            }
        });

    }

    //****************************** Organisation Comparison page******************************//

    $(document).on('slidestop', '#slider-OrgComparison', function () {

        OrgComparison_getDate();
        organizationComparisonViewModel.CoachingHistoryData();
        organizationComparisonViewModel.loadTeamCompTileData();
    });
    $(document).on('change', '[name="radio-choice-h-OrgComparison"]', function () {

        $('.ui-radio.ui-mini label')[0].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[1].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[2].style.backgroundColor = "#B3B3B3";
        $('.ui-radio.ui-mini label')[3].style.backgroundColor = "#B3B3B3";
        $(this)[0].labels[0].style.backgroundColor = " #CCCCCC";

        organizationComparisonViewModel.CoachingHistoryData();
        organizationComparisonViewModel.loadTeamCompTileData();

        var selected = $("input[type='radio'][name='radio-choice-h-OrgComparison']:checked");
        if (selected.val().trim() == "MONTHLY") {
            $("#slider-OrgComparison").attr("min", "-12").slider("refresh");;
        }
        else {
            $("#slider-OrgComparison").attr("min", "-90").slider("refresh");;
        }

    });
    function OrgComparison_getDate() {

        var servrDat = $("#hdnSrvtDtime").val();
        var sliderVal = $("#slider-OrgComparison").val();
        if (servrDat != '') {

            var mySplitResult = servrDat.split(",");
            var a = new Date(mySplitResult[0], (mySplitResult[1] - 1).toString(), mySplitResult[2], mySplitResult[3], mySplitResult[4], mySplitResult[5]);
            var selected = $("input[type='radio'][name='radio-choice-h-OrgComparison']:checked");
            var mydate;
            switch (selected.val()) {

                case 'MONTHLY':
                    mydate = a.addMonths(parseInt(sliderVal));
                    $("#LblDaily").text(mydate.toString('MMM yyyy'));
                    $("#hdnDateSelected").val(mydate.toString('MM/dd/yyyy'));
                    break;

                case 'DAILY':

                    var dt = a.addDays(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);
                    break;

                case 'WEEKLY':

                    var dt;
                    if (sliderVal == 0) {
                        dt = a;
                    }
                    else {
                        dt = a.sunday();
                        dt.addWeeks(sliderVal);
                    }

                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy'));
                    $("#LblDaily").text(mt + ' ' + dy + ' ' + yr);

                    break;

                case 'INTRADAY':

                    var dt = a.addHours(sliderVal);
                    var dy = dt.toString('d');
                    var mt = dt.toString('MMM');
                    var yr = dt.toString('yyyy');
                    var hr = dt.toString('h');
                    var tt = dt.toString('tt');
                    var hour = dt.toString('hh');
                    if (tt == "PM" && hour < 12) {
                        hour = parseInt(hour) + 12;
                    }
                    $("#hdnDateSelected").val(dt.toString('MM/dd/yyyy') + " " + hour + ":" + dt.toString('mm') + ":" + dt.toString('ss'));
                    if (hr == 0) { hr = 12; }

                    $("#LblDaily").text(hr + ' ' + tt + ' ' + mt + ' ' + dy + ' ' + yr);
                    break;
            }
        }

    }
    function OrgComparison_getServerDate() {

        var obj = {};
        jQuery.ajax({
            url: 'MyMetrics.aspx/GetServerDate',
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#hdnSrvtDtime").val(data.d);
                OrgComparison_getDate();
                organizationComparisonViewModel.loadTasksDataForAgent();
                organizationComparisonViewModel.loadTeamCompTileData();
            }
        });
    }

