(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors~54043831"],{"55a4":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("4170"));function o(e){return e&&e.__esModule?e:{default:e}}var n=["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"];function r(e){switch(e){case 0:return"'domenica scorsa alle' p";default:return"'"+n[e]+" scorso alle' p"}}function d(e){return"'"+n[e]+" alle' p"}function u(e){switch(e){case 0:return"'domenica prossima alle' p";default:return"'"+n[e]+" prossimo alle' p"}}var l={lastWeek:function(e,t,a){var o=e.getUTCDay();return(0,i.default)(e,t,a)?d(o):r(o)},yesterday:"'ieri alle' p",today:"'oggi alle' p",tomorrow:"'domani alle' p",nextWeek:function(e,t,a){var o=e.getUTCDay();return(0,i.default)(e,t,a)?d(o):u(o)},other:"P"},m=function(e,t,a,i){var o=l[e];return"function"===typeof o?o(t,a,i):o},s=m;t.default=s,e.exports=t.default},8666:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(a("e18d")),o=u(a("ed62")),n=u(a("55a4")),r=u(a("914b")),d=u(a("b65b"));function u(e){return e&&e.__esModule?e:{default:e}}var l={code:"it",formatDistance:i.default,formatLong:o.default,formatRelative:n.default,localize:r.default,match:d.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},m=l;t.default=m,e.exports=t.default},"914b":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("af03"));function o(e){return e&&e.__esModule?e:{default:e}}var n={narrow:["aC","dC"],abbreviated:["a.C.","d.C."],wide:["avanti Cristo","dopo Cristo"]},r={narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1º trimestre","2º trimestre","3º trimestre","4º trimestre"]},d={narrow:["G","F","M","A","M","G","L","A","S","O","N","D"],abbreviated:["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],wide:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"]},u={narrow:["D","L","M","M","G","V","S"],short:["dom","lun","mar","mer","gio","ven","sab"],abbreviated:["dom","lun","mar","mer","gio","ven","sab"],wide:["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"]},l={narrow:{am:"m.",pm:"p.",midnight:"mezzanotte",noon:"mezzogiorno",morning:"mattina",afternoon:"pomeriggio",evening:"sera",night:"notte"},abbreviated:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"mattina",afternoon:"pomeriggio",evening:"sera",night:"notte"},wide:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"mattina",afternoon:"pomeriggio",evening:"sera",night:"notte"}},m={narrow:{am:"m.",pm:"p.",midnight:"mezzanotte",noon:"mezzogiorno",morning:"di mattina",afternoon:"del pomeriggio",evening:"di sera",night:"di notte"},abbreviated:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"di mattina",afternoon:"del pomeriggio",evening:"di sera",night:"di notte"},wide:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"di mattina",afternoon:"del pomeriggio",evening:"di sera",night:"di notte"}},s=function(e,t){var a=Number(e);return String(a)},f={ordinalNumber:s,era:(0,i.default)({values:n,defaultWidth:"wide"}),quarter:(0,i.default)({values:r,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,i.default)({values:d,defaultWidth:"wide"}),day:(0,i.default)({values:u,defaultWidth:"wide"}),dayPeriod:(0,i.default)({values:l,defaultWidth:"wide",formattingValues:m,defaultFormattingWidth:"wide"})},c=f;t.default=c,e.exports=t.default},b65b:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("b028")),o=n(a("9686"));function n(e){return e&&e.__esModule?e:{default:e}}var r=/^(\d+)(º)?/i,d=/\d+/i,u={narrow:/^(aC|dC)/i,abbreviated:/^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,wide:/^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i},l={any:[/^a/i,/^(d|e)/i]},m={narrow:/^[1234]/i,abbreviated:/^t[1234]/i,wide:/^[1234](º)? trimestre/i},s={any:[/1/i,/2/i,/3/i,/4/i]},f={narrow:/^[gfmalsond]/i,abbreviated:/^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,wide:/^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i},c={narrow:[/^g/i,/^f/i,/^m/i,/^a/i,/^m/i,/^g/i,/^l/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ge/i,/^f/i,/^mar/i,/^ap/i,/^mag/i,/^gi/i,/^l/i,/^ag/i,/^s/i,/^o/i,/^n/i,/^d/i]},g={narrow:/^[dlmgvs]/i,short:/^(do|lu|ma|me|gi|ve|sa)/i,abbreviated:/^(dom|lun|mar|mer|gio|ven|sab)/i,wide:/^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i},v={narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^g/i,/^v/i,/^s/i],any:[/^d/i,/^l/i,/^ma/i,/^me/i,/^g/i,/^v/i,/^s/i]},h={narrow:/^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,any:/^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i},p={any:{am:/^a/i,pm:/^p/i,midnight:/^mezza/i,noon:/^mezzo/i,morning:/mattina/i,afternoon:/pomeriggio/i,evening:/sera/i,night:/notte/i}},b={ordinalNumber:(0,o.default)({matchPattern:r,parsePattern:d,valueCallback:function(e){return parseInt(e,10)}}),era:(0,i.default)({matchPatterns:u,defaultMatchWidth:"wide",parsePatterns:l,defaultParseWidth:"any"}),quarter:(0,i.default)({matchPatterns:m,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,i.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:c,defaultParseWidth:"any"}),day:(0,i.default)({matchPatterns:g,defaultMatchWidth:"wide",parsePatterns:v,defaultParseWidth:"any"}),dayPeriod:(0,i.default)({matchPatterns:h,defaultMatchWidth:"any",parsePatterns:p,defaultParseWidth:"any"})},M=b;t.default=M,e.exports=t.default},e18d:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={lessThanXSeconds:{one:"meno di un secondo",other:"meno di {{count}} secondi"},xSeconds:{one:"un secondo",other:"{{count}} secondi"},halfAMinute:"alcuni secondi",lessThanXMinutes:{one:"meno di un minuto",other:"meno di {{count}} minuti"},xMinutes:{one:"un minuto",other:"{{count}} minuti"},aboutXHours:{one:"circa un'ora",other:"circa {{count}} ore"},xHours:{one:"un'ora",other:"{{count}} ore"},xDays:{one:"un giorno",other:"{{count}} giorni"},aboutXWeeks:{one:"circa una settimana",other:"circa {{count}} settimane"},xWeeks:{one:"una settimana",other:"{{count}} settimane"},aboutXMonths:{one:"circa un mese",other:"circa {{count}} mesi"},xMonths:{one:"un mese",other:"{{count}} mesi"},aboutXYears:{one:"circa un anno",other:"circa {{count}} anni"},xYears:{one:"un anno",other:"{{count}} anni"},overXYears:{one:"più di un anno",other:"più di {{count}} anni"},almostXYears:{one:"quasi un anno",other:"quasi {{count}} anni"}},o=function(e,t,a){var o,n=i[e];return o="string"===typeof n?n:1===t?n.one:n.other.replace("{{count}}",t.toString()),null!==a&&void 0!==a&&a.addSuffix?a.comparison&&a.comparison>0?"tra "+o:o+" fa":o},n=o;t.default=n,e.exports=t.default},e386:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("1f21"));function o(e){return e&&e.__esModule?e:{default:e}}var n={full:"EEEE d MMMM y",long:"d MMMM y",medium:"d MMM y",short:"dd.MM.y"},r={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},d={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},u={date:(0,i.default)({formats:n,defaultWidth:"full"}),time:(0,i.default)({formats:r,defaultWidth:"full"}),dateTime:(0,i.default)({formats:d,defaultWidth:"full"})},l=u;t.default=l,e.exports=t.default},ed62:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("1f21"));function o(e){return e&&e.__esModule?e:{default:e}}var n={full:"EEEE d MMMM y",long:"d MMMM y",medium:"d MMM y",short:"dd/MM/y"},r={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},d={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},u={date:(0,i.default)({formats:n,defaultWidth:"full"}),time:(0,i.default)({formats:r,defaultWidth:"full"}),dateTime:(0,i.default)({formats:d,defaultWidth:"full"})},l=u;t.default=l,e.exports=t.default},f787:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(a("e18d")),o=u(a("55a4")),n=u(a("914b")),r=u(a("b65b")),d=u(a("e386"));function u(e){return e&&e.__esModule?e:{default:e}}var l={code:"it-CH",formatDistance:i.default,formatLong:d.default,formatRelative:o.default,localize:n.default,match:r.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},m=l;t.default=m,e.exports=t.default}}]);
//# sourceMappingURL=chunk-vendors~54043831.0d05356f.js.map