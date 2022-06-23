
var __class_instances = [];
class scomponent {
    props;
    constructor(props) {
        this.props = props;
        __class_instances.push(this);
    }


}
scomponent.prototype.toString = function () {
    if (this.render) {
        return this.render();
    }
    return "[object scomponent]";
}

class smodule {
    static instaceClasses = [];
    static connect(className) {
        this.instaceClasses.push(className);
    }
}

var __modules = {};

function require(url) {
    __modules[url] = url
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getParam(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//privates
function __loadClasses() {
    smodule.instaceClasses.map((className) => {
        var instance = new className();
        if (instance.render) {
            var content = instance.render();
            if (typeof content == "string") {
                var div = document.createElement("div")
                div.innerHTML = `
                <div style="">
                    ${content}
                </div>
                `;
                document.body.appendChild(div);
            } else {
                document.body.appendChild(content);
            }

            __class_instances.map((ins) => {
                if (ins.onLoad) {
                    ins.onLoad();
                }
            })

        }
    })
}
async function __init() {
    await __loadComponent("SLog/index.js");
    SLog.debug("Initializing sevisofts framework...");
    SLog.debug("Importing required modules");
    await sleep(100);
    for (const element of Object.values(__modules)) {
        await __require(element);
    }
    __loadClasses();
}

async function __loadComponent(url) {
    return await __require(`/servisofts/Components/${url}`);
}

async function __require(url) {
    return new Promise((resolve, reject) => {
        try {
            var script = document.createElement("script");
            script.onload = () => { resolve() }
            if (url.indexOf("index.js") == -1) {
                url = url + "/index.js";
            }
            script.src = url;
            script.type = "text/javascript";
            document.body.appendChild(script);
        } catch (e) {
            reject(e);
        }

    })
}
__init();
var body = document.body;
body.style.fontFamily = "sans-serif";
body.style.fontSize = "14px";
body.style.margin = "0";
body.style.padding = "0";





