let url = window.location.search;
let urlParams = new URLSearchParams(url);

let appendCampaignId = urlParams.has("campaignid")
  ? `${urlParams.get("campaignid")}`
  : "";
let appendAdGroupId = urlParams.has("adgroupid")
  ? `${urlParams.get("adgroupid")}`
  : "";
let appendPlacement = urlParams.has("placement")
  ? `&placement=${urlParams.get("placement")}`
  : "";
let appendKeyword = urlParams.has("keyword")
  ? `&keyword=${urlParams.get("keyword")}`
  : "";




var ///// Browser Detect

// chrome = stripos( $_SERVER['HTTP_USER_AGENT'], "Chrome" );
// edge = stripos( $_SERVER['HTTP_USER_AGENT'], "Edg" );
// firefox = stripos( $_SERVER['HTTP_USER_AGENT'], "Firefox" );
// ie = stripos( $_SERVER['HTTP_USER_AGENT'], "Trident" );


  chrome = /Chrome/.test(navigator.userAgent),
  edge = /Edg/.test(navigator.userAgent),
  firefox = /Firefox/.test(navigator.userAgent);
ie = /Trident/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent);

let showInterruptionPopupStatus = edge==true && window.hasACLID == '1' ? true : false;
let showNextStepModalStatus = edge==true && window.hasACLID == '1' ? true : false;
let audio = edge==true && window.hasACLID == '1' ? true : false;


///// Browser Specific Links
(chromeLink = `https://microsoftedge.microsoft.com/addons/detail/easy-recipe-finder/anfhcegjakkcaeeeikkmhlaopbhmenii`),
  (edgeLink = `https://microsoftedge.microsoft.com/addons/detail/easy-recipe-finder/anfhcegjakkcaeeeikkmhlaopbhmenii`),
  (otherLink = `https://microsoftedge.microsoft.com/addons/detail/easy-recipe-finder/anfhcegjakkcaeeeikkmhlaopbhmenii`),
  (gclid = window.location.href.indexOf("") > -1),
  (queryString = ""),
  (win = ""),
  ///// Extension ID's To Check For Install
  (chromeExtensionId = ""),
  (uid = ""),
  
  ///// Timing
  (interval = 1000),
  (delay = 0), // <-------- Normally set to 2500
  (otherDelay = 0),
  ///// Additional Variables
  (extensionName = "Online Recipes");
(duplicate_check = false), // <-------- Turn duplicate check on/off
  (extInstalled = false),
  (showInterruptionPopUp = showInterruptionPopupStatus),
  (showNextStepModal = showNextStepModalStatus),
  (audioStatus = audio),

  // Hide handholding set to false
$show_loading = true;
$vertical = 'maps';
  ///// Actions to hide and show modals
  (show_modal_overlay = function () {
    $("#install-overlay").show();
  }),
  (hide_modal_overlay = function () {
    $("#install-overlay").hide();
  }),
  (show_confirm_modal = function () {
    show_modal_overlay();
    $(".confirm").show();
  }),
  (hide_confirm_modal = function () {
    hide_modal_overlay();
    $(".confirm").hide();
  }),
  (show_loading_modal = function () {
    $(".tb-popup-template").show();
  }),
  (hide_loading_modal = function () {
    $(".tb-popup-template").hide();
  }),
  (confirm_no = function () {
    location.reload();
  }),
  //// Logs browser type to console
  (browser_detect = function () {
    // console.log('Detecting browser...')
    if (edge) {
      // console.log("Browser is Edge")
    } else if (chrome) {
      // console.log("Browser is Chrome")
    } else if (firefox) {
      // console.log("Browser is Firefox")
    } else if (ie) {
      // console.log("Browser is Internet Explorer")
    } else {
      // console.log("Browser is Other")
    }
    set_browser_content();
  }),
  ///// Set content based on browser
  (set_browser_content = function () {
    console.log("Setting browser content...");
    $(document).prop("title", extensionName);
    $(".title").html(extensionName);
    if (edge) {
    } else {
    }
    check_for_install();
  }),
  ///// Check to see if files associated with the extension are installed
  (check_for_install = function () {
    if (duplicate_check) {
      console.log("Checking for install...");
      $.ajax({
        url: "chrome-extension://" + chromeExtensionId + "/manifest.json",
        type: "HEAD",
        error: function () {
          extInstalled = false;
          setTimeout(function () {
            check_for_install();
          }, interval);
        },
        success: function () {
          extInstalled = true;
          window.location.href = "https://easyrecipeideas.org";
        },
      });
    } else {
    }
  }),
  ///// Select action on click of the Continue button
  (continue_click = function () {
    hide_confirm_modal();
    console.log("Continue was clicked...");
    if (duplicate_check) {
      console.log("Checking for install...");
      $.ajax({
        url: "chrome-extension://" + chromeExtensionId + "/manifest.json",
        type: "HEAD",
        error: function () {
          extInstalled = false;
          start();
        },
        success: function () {
          extInstalled = true;
          alert(
            "Sorry, it looks like you already have this extension installed!"
          );
        },
      });
    } else {
      start();
    }
  }),
  ///// Set url for store based on browser at size of original window
  (get_store_link = function () {
    console.log("Getting store link...");
    (width = window.innerWidth),
      (height = window.outerHeight - 55),
      (x = window.screenX),
      (y = window.screenY);
    if (window.innerWidth < 900) {
      if (edge) {
        win = window.open(edgeLink + queryString, '_blank', 'width = ' + width + ', height = ' + height + ', top = ' + y + ', left = ' + x);
      } else if (chrome) {
        win = window.open(chromeLink + queryString, '_blank', 'width = ' + window.screen.width + ', height = ' + window.screen.height + ', top = ' + y + ', left = ' + x);
      } else {
        win = window.open(edgeLink + queryString, '_blank', 'width = ' + width + ', height = ' + height + ', top = ' + y + ', left = ' + x);
      }
    } else {
      if (edge) {
        win = window.open(edgeLink + queryString, '_blank', 'width = ' + width + ', height = ' + height + ', top = ' + y + ', left = ' + x);
      } else if (chrome) {
        win = window.open(chromeLink + queryString, '_blank', 'width = ' + width + ', height = ' + height + ', top = ' + y + ', left = ' + x);
      } else {
        win = window.open(otherLink + queryString, '_blank', 'width = ' + width + ', height = ' + height + ', top = ' + y + ', left = ' + x);
      }
    }
    hide_loading_modal();
  }),
  ///// Show loading modal and play audio if GCLID is present
  (start = function () {
    let customDelay = showNextStepModal ? 2500: delay
    let play = audioStatus ? true: false
    console.log("Starting...");
    if(play){
      var audio = new Audio('https://easyrecipeideas.org/edge.mp3');
      audio.play();
    }
    show_loading_modal();
    if (chrome || edge) {
      setTimeout(function () {
        get_store_link();
        showInterruptionPopUp && open_store_window();
      }, customDelay);
    } else if (ie) {
      ie_window();
      showInterruptionPopUp && open_store_window();
    } else {
      setTimeout(function () {
        get_store_link();
        showInterruptionPopUp && open_store_window();
      }, otherDelay);
    }
  }),
  ///// Window specific rules for IE
  (ie_window = function () {
    (width = window.innerWidth),
      (height = window.outerHeight - 55),
      (x = window.screenX),
      (y = window.screenY);
    win = window.open(
      otherLink + queryString,
      "_blank",
      "width = " +
        width +
        ", height = " +
        height +
        ", top = " +
        y +
        ", left = " +
        x
    );
  }),
  ///// Open new window for the extension at the same size and position
  (open_store_window = function () {
    $(".modal-backdrop").click(function () {
      win.focus();
    });
    check_for_extension = window.setInterval(function () {
      if (extInstalled) {
        hide_loading_modal();
        window.clearInterval(check_for_extension);
      } else {
        check_for_install();
        if (win.closed) {
          on_window_close();
        } else {
        }
      }
    }, interval);
  }),
  (on_window_close = function () {
    if (extInstalled) {
      hide_loading_modal();
      window.clearInterval(check_for_extension);
    } else {
      hide_loading_modal();
      show_confirm_modal();
      window.clearInterval(check_for_extension);
    }
  }),
  browser_detect();
