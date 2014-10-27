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
            eval_clojure("(reset! K1 "+Math.floor(127*this.value)+")");
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
            eval_clojure("(reset! K2 "+Math.floor(127*this.value)+")");
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
            eval_clojure("(reset! K3 "+Math.floor(127*this.value)+")");
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
            eval_clojure("(reset! K4 "+Math.floor(127*this.value)+")");
        },
    });
    var s = new Interface.MultiSlider({
        count:8,
        bounds:[.42,.05,.2,.9],
        background:   "#5881d8",
        fill:         "#63b132",
        stroke:       "#444",
        onvaluechange : function(number, value) {
            eval_clojure("(swap! S (fn [x] (assoc x "+number+" "+Math.floor(127*value)+")))");
        }
    });
    var b = new Interface.MultiButton({
        row:10, columns:8,
        bounds:[.635,.05,.355,.9],
        background:   "#5881d8",
        fill:         "#63b132",
        stroke:       "#444",
        onvaluechange : function(row, col, value) {
            eval_clojure("(swap! B (fn [x] (assoc-in x ["+row+" "+col+"] "+value+")))");
        },
    });

    a.background = "#eee";
    a.add(l1, l2, l3, l4, k1, k2, k3, k4, s, b);
    eval_clojure("(do  \
  (defonce K1 (atom 31)) \
  (defonce K2 (atom 31)) \
  (defonce K3 (atom 31)) \
  (defonce K4 (atom 31)) \
  (defonce S (atom [0 0 0 0 0 0 0 0])) \
  (defonce B (atom [[0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0] \
                    [0 0 0 0 0 0 0 0]])) \
)");

}
