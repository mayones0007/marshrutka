(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors~97a461e5"],{"07ac":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(a("a573")),i=u(a("9931")),r=u(a("2d16")),o=u(a("a7c3")),d=u(a("bfca"));function u(e){return e&&e.__esModule?e:{default:e}}var s={code:"pl",formatDistance:n.default,formatLong:i.default,formatRelative:r.default,localize:o.default,match:d.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},l=s;t.default=l,e.exports=t.default},"0981":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lastWeek:"eeee 'passat a' p",yesterday:"'ièr a' p",today:"'uèi a' p",tomorrow:"'deman a' p",nextWeek:"eeee 'a' p",other:"P"},i=function(e,t,a,i){return n[e]},r=i;t.default=r,e.exports=t.default},"0f5e":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lessThanXSeconds:{one:"minder dan een seconde",other:"minder dan {{count}} seconden"},xSeconds:{one:"1 seconde",other:"{{count}} seconden"},halfAMinute:"een halve minuut",lessThanXMinutes:{one:"minder dan een minuut",other:"minder dan {{count}} minuten"},xMinutes:{one:"een minuut",other:"{{count}} minuten"},aboutXHours:{one:"ongeveer 1 uur",other:"ongeveer {{count}} uur"},xHours:{one:"1 uur",other:"{{count}} uur"},xDays:{one:"1 dag",other:"{{count}} dagen"},aboutXWeeks:{one:"ongeveer 1 week",other:"ongeveer {{count}} weken"},xWeeks:{one:"1 week",other:"{{count}} weken"},aboutXMonths:{one:"ongeveer 1 maand",other:"ongeveer {{count}} maanden"},xMonths:{one:"1 maand",other:"{{count}} maanden"},aboutXYears:{one:"ongeveer 1 jaar",other:"ongeveer {{count}} jaar"},xYears:{one:"1 jaar",other:"{{count}} jaar"},overXYears:{one:"meer dan 1 jaar",other:"meer dan {{count}} jaar"},almostXYears:{one:"bijna 1 jaar",other:"bijna {{count}} jaar"}},i=function(e,t,a){var i,r=n[e];return i="string"===typeof r?r:1===t?r.one:r.other.replace("{{count}}",String(t)),null!==a&&void 0!==a&&a.addSuffix?a.comparison&&a.comparison>0?"over "+i:i+" geleden":i},r=i;t.default=r,e.exports=t.default},1545:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("b028")),i=r(a("9686"));function r(e){return e&&e.__esModule?e:{default:e}}var o=/^(\d+)(èr|nd|en)?[a]?/i,d=/\d+/i,u={narrow:/^(ab\.J\.C|apr\.J\.C|apr\.J\.-C)/i,abbreviated:/^(ab\.J\.-C|ab\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,wide:/^(abans Jèsus-Crist|après Jèsus-Crist)/i},s={any:[/^ab/i,/^ap/i]},l={narrow:/^T[1234]/i,abbreviated:/^[1234](èr|nd|en)? trim\.?/i,wide:/^[1234](èr|nd|en)? trimèstre/i},m={any:[/1/i,/2/i,/3/i,/4/i]},f={narrow:/^(GN|FB|MÇ|AB|MA|JN|JL|AG|ST|OC|NV|DC)/i,abbreviated:/^(gen|febr|març|abr|mai|junh|jul|ag|set|oct|nov|dec)\.?/i,wide:/^(genièr|febrièr|març|abril|mai|junh|julhet|agost|setembre|octòbre|novembre|decembre)/i},c={any:[/^g/i,/^f/i,/^ma[r?]|MÇ/i,/^ab/i,/^ma[i?]/i,/^ju[n?]|JN/i,/^ju[l?]|JL/i,/^ag/i,/^s/i,/^o/i,/^n/i,/^d/i]},h={narrow:/^d[glmcjvs]\.?/i,short:/^d[glmcjvs]\.?/i,abbreviated:/^d[glmcjvs]\.?/i,wide:/^(dimenge|diluns|dimars|dimècres|dijòus|divendres|dissabte)/i},p={narrow:[/^dg/i,/^dl/i,/^dm/i,/^dc/i,/^dj/i,/^dv/i,/^ds/i],short:[/^dg/i,/^dl/i,/^dm/i,/^dc/i,/^dj/i,/^dv/i,/^ds/i],abbreviated:[/^dg/i,/^dl/i,/^dm/i,/^dc/i,/^dj/i,/^dv/i,/^ds/i],any:[/^dg|dime/i,/^dl|dil/i,/^dm|dima/i,/^dc|dimè/i,/^dj|dij/i,/^dv|div/i,/^ds|dis/i]},v={any:/(^(a\.?m|p\.?m))|(ante meridiem|post meridiem)|((del |de la |de l’)(matin|aprèp-miègjorn|vèspre|ser|nuèch))/i},g={any:{am:/(^a)|ante meridiem/i,pm:/(^p)|post meridiem/i,midnight:/^mièj/i,noon:/^mièg/i,morning:/matin/i,afternoon:/aprèp-miègjorn/i,evening:/vèspre|ser/i,night:/nuèch/i}},w={ordinalNumber:(0,i.default)({matchPattern:o,parsePattern:d,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:u,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:l,defaultMatchWidth:"wide",parsePatterns:m,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:c,defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:h,defaultMatchWidth:"wide",parsePatterns:p,defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:v,defaultMatchWidth:"any",parsePatterns:g,defaultParseWidth:"any"})},b=w;t.default=b,e.exports=t.default},"2d16":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("4170"));function i(e){return e&&e.__esModule?e:{default:e}}var r={masculine:"ostatni",feminine:"ostatnia"},o={masculine:"ten",feminine:"ta"},d={masculine:"następny",feminine:"następna"},u={0:"feminine",1:"masculine",2:"masculine",3:"feminine",4:"masculine",5:"masculine",6:"feminine"};function s(e,t,a,i){var s;if((0,n.default)(t,a,i))s=o;else if("lastWeek"===e)s=r;else{if("nextWeek"!==e)throw new Error("Cannot determine adjectives for token ".concat(e));s=d}var l=t.getUTCDay(),m=u[l],f=s[m];return"'".concat(f,"' eeee 'o' p")}var l={lastWeek:s,yesterday:"'wczoraj o' p",today:"'dzisiaj o' p",tomorrow:"'jutro o' p",nextWeek:s,other:"P"},m=function(e,t,a,n){var i=l[e];return"function"===typeof i?i(e,t,a,n):i},f=m;t.default=f,e.exports=t.default},"2eb1":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(a("3474")),i=u(a("553f")),r=u(a("0981")),o=u(a("4faf")),d=u(a("1545"));function u(e){return e&&e.__esModule?e:{default:e}}var s={code:"oc",formatDistance:n.default,formatLong:i.default,formatRelative:r.default,localize:o.default,match:d.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},l=s;t.default=l,e.exports=t.default},3474:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lessThanXSeconds:{one:"mens d’una segonda",other:"mens de {{count}} segondas"},xSeconds:{one:"1 segonda",other:"{{count}} segondas"},halfAMinute:"30 segondas",lessThanXMinutes:{one:"mens d’una minuta",other:"mens de {{count}} minutas"},xMinutes:{one:"1 minuta",other:"{{count}} minutas"},aboutXHours:{one:"environ 1 ora",other:"environ {{count}} oras"},xHours:{one:"1 ora",other:"{{count}} oras"},xDays:{one:"1 jorn",other:"{{count}} jorns"},aboutXWeeks:{one:"environ 1 setmana",other:"environ {{count}} setmanas"},xWeeks:{one:"1 setmana",other:"{{count}} setmanas"},aboutXMonths:{one:"environ 1 mes",other:"environ {{count}} meses"},xMonths:{one:"1 mes",other:"{{count}} meses"},aboutXYears:{one:"environ 1 an",other:"environ {{count}} ans"},xYears:{one:"1 an",other:"{{count}} ans"},overXYears:{one:"mai d’un an",other:"mai de {{count}} ans"},almostXYears:{one:"gaireben un an",other:"gaireben {{count}} ans"}},i=function(e,t,a){var i,r=n[e];return i="string"===typeof r?r:1===t?r.one:r.other.replace("{{count}}",String(t)),null!==a&&void 0!==a&&a.addSuffix?a.comparison&&a.comparison>0?"d’aquí "+i:"fa "+i:i},r=i;t.default=r,e.exports=t.default},"3e74":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("1f21"));function i(e){return e&&e.__esModule?e:{default:e}}var r={full:"EEEE d. MMMM y",long:"d. MMMM y",medium:"d. MMM y",short:"dd.MM.y"},o={full:"'kl'. HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},d={full:"{{date}} 'kl.' {{time}}",long:"{{date}} 'kl.' {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},u={date:(0,n.default)({formats:r,defaultWidth:"full"}),time:(0,n.default)({formats:o,defaultWidth:"full"}),dateTime:(0,n.default)({formats:d,defaultWidth:"full"})},s=u;t.default=s,e.exports=t.default},"4d5f":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("af03"));function i(e){return e&&e.__esModule?e:{default:e}}var r={narrow:["v.C.","n.C."],abbreviated:["v.Chr.","n.Chr."],wide:["voor Christus","na Christus"]},o={narrow:["1","2","3","4"],abbreviated:["K1","K2","K3","K4"],wide:["1e kwartaal","2e kwartaal","3e kwartaal","4e kwartaal"]},d={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["jan.","feb.","mrt.","apr.","mei","jun.","jul.","aug.","sep.","okt.","nov.","dec."],wide:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"]},u={narrow:["Z","M","D","W","D","V","Z"],short:["zo","ma","di","wo","do","vr","za"],abbreviated:["zon","maa","din","woe","don","vri","zat"],wide:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},s={narrow:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middaguur",morning:"'s ochtends",afternoon:"'s middags",evening:"'s avonds",night:"'s nachts"},abbreviated:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middaguur",morning:"'s ochtends",afternoon:"'s middags",evening:"'s avonds",night:"'s nachts"},wide:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middaguur",morning:"'s ochtends",afternoon:"'s middags",evening:"'s avonds",night:"'s nachts"}},l=function(e,t){var a=Number(e);return a+"e"},m={ordinalNumber:l,era:(0,n.default)({values:r,defaultWidth:"wide"}),quarter:(0,n.default)({values:o,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,n.default)({values:d,defaultWidth:"wide"}),day:(0,n.default)({values:u,defaultWidth:"wide"}),dayPeriod:(0,n.default)({values:s,defaultWidth:"wide"})},f=m;t.default=f,e.exports=t.default},"4df9":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("1f21"));function i(e){return e&&e.__esModule?e:{default:e}}var r={full:"EEEE d MMMM y",long:"d MMMM y",medium:"d MMM y",short:"dd-MM-y"},o={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},d={full:"{{date}} 'om' {{time}}",long:"{{date}} 'om' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},u={date:(0,n.default)({formats:r,defaultWidth:"full"}),time:(0,n.default)({formats:o,defaultWidth:"full"}),dateTime:(0,n.default)({formats:d,defaultWidth:"full"})},s=u;t.default=s,e.exports=t.default},"4faf":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("af03"));function i(e){return e&&e.__esModule?e:{default:e}}var r={narrow:["ab. J.C.","apr. J.C."],abbreviated:["ab. J.C.","apr. J.C."],wide:["abans Jèsus-Crist","après Jèsus-Crist"]},o={narrow:["T1","T2","T3","T4"],abbreviated:["1èr trim.","2nd trim.","3en trim.","4en trim."],wide:["1èr trimèstre","2nd trimèstre","3en trimèstre","4en trimèstre"]},d={narrow:["GN","FB","MÇ","AB","MA","JN","JL","AG","ST","OC","NV","DC"],abbreviated:["gen.","febr.","març","abr.","mai","junh","jul.","ag.","set.","oct.","nov.","dec."],wide:["genièr","febrièr","març","abril","mai","junh","julhet","agost","setembre","octòbre","novembre","decembre"]},u={narrow:["dg.","dl.","dm.","dc.","dj.","dv.","ds."],short:["dg.","dl.","dm.","dc.","dj.","dv.","ds."],abbreviated:["dg.","dl.","dm.","dc.","dj.","dv.","ds."],wide:["dimenge","diluns","dimars","dimècres","dijòus","divendres","dissabte"]},s={narrow:{am:"am",pm:"pm",midnight:"mièjanuèch",noon:"miègjorn",morning:"matin",afternoon:"aprèp-miègjorn",evening:"vèspre",night:"nuèch"},abbreviated:{am:"a.m.",pm:"p.m.",midnight:"mièjanuèch",noon:"miègjorn",morning:"matin",afternoon:"aprèp-miègjorn",evening:"vèspre",night:"nuèch"},wide:{am:"a.m.",pm:"p.m.",midnight:"mièjanuèch",noon:"miègjorn",morning:"matin",afternoon:"aprèp-miègjorn",evening:"vèspre",night:"nuèch"}},l={narrow:{am:"am",pm:"pm",midnight:"mièjanuèch",noon:"miègjorn",morning:"del matin",afternoon:"de l’aprèp-miègjorn",evening:"del ser",night:"de la nuèch"},abbreviated:{am:"AM",pm:"PM",midnight:"mièjanuèch",noon:"miègjorn",morning:"del matin",afternoon:"de l’aprèp-miègjorn",evening:"del ser",night:"de la nuèch"},wide:{am:"ante meridiem",pm:"post meridiem",midnight:"mièjanuèch",noon:"miègjorn",morning:"del matin",afternoon:"de l’aprèp-miègjorn",evening:"del ser",night:"de la nuèch"}},m=function(e,t){var a,n=Number(e),i=null===t||void 0===t?void 0:t.unit;switch(n){case 1:a="èr";break;case 2:a="nd";break;default:a="en"}return"year"!==i&&"week"!==i&&"hour"!==i&&"minute"!==i&&"second"!==i||(a+="a"),n+a},f={ordinalNumber:m,era:(0,n.default)({values:r,defaultWidth:"wide"}),quarter:(0,n.default)({values:o,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,n.default)({values:d,defaultWidth:"wide"}),day:(0,n.default)({values:u,defaultWidth:"wide"}),dayPeriod:(0,n.default)({values:s,defaultWidth:"wide",formattingValues:l,defaultFormattingWidth:"wide"})},c=f;t.default=c,e.exports=t.default},5430:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("b028")),i=r(a("9686"));function r(e){return e&&e.__esModule?e:{default:e}}var o=/^(\d+)\.?/i,d=/\d+/i,u={narrow:/^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,abbreviated:/^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,wide:/^(før Kristus|før vår tid|etter Kristus|vår tid)/i},s={any:[/^f/i,/^e/i]},l={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](\.)? kvartal/i},m={any:[/1/i,/2/i,/3/i,/4/i]},f={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mars?|apr|mai|juni?|juli?|aug|sep|okt|nov|des)\.?/i,wide:/^(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)/i},c={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^mai/i,/^jun/i,/^jul/i,/^aug/i,/^s/i,/^o/i,/^n/i,/^d/i]},h={narrow:/^[smtofl]/i,short:/^(su|må|ty|on|to|fr|la)/i,abbreviated:/^(sun|mån|tys|ons|tor|fre|laur)/i,wide:/^(sundag|måndag|tysdag|onsdag|torsdag|fredag|laurdag)/i},p={any:[/^s/i,/^m/i,/^ty/i,/^o/i,/^to/i,/^f/i,/^l/i]},v={narrow:/^(midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta)|[ap])/i,any:/^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta))/i},g={any:{am:/^a(\.?\s?m\.?)?$/i,pm:/^p(\.?\s?m\.?)?$/i,midnight:/^midn/i,noon:/^midd/i,morning:/morgon/i,afternoon:/ettermiddag/i,evening:/kveld/i,night:/natt/i}},w={ordinalNumber:(0,i.default)({matchPattern:o,parsePattern:d,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:u,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:l,defaultMatchWidth:"wide",parsePatterns:m,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:c,defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:h,defaultMatchWidth:"wide",parsePatterns:p,defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:v,defaultMatchWidth:"any",parsePatterns:g,defaultParseWidth:"any"})},b=w;t.default=b,e.exports=t.default},"553f":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("1f21"));function i(e){return e&&e.__esModule?e:{default:e}}var r={full:"EEEE d 'de' MMMM y",long:"d 'de' MMMM y",medium:"d MMM y",short:"dd/MM/y"},o={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},d={full:"{{date}} 'a' {{time}}",long:"{{date}} 'a' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},u={date:(0,n.default)({formats:r,defaultWidth:"full"}),time:(0,n.default)({formats:o,defaultWidth:"full"}),dateTime:(0,n.default)({formats:d,defaultWidth:"full"})},s=u;t.default=s,e.exports=t.default},"56b1":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("af03"));function i(e){return e&&e.__esModule?e:{default:e}}var r={narrow:["f.Kr.","e.Kr."],abbreviated:["f.Kr.","e.Kr."],wide:["før Kristus","etter Kristus"]},o={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1. kvartal","2. kvartal","3. kvartal","4. kvartal"]},d={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["jan.","feb.","mars","apr.","mai","juni","juli","aug.","sep.","okt.","nov.","des."],wide:["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"]},u={narrow:["S","M","T","O","T","F","L"],short:["su","må","ty","on","to","fr","lau"],abbreviated:["sun","mån","tys","ons","tor","fre","laur"],wide:["sundag","måndag","tysdag","onsdag","torsdag","fredag","laurdag"]},s={narrow:{am:"a",pm:"p",midnight:"midnatt",noon:"middag",morning:"på morg.",afternoon:"på etterm.",evening:"på kvelden",night:"på natta"},abbreviated:{am:"a.m.",pm:"p.m.",midnight:"midnatt",noon:"middag",morning:"på morg.",afternoon:"på etterm.",evening:"på kvelden",night:"på natta"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnatt",noon:"middag",morning:"på morgonen",afternoon:"på ettermiddagen",evening:"på kvelden",night:"på natta"}},l=function(e,t){var a=Number(e);return a+"."},m={ordinalNumber:l,era:(0,n.default)({values:r,defaultWidth:"wide"}),quarter:(0,n.default)({values:o,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,n.default)({values:d,defaultWidth:"wide"}),day:(0,n.default)({values:u,defaultWidth:"wide"}),dayPeriod:(0,n.default)({values:s,defaultWidth:"wide"})},f=m;t.default=f,e.exports=t.default},"622f":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lastWeek:"'førre' eeee 'kl.' p",yesterday:"'i går kl.' p",today:"'i dag kl.' p",tomorrow:"'i morgon kl.' p",nextWeek:"EEEE 'kl.' p",other:"P"},i=function(e,t,a,i){return n[e]},r=i;t.default=r,e.exports=t.default},"67c1":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("b028")),i=r(a("9686"));function r(e){return e&&e.__esModule?e:{default:e}}var o=/^(\d+)e?/i,d=/\d+/i,u={narrow:/^([vn]\.? ?C\.?)/,abbreviated:/^([vn]\. ?Chr\.?)/,wide:/^((voor|na) Christus)/},s={any:[/^v/,/^n/]},l={narrow:/^[1234]/i,abbreviated:/^K[1234]/i,wide:/^[1234]e kwartaal/i},m={any:[/1/i,/2/i,/3/i,/4/i]},f={narrow:/^[jfmasond]/i,abbreviated:/^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,wide:/^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i},c={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^jan/i,/^feb/i,/^m(r|a)/i,/^apr/i,/^mei/i,/^jun/i,/^jul/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i]},h={narrow:/^[zmdwv]/i,short:/^(zo|ma|di|wo|do|vr|za)/i,abbreviated:/^(zon|maa|din|woe|don|vri|zat)/i,wide:/^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i},p={narrow:[/^z/i,/^m/i,/^d/i,/^w/i,/^d/i,/^v/i,/^z/i],any:[/^zo/i,/^ma/i,/^di/i,/^wo/i,/^do/i,/^vr/i,/^za/i]},v={any:/^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i},g={any:{am:/^am/i,pm:/^pm/i,midnight:/^middernacht/i,noon:/^het middaguur/i,morning:/ochtend/i,afternoon:/middag/i,evening:/avond/i,night:/nacht/i}},w={ordinalNumber:(0,i.default)({matchPattern:o,parsePattern:d,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:u,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:l,defaultMatchWidth:"wide",parsePatterns:m,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:c,defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:h,defaultMatchWidth:"wide",parsePatterns:p,defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:v,defaultMatchWidth:"any",parsePatterns:g,defaultParseWidth:"any"})},b=w;t.default=b,e.exports=t.default},"7a7f":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("af03"));function i(e){return e&&e.__esModule?e:{default:e}}var r={narrow:["v.C.","n.C."],abbreviated:["v.Chr.","n.Chr."],wide:["voor Christus","na Christus"]},o={narrow:["1","2","3","4"],abbreviated:["K1","K2","K3","K4"],wide:["1e kwartaal","2e kwartaal","3e kwartaal","4e kwartaal"]},d={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["jan.","feb.","mrt.","apr.","mei","jun.","jul.","aug.","sep.","okt.","nov.","dec."],wide:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"]},u={narrow:["Z","M","D","W","D","V","Z"],short:["zo","ma","di","wo","do","vr","za"],abbreviated:["zon","maa","din","woe","don","vri","zat"],wide:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},s={narrow:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middag",morning:"'s ochtends",afternoon:"'s namiddags",evening:"'s avonds",night:"'s nachts"},abbreviated:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middag",morning:"'s ochtends",afternoon:"'s namiddags",evening:"'s avonds",night:"'s nachts"},wide:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middag",morning:"'s ochtends",afternoon:"'s namiddags",evening:"'s avonds",night:"'s nachts"}},l=function(e,t){var a=Number(e);return a+"e"},m={ordinalNumber:l,era:(0,n.default)({values:r,defaultWidth:"wide"}),quarter:(0,n.default)({values:o,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,n.default)({values:d,defaultWidth:"wide"}),day:(0,n.default)({values:u,defaultWidth:"wide"}),dayPeriod:(0,n.default)({values:s,defaultWidth:"wide"})},f=m;t.default=f,e.exports=t.default},8023:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lastWeek:"'vorige' eeee 'om' p",yesterday:"'gisteren om' p",today:"'vandaag om' p",tomorrow:"'morgen om' p",nextWeek:"eeee 'om' p",other:"P"},i=function(e,t,a,i){return n[e]},r=i;t.default=r,e.exports=t.default},8424:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(a("0f5e")),i=u(a("4df9")),r=u(a("b0b0")),o=u(a("4d5f")),d=u(a("db46"));function u(e){return e&&e.__esModule?e:{default:e}}var s={code:"nl",formatDistance:n.default,formatLong:i.default,formatRelative:r.default,localize:o.default,match:d.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},l=s;t.default=l,e.exports=t.default},"8a57":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lessThanXSeconds:{one:"mindre enn eitt sekund",other:"mindre enn {{count}} sekund"},xSeconds:{one:"eitt sekund",other:"{{count}} sekund"},halfAMinute:"eit halvt minutt",lessThanXMinutes:{one:"mindre enn eitt minutt",other:"mindre enn {{count}} minutt"},xMinutes:{one:"eitt minutt",other:"{{count}} minutt"},aboutXHours:{one:"omtrent ein time",other:"omtrent {{count}} timar"},xHours:{one:"ein time",other:"{{count}} timar"},xDays:{one:"ein dag",other:"{{count}} dagar"},aboutXWeeks:{one:"omtrent ei veke",other:"omtrent {{count}} veker"},xWeeks:{one:"ei veke",other:"{{count}} veker"},aboutXMonths:{one:"omtrent ein månad",other:"omtrent {{count}} månader"},xMonths:{one:"ein månad",other:"{{count}} månader"},aboutXYears:{one:"omtrent eitt år",other:"omtrent {{count}} år"},xYears:{one:"eitt år",other:"{{count}} år"},overXYears:{one:"over eitt år",other:"over {{count}} år"},almostXYears:{one:"nesten eitt år",other:"nesten {{count}} år"}},i=["null","ein","to","tre","fire","fem","seks","sju","åtte","ni","ti","elleve","tolv"],r=function(e,t,a){var r,o=n[e];return r="string"===typeof o?o:1===t?o.one:a&&a.onlyNumeric?o.other.replace("{{count}}",String(t)):o.other.replace("{{count}}",t<13?i[t]:String(t)),null!==a&&void 0!==a&&a.addSuffix?a.comparison&&a.comparison>0?"om "+r:r+" sidan":r},o=r;t.default=o,e.exports=t.default},9549:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(a("e96f")),i=u(a("b78c")),r=u(a("8023")),o=u(a("7a7f")),d=u(a("67c1"));function u(e){return e&&e.__esModule?e:{default:e}}var s={code:"nl-BE",formatDistance:n.default,formatLong:i.default,formatRelative:r.default,localize:o.default,match:d.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},l=s;t.default=l,e.exports=t.default},9931:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("1f21"));function i(e){return e&&e.__esModule?e:{default:e}}var r={full:"EEEE, do MMMM y",long:"do MMMM y",medium:"do MMM y",short:"dd.MM.y"},o={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},d={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},u={date:(0,n.default)({formats:r,defaultWidth:"full"}),time:(0,n.default)({formats:o,defaultWidth:"full"}),dateTime:(0,n.default)({formats:d,defaultWidth:"full"})},s=u;t.default=s,e.exports=t.default},a573:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lessThanXSeconds:{one:{regular:"mniej niż sekunda",past:"mniej niż sekundę",future:"mniej niż sekundę"},twoFour:"mniej niż {{count}} sekundy",other:"mniej niż {{count}} sekund"},xSeconds:{one:{regular:"sekunda",past:"sekundę",future:"sekundę"},twoFour:"{{count}} sekundy",other:"{{count}} sekund"},halfAMinute:{one:"pół minuty",twoFour:"pół minuty",other:"pół minuty"},lessThanXMinutes:{one:{regular:"mniej niż minuta",past:"mniej niż minutę",future:"mniej niż minutę"},twoFour:"mniej niż {{count}} minuty",other:"mniej niż {{count}} minut"},xMinutes:{one:{regular:"minuta",past:"minutę",future:"minutę"},twoFour:"{{count}} minuty",other:"{{count}} minut"},aboutXHours:{one:{regular:"około godziny",past:"około godziny",future:"około godzinę"},twoFour:"około {{count}} godziny",other:"około {{count}} godzin"},xHours:{one:{regular:"godzina",past:"godzinę",future:"godzinę"},twoFour:"{{count}} godziny",other:"{{count}} godzin"},xDays:{one:{regular:"dzień",past:"dzień",future:"1 dzień"},twoFour:"{{count}} dni",other:"{{count}} dni"},aboutXWeeks:{one:"około tygodnia",twoFour:"około {{count}} tygodni",other:"około {{count}} tygodni"},xWeeks:{one:"tydzień",twoFour:"{{count}} tygodnie",other:"{{count}} tygodni"},aboutXMonths:{one:"około miesiąc",twoFour:"około {{count}} miesiące",other:"około {{count}} miesięcy"},xMonths:{one:"miesiąc",twoFour:"{{count}} miesiące",other:"{{count}} miesięcy"},aboutXYears:{one:"około rok",twoFour:"około {{count}} lata",other:"około {{count}} lat"},xYears:{one:"rok",twoFour:"{{count}} lata",other:"{{count}} lat"},overXYears:{one:"ponad rok",twoFour:"ponad {{count}} lata",other:"ponad {{count}} lat"},almostXYears:{one:"prawie rok",twoFour:"prawie {{count}} lata",other:"prawie {{count}} lat"}};function i(e,t){if(1===t)return e.one;var a=t%100;if(a<=20&&a>10)return e.other;var n=a%10;return n>=2&&n<=4?e.twoFour:e.other}function r(e,t,a){var n=i(e,t),r="string"===typeof n?n:n[a];return r.replace("{{count}}",String(t))}var o=function(e,t,a){var i=n[e];return null!==a&&void 0!==a&&a.addSuffix?a.comparison&&a.comparison>0?"za "+r(i,t,"future"):r(i,t,"past")+" temu":r(i,t,"regular")},d=o;t.default=d,e.exports=t.default},a7c3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("af03"));function i(e){return e&&e.__esModule?e:{default:e}}var r={narrow:["p.n.e.","n.e."],abbreviated:["p.n.e.","n.e."],wide:["przed naszą erą","naszej ery"]},o={narrow:["1","2","3","4"],abbreviated:["I kw.","II kw.","III kw.","IV kw."],wide:["I kwartał","II kwartał","III kwartał","IV kwartał"]},d={narrow:["S","L","M","K","M","C","L","S","W","P","L","G"],abbreviated:["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"],wide:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"]},u={narrow:["s","l","m","k","m","c","l","s","w","p","l","g"],abbreviated:["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"],wide:["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"]},s={narrow:["N","P","W","Ś","C","P","S"],short:["nie","pon","wto","śro","czw","pią","sob"],abbreviated:["niedz.","pon.","wt.","śr.","czw.","pt.","sob."],wide:["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"]},l={narrow:["n","p","w","ś","c","p","s"],short:["nie","pon","wto","śro","czw","pią","sob"],abbreviated:["niedz.","pon.","wt.","śr.","czw.","pt.","sob."],wide:["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"]},m={narrow:{am:"a",pm:"p",midnight:"półn.",noon:"poł",morning:"rano",afternoon:"popoł.",evening:"wiecz.",night:"noc"},abbreviated:{am:"AM",pm:"PM",midnight:"północ",noon:"południe",morning:"rano",afternoon:"popołudnie",evening:"wieczór",night:"noc"},wide:{am:"AM",pm:"PM",midnight:"północ",noon:"południe",morning:"rano",afternoon:"popołudnie",evening:"wieczór",night:"noc"}},f={narrow:{am:"a",pm:"p",midnight:"o półn.",noon:"w poł.",morning:"rano",afternoon:"po poł.",evening:"wiecz.",night:"w nocy"},abbreviated:{am:"AM",pm:"PM",midnight:"o północy",noon:"w południe",morning:"rano",afternoon:"po południu",evening:"wieczorem",night:"w nocy"},wide:{am:"AM",pm:"PM",midnight:"o północy",noon:"w południe",morning:"rano",afternoon:"po południu",evening:"wieczorem",night:"w nocy"}},c=function(e,t){return String(e)},h={ordinalNumber:c,era:(0,n.default)({values:r,defaultWidth:"wide"}),quarter:(0,n.default)({values:o,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,n.default)({values:d,defaultWidth:"wide",formattingValues:u,defaultFormattingWidth:"wide"}),day:(0,n.default)({values:s,defaultWidth:"wide",formattingValues:l,defaultFormattingWidth:"wide"}),dayPeriod:(0,n.default)({values:m,defaultWidth:"wide",formattingValues:f,defaultFormattingWidth:"wide"})},p=h;t.default=p,e.exports=t.default},b0b0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lastWeek:"'afgelopen' eeee 'om' p",yesterday:"'gisteren om' p",today:"'vandaag om' p",tomorrow:"'morgen om' p",nextWeek:"eeee 'om' p",other:"P"},i=function(e,t,a,i){return n[e]},r=i;t.default=r,e.exports=t.default},b78c:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("1f21"));function i(e){return e&&e.__esModule?e:{default:e}}var r={full:"EEEE d MMMM y",long:"d MMMM y",medium:"d MMM y",short:"dd.MM.y"},o={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},d={full:"{{date}} 'om' {{time}}",long:"{{date}} 'om' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},u={date:(0,n.default)({formats:r,defaultWidth:"full"}),time:(0,n.default)({formats:o,defaultWidth:"full"}),dateTime:(0,n.default)({formats:d,defaultWidth:"full"})},s=u;t.default=s,e.exports=t.default},bce4:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(a("8a57")),i=u(a("3e74")),r=u(a("622f")),o=u(a("56b1")),d=u(a("5430"));function u(e){return e&&e.__esModule?e:{default:e}}var s={code:"nn",formatDistance:n.default,formatLong:i.default,formatRelative:r.default,localize:o.default,match:d.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},l=s;t.default=l,e.exports=t.default},bfca:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("b028")),i=r(a("9686"));function r(e){return e&&e.__esModule?e:{default:e}}var o=/^(\d+)?/i,d=/\d+/i,u={narrow:/^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,abbreviated:/^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,wide:/^(przed\s*nasz(ą|a)\s*er(ą|a)|naszej\s*ery)/i},s={any:[/^p/i,/^n/i]},l={narrow:/^[1234]/i,abbreviated:/^(I|II|III|IV)\s*kw\.?/i,wide:/^(I|II|III|IV)\s*kwarta(ł|l)/i},m={narrow:[/1/i,/2/i,/3/i,/4/i],any:[/^I kw/i,/^II kw/i,/^III kw/i,/^IV kw/i]},f={narrow:/^[slmkcwpg]/i,abbreviated:/^(sty|lut|mar|kwi|maj|cze|lip|sie|wrz|pa(ź|z)|lis|gru)/i,wide:/^(stycznia|stycze(ń|n)|lutego|luty|marca|marzec|kwietnia|kwiecie(ń|n)|maja|maj|czerwca|czerwiec|lipca|lipiec|sierpnia|sierpie(ń|n)|wrze(ś|s)nia|wrzesie(ń|n)|pa(ź|z)dziernika|pa(ź|z)dziernik|listopada|listopad|grudnia|grudzie(ń|n))/i},c={narrow:[/^s/i,/^l/i,/^m/i,/^k/i,/^m/i,/^c/i,/^l/i,/^s/i,/^w/i,/^p/i,/^l/i,/^g/i],any:[/^st/i,/^lu/i,/^mar/i,/^k/i,/^maj/i,/^c/i,/^lip/i,/^si/i,/^w/i,/^p/i,/^lis/i,/^g/i]},h={narrow:/^[npwścs]/i,short:/^(nie|pon|wto|(ś|s)ro|czw|pi(ą|a)|sob)/i,abbreviated:/^(niedz|pon|wt|(ś|s)r|czw|pt|sob)\.?/i,wide:/^(niedziela|poniedzia(ł|l)ek|wtorek|(ś|s)roda|czwartek|pi(ą|a)tek|sobota)/i},p={narrow:[/^n/i,/^p/i,/^w/i,/^ś/i,/^c/i,/^p/i,/^s/i],abbreviated:[/^n/i,/^po/i,/^w/i,/^(ś|s)r/i,/^c/i,/^pt/i,/^so/i],any:[/^n/i,/^po/i,/^w/i,/^(ś|s)r/i,/^c/i,/^pi/i,/^so/i]},v={narrow:/^(^a$|^p$|pó(ł|l)n\.?|o\s*pó(ł|l)n\.?|po(ł|l)\.?|w\s*po(ł|l)\.?|po\s*po(ł|l)\.?|rano|wiecz\.?|noc|w\s*nocy)/i,any:/^(am|pm|pó(ł|l)noc|o\s*pó(ł|l)nocy|po(ł|l)udnie|w\s*po(ł|l)udnie|popo(ł|l)udnie|po\s*po(ł|l)udniu|rano|wieczór|wieczorem|noc|w\s*nocy)/i},g={narrow:{am:/^a$/i,pm:/^p$/i,midnight:/pó(ł|l)n/i,noon:/po(ł|l)/i,morning:/rano/i,afternoon:/po\s*po(ł|l)/i,evening:/wiecz/i,night:/noc/i},any:{am:/^am/i,pm:/^pm/i,midnight:/pó(ł|l)n/i,noon:/po(ł|l)/i,morning:/rano/i,afternoon:/po\s*po(ł|l)/i,evening:/wiecz/i,night:/noc/i}},w={ordinalNumber:(0,i.default)({matchPattern:o,parsePattern:d,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:u,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:l,defaultMatchWidth:"wide",parsePatterns:m,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:c,defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:h,defaultMatchWidth:"wide",parsePatterns:p,defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:v,defaultMatchWidth:"any",parsePatterns:g,defaultParseWidth:"any"})},b=w;t.default=b,e.exports=t.default},db46:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("b028")),i=r(a("9686"));function r(e){return e&&e.__esModule?e:{default:e}}var o=/^(\d+)e?/i,d=/\d+/i,u={narrow:/^([vn]\.? ?C\.?)/,abbreviated:/^([vn]\. ?Chr\.?)/,wide:/^((voor|na) Christus)/},s={any:[/^v/,/^n/]},l={narrow:/^[1234]/i,abbreviated:/^K[1234]/i,wide:/^[1234]e kwartaal/i},m={any:[/1/i,/2/i,/3/i,/4/i]},f={narrow:/^[jfmasond]/i,abbreviated:/^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,wide:/^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i},c={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^jan/i,/^feb/i,/^m(r|a)/i,/^apr/i,/^mei/i,/^jun/i,/^jul/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i]},h={narrow:/^[zmdwv]/i,short:/^(zo|ma|di|wo|do|vr|za)/i,abbreviated:/^(zon|maa|din|woe|don|vri|zat)/i,wide:/^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i},p={narrow:[/^z/i,/^m/i,/^d/i,/^w/i,/^d/i,/^v/i,/^z/i],any:[/^zo/i,/^ma/i,/^di/i,/^wo/i,/^do/i,/^vr/i,/^za/i]},v={any:/^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i},g={any:{am:/^am/i,pm:/^pm/i,midnight:/^middernacht/i,noon:/^het middaguur/i,morning:/ochtend/i,afternoon:/middag/i,evening:/avond/i,night:/nacht/i}},w={ordinalNumber:(0,i.default)({matchPattern:o,parsePattern:d,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:u,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:l,defaultMatchWidth:"wide",parsePatterns:m,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:c,defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:h,defaultMatchWidth:"wide",parsePatterns:p,defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:v,defaultMatchWidth:"any",parsePatterns:g,defaultParseWidth:"any"})},b=w;t.default=b,e.exports=t.default},e96f:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={lessThanXSeconds:{one:"minder dan een seconde",other:"minder dan {{count}} seconden"},xSeconds:{one:"1 seconde",other:"{{count}} seconden"},halfAMinute:"een halve minuut",lessThanXMinutes:{one:"minder dan een minuut",other:"minder dan {{count}} minuten"},xMinutes:{one:"een minuut",other:"{{count}} minuten"},aboutXHours:{one:"ongeveer 1 uur",other:"ongeveer {{count}} uur"},xHours:{one:"1 uur",other:"{{count}} uur"},xDays:{one:"1 dag",other:"{{count}} dagen"},aboutXWeeks:{one:"ongeveer 1 week",other:"ongeveer {{count}} weken"},xWeeks:{one:"1 week",other:"{{count}} weken"},aboutXMonths:{one:"ongeveer 1 maand",other:"ongeveer {{count}} maanden"},xMonths:{one:"1 maand",other:"{{count}} maanden"},aboutXYears:{one:"ongeveer 1 jaar",other:"ongeveer {{count}} jaar"},xYears:{one:"1 jaar",other:"{{count}} jaar"},overXYears:{one:"meer dan 1 jaar",other:"meer dan {{count}} jaar"},almostXYears:{one:"bijna 1 jaar",other:"bijna {{count}} jaar"}},i=function(e,t,a){var i,r=n[e];return i="string"===typeof r?r:1===t?r.one:r.other.replace("{{count}}",String(t)),null!==a&&void 0!==a&&a.addSuffix?a.comparison&&a.comparison>0?"over "+i:i+" geleden":i},r=i;t.default=r,e.exports=t.default}}]);
//# sourceMappingURL=chunk-vendors~97a461e5.564f0bf0.js.map