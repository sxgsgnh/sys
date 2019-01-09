// set theme

settings.interceptedErrors = ["*"];

Hints.style('font-size: 14pt');
Hints.style("font-size: 14pt", "text");

imap("Ctrl-a","<Ctrl-f>");
imap(";;","<Ese>");
map("Ctrl-n","<tab>");

settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 12pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult>ul>li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult>ul>li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 16pt;
}`;

Front.registerInlineQuery({
        url: "https://api.shanbay.com/bdc/search/?word=",
        parseResult: function(res) {
            try {
                res = JSON.parse(res.text);
                var exp = res.msg;
                if (res.data.definition) {
                    var pronunciations = [];
                    for (var reg in res.data.pronunciations) {
                        pronunciations.push(`<div>[${reg}] ${res.data.pronunciations[reg]}</div>`);
                        // pronunciations.push(`<div><audio src="${res.data[reg+'_audio']}" controls></audio></div>`);
                    }
                    var definition = res.data.definition.split("\n").map(function(d) {
                        return `<li>${d}</li>`;
                    }).join("");
                    exp = `${pronunciations.join("")}<ul>${definition}</ul>`;
                }
                if (res.data.en_definitions) {
                    exp += "<hr/>";
                    for (var lex in res.data.en_definitions) {
                        var sense = res.data.en_definitions[lex].map(function(s) {
                            return `<li>${s}</li>`;
                        }).join("");
                        exp += `<div>${lex}</div><ul>${sense}</ul>`;
                    }
                }
                return exp;
            } catch (e) {
                return "";
            }
        }
    });
