function eval_clojure(code) {
    var data;
    $.ajax({
        url: "eval.json",
        data: { expr : code },
        async: false,
        success: function(res) { data = res; }
    });
    return data;
}

function html_escape(val) {
    var result = val;
    result = result.replace(/\n/g, "<br/>");
    result = result.replace(/[<]/g, "&lt;");
    result = result.replace(/[>]/g, "&gt;");
    return result;
}


function onValidate(input) {
    return (input != "");
}

function onHandle(line, report) {
    var input = $.trim(line);

    // perform evaluation
    var data = eval_clojure(input);
    console.log("data from eval:"+data);
    // handle error
    if (data.error) {
        return [{msg: data.message, className: "jquery-console-message-error"}];
    }

    // display expr results
    return [{msg: data.result, className: "jquery-console-message-value"}];
}

var repl;

$(document).ready(function() {
    repl = $("#console").console({
        welcomeMessage:'Here is your REPL.  Use it for good.',
        promptLabel: '> ',
        commandValidate: onValidate,
        commandHandle: onHandle,
        autofocus:true,
        animateScroll:true,
        promptHistory:true
    });

    interfacePanelInit();

    var editorDiv = document.getElementById("editortextarea");
    var myCodeMirror = CodeMirror(function (elt) {
            editorDiv.parentNode.replaceChild(elt, editorDiv);
        },
        {
            value: "(use 'overtone.live)", // FIXME use file?
            mode:              "text/x-clojure",
            lineNumbers:       "true",
            matchBrackets:     "true",
            autoCloseBrackets: "()[]{}\"\"",
            keyMap:            "emacs", // ??? vi mode
        });
});

/* here is the GUI interface panel */

function interfacePanelInit() {
    var a = new Interface.Panel({
        container:$("#panel"),
    });
    var l1 = new Interface.Label({
        bounds: [.01,.8,.1,.1],
        hAlign:'center',
        value: "k1: "+Math.floor(127*0.25),
        stroke: "#222",
    });
    var l2 = new Interface.Label({
        bounds: [.11,.8,.1,.1],
        hAlign:'center',
        value: "k2: "+Math.floor(127*0.25),
        stroke: "#222",
    });
    var l3 = new Interface.Label({
        bounds: [.21,.8,.1,.1],
        hAlign:'center',
        value: "k3: "+Math.floor(127*0.25),
        stroke: "#222",
    });
    var l4 = new Interface.Label({
        bounds: [.31,.8,.1,.1],
        hAlign:'center',
        value: "k4: "+Math.floor(127*0.25),
        stroke: "#222",
    });
    var k1 = new Interface.Knob({
        bounds:       [.01,.05,.1],
        value:        .25,
        usesRotation: true,
        centerZero:   false,
        background:   "#5881d8",
        fill:         "#63b132",
        stroke:       "#444",
        onvaluechange: function() {
            l1.setValue("k1: "+Math.floor(127*this.value));
            eval_clojure("(reset! k1 "+Math.floor(127*this.value)+")")
        },
    });
    var k2 = new Interface.Knob({
        bounds:       [.11,.05,.1],
        value:        .25,
        usesRotation: true,
        centerZero:   false,
        background:   "#5881d8",
        fill:         "#63b132",
        stroke:       "#444",
        onvaluechange: function() {
            l2.setValue("k2: "+Math.floor(127*this.value));
            eval_clojure("(reset! k2 "+Math.floor(127*this.value)+")")
        },
    });
    var k3 = new Interface.Knob({
        bounds:       [.21,.05,.1],
        value:        .25,
        usesRotation: true,
        centerZero:   false,
        background:   "#5881d8",
        fill:         "#63b132",
        stroke:       "#444",
        onvaluechange: function() {
            l3.setValue("k3: "+Math.floor(127*this.value));
            eval_clojure("(reset! k3 "+Math.floor(127*this.value)+")")
        },
    });
    var k4 = new Interface.Knob({
        bounds:       [.31,.05,.1],
        value:        .25,
        usesRotation: true,
        centerZero:   false,
        background:   "#5881d8",
        fill:         "#63b132",
        stroke:       "#444",
        onvaluechange: function() {
            l4.setValue("k4: "+Math.floor(127*this.value));
            eval_clojure("(reset! k4 "+Math.floor(127*this.value)+")")
        },
    });
    a.background = "#eee";
    a.add(l1, l2, l3, l4, k1, k2, k3, k4);
    eval_clojure("(do  (def k1 (atom 31)) (def k2 (atom 31)) (def k3 (atom 31)) (def k4 (atom 31)))")
}
