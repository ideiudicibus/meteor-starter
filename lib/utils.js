import accounting from 'accounting'
this.Utils = {

  playerPositionList: ["forward", "right back", "left back", "right midfielder", "left midfielder", "defensive midfielder", "goalkeeper", "striker", "stopper", "sweeper"],
  countryList: ["Select Country", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
  seasonList: ["", "2010/2011", "2011/2012", "2012/2013", "2013/2014", "2014/2015", "2015/2016", "2016/2017", "2017/2018"],
  paybackTypeList: ["", "Free of Charge", "Loan", "Loan Expired"],


  randomString: function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },
  parseTmDateA: function (input) {
    var map = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    return (parseDate = function (input) {
      input = input.replace(",", "").split(" ");

      var date = new Date(input[2], map[input[0]], input[1], 12, 0, 0);

      return date
    })(input);
  },
  parseTmDateB: function (input) {
    return (parseDate = function (input) {
      input = input.split(".");

      var date = new Date(input[2], input[1], input[0], 12, 0, 0);
      return date
    })(input);
  },
  prettyDate: function (date) {
    if (date) {
      if (Config.dateFormat) {
        return moment(date).format(Config.dateFormat);
      } else {
        return moment(date).format('D/M/YYYY');
      }
    }
  },
  timeSince: function (date) {
    var interval, seconds;
    if (date) {
      seconds = Math.floor((new Date() - date) / 1000);
      interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
        return interval + "years ago";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months ago";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes ago";
      }
      return "just now......";
    }
  },
  isMobile: function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  loginRequired: function () {
    return Router.go('/sign-in');
  },

  orderValue: function (volume) {

    if (_.isUndefined(volume)) {
      volume = this.get("_volume");
    }
    return (Math.floor(this.get("price") * 100) * volume) / 100;
  },

  formatMoneyEuro: function (n) {
    if (n) {

      return this.formatMoney(n, null);
    }
    else return accounting.formatMoney(0.00, "€", 2, ".", ",");
  },

  formatMoney: function (n, unit) {

    if (unit) {

      n = n / unit;
    }



    if (n > 999999) {
      n = (n / 1000000).toFixed(1) + 'M€';
    }
    else {
      n = accounting.formatMoney(n, "€", 2, ".", ",");
    }

    return n;
  }
  ,
  calculateAndFormatCapitalGain: function (object) {
    if (Meteor.isClient) {
      return Math.floor(((object.totalPrize / object.totalBuy) - 1) * 100);

    }
  },
  faAngleClass: function (object) {
    if (Meteor.isClient) {
      var number = this.calculateAndFormatCapitalGain(object);
      var retValue = "";

      if (number < 0) {
        retValue = "fa-angle-down";

      }
      else {
        retValue = "fa-angle-up";

      }

      return retValue;
    }
  },

  slugify: function (text) {

    return text.toString().toLowerCase().trim()
      .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, '_') // swap any length of whitespace, underscore, hyphen characters with a single _
      .replace(/^-+|-+$/g, ''); // remove leading, trailing -
  }
  ,

  formatDate: function (context) {
    var date = new Date(context);
    var fmt = date.toLocaleDateString("en-GB");

    return fmt;
  },

  formatDateTime: function (context) {
    var date = new Date(context);
    var fmt = date.toLocaleDateString("en-GB");
    fmt += " " + date.toLocaleTimeString("en-GB");
    return fmt;
  },


  getDay: function (context) {
    var date = new Date(context);
    return date.getDate();
  }
  ,
  getMonth: function (context) {
    var date = new Date(context);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[date.getMonth()].substring(0, 3);
    return n;
  },

  getYear: function (context) {

    var date = new Date(context);
    return date.getFullYear();
  },

  jsonStringify: function (content) {
    return JSON.stringify(content, null, 2);
  },

  calculateAgeFromDate: function (context) {
    var birthday = new Date(context);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },

  playerFullName: function (player) {
    return player.fullName;
  },


  arrayify: function (obj) {
    var result = [];
    for (var key in obj) result.push({ name: key, value: obj[key] });
    return result;
  }

};

