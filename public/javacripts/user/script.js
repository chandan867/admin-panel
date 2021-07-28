$(".password a").on('click', function(event) {
        event.preventDefault();
        if($('.password input').attr("type") == "text"){
            $('.password input').attr('type', 'password');
            $('.password i').addClass( "fa-eye-slash" );
            $('.password i').removeClass( "fa-eye" );
        }else if($('.password input').attr("type") == "password"){
            $('.password input').attr('type', 'text');
            $('.password i').removeClass( "fa-eye-slash" );
            $('.password i').addClass( "fa-eye" );
        }
});
$(".cpassword a").on('click', function(event) {
        event.preventDefault();
        if($('.cpassword input').attr("type") == "text"){
            $('.cpassword input').attr('type', 'password');
            $('.cpassword i').addClass( "fa-eye-slash" );
            $('.cpassword i').removeClass( "fa-eye" );
        }else if($('.cpassword input').attr("type") == "password"){
            $('.cpassword input').attr('type', 'text');
            $('.cpassword i').removeClass( "fa-eye-slash" );
            $('.cpassword i').addClass( "fa-eye" );
        }
});

//international code for phone numbers
var telInput = $(".phone"),
  errorMsg = $("#error-msg"),
  validMsg = $("#valid-msg");

// initialise plugin
telInput.intlTelInput({

  allowExtensions: true,
  formatOnDisplay: true,
  autoFormat: true,
  autoHideDialCode: true,
  autoPlaceholder: false,
  defaultCountry: "in",
  ipinfoToken: "yolo",

  nationalMode: false,
  numberType: "MOBILE",
  //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  preferredCountries: ['in', 'ae', 'qa','om','bh','kw','ma'],
  preventInvalidNumbers: true,
  separateDialCode: true,
  initialCountry: "in",
  geoIpLookup: function(callback) {
  $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
    var countryCode = (resp && resp.country) ? resp.country : "";
    callback(countryCode);
  });
},
   utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});

var reset = function() {
  telInput.removeClass("error");
};

// on keyup / change flag: reset
telInput.on("keyup change", reset);

//additional2 info page starts
 function getFileName() {
        var x = document.getElementById('entry_value')
        document.getElementById('fileName').innerHTML = x.value.split('\\').pop()
    }
//additions2 info page ends