(ns trove.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.json :as json]
            [trove.home :as home]
            [trove.eval :as eval]))

(defroutes app-routes
  (GET  "/"           req (home/index req))
  (GET  "/eval.json"  req (eval/eval-json req))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app (-> app-routes
             (wrap-defaults site-defaults)
             (json/wrap-json-response)))
