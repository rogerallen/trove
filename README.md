# trove

A localhost webapp for Overtone interaction.  Basically an experiment,
for the moment.  The motivation for this was to allow GUI interaction
without switching away from the editor window.  Editing in emacs &
adjusting dials in a Java window is annoying.  Hopefully, this
unification works better.

*** DANGER! DANGER! DANGER! ***

The web server is configured to allow interactions from the local machine,
only.  This should keep others from accessing this web app.

Running this program on a shared machine is dangerous.  Any other user
could cause code to be evaluated in your clojure session.

Hopefully, normal Overtone usage is a single user on a single machine
and you can rest easy.

## Running

To start a web server for the application, run:

    lein ring server

Keep the terminal visible for some output from the underlying clojure
session.

In the webapp, there are three panels to notice.

1. A panel with a few dials.
2. A text editor pane.
3. A repl pane.

When you adjust the dials in the panel, you affect atoms in the
clojure environment.  Dereference the atoms to access the values.  The
atoms are: `k1, k2, k3, k4``.

The text editor pane is a handy place to edit clojure code prior to
sending to the repl.  This is the CodeMirror text editor and I've
enabled clojure syntax highlighting, line numbers, matching &
auto-closing brackets along with emacs keybindings.  This should allow
for a reasonable editor experience for single file live-coding.

The repl is where to put code to send to the clojure session and get
overtone to respond.  Paste code here and hit return to send to
clojure.

## To Do

If there is interest, consider helping with these items:
* open a file to insert into the text editor
* select text in the editor, send to repl via some key combo.
* redirect the text from the terminal into the repl area
* vi keybindings?

## Example

For a simple example, copy-paste the following code into the editor.
Then, copy-paste the code to the repl one statement at a time.

```clj
(use 'overtone.live)

(def metro (metronome 92))

(defsynth foo [pitch 60]
  (let [freq (midicps pitch)
        snd  (sin-osc [freq freq])
        env  (env-gen (perc 0.1 0.5) :action FREE)]
    (out 0 (* env snd))))

(defn one [beat]
    (at (metro beat) (foo @k1))
    (apply-by (metro (+ 1 beat)) #'one [(+ 1 beat)]))
```

Start playing single beats by putting `(one (metro))` into the repl
and then adjust the `k1` dial to hear different pitches (by default k1
is 31 and will be too low to be audible).  When you want to stop, use
`(stop)`

## License

Copyright © 2014 Roger Allen.

Distributed under the Eclipse Public License, the same as Clojure.

Some code used from https://github.com/Raynes/tryclojure which is
also licensed under the Eclipse Public License.
