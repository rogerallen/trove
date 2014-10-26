(defproject trove "0.1.0-SNAPSHOT"
  :description "web gui for overtone"
  :url "http://github.com/rogerallen/trove"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.2.0"]
                 [ring/ring-defaults "0.1.2"]
                 [ring/ring-json "0.3.1"]
                 [overtone "0.9.1"]]
  :plugins [[lein-ring "0.8.13"]]
  :ring {:handler trove.handler/app
         ;; NOTE: this is only secure if no one else is on your machine
         :host "localhost"
         :port 7172}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
