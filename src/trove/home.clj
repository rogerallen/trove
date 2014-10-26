(ns trove.home
  (:require [hiccup.element :refer [javascript-tag link-to unordered-list]]
            [hiccup.page :refer [include-css include-js html5]]
            [hiccup.core :refer [html]]))

(defn index [req]
  (html5
   [:head
    (include-css "/css/trove.css"
                 "/js/codemirror-4.6/lib/codemirror.css")
    (include-js "/js/jquery-2.1.1.min.js"
                "/js/jquery.console.js"
                "/js/interface.js"
                "/js/codemirror-4.6/lib/codemirror.js"
                "/js/codemirror-4.6/mode/clojure/clojure.js"
                "/js/codemirror-4.6/addon/edit/matchbrackets.js"
                "/js/codemirror-4.6/addon/edit/closebrackets.js"
                "/js/codemirror-4.6/keymap/emacs.js" ;; ??? vi option
                "/js/trove.js")
    [:title "Trove"]]
   [:body
    [:div#content
     [:div#header
      [:h1
       [:span.logo-trove "Trove"]]]
     [:div#container
      [:div#panel]
      [:div#editor
       [:textarea#editortextarea]]
      [:div#console.console]]
     [:div.footer
      [:p.bottom "Copyright © 2014 Roger Allen."]]]]))
