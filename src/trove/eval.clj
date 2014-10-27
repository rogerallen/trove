(ns trove.eval
  (:require [clojure.stacktrace :refer [root-cause]])
  (:import java.io.StringWriter
	   java.util.concurrent.TimeoutException))

;; ======================================================================
;; DANGER!  PELIGRO!  ACHTUNG!
;;
;; We're using *eval* below.  Do not run this app on a machine that
;; can be accessed by people you do not trust.
;;
;; ======================================================================
(defn eval-form [form]
  (with-open [out (StringWriter.)]
    (let [result (eval form)]  ;; !!!! DANGER !!!!
      {:expr form
       :result [out result]})))

(defn eval-string [expr]
  (let [form (binding [*read-eval* false] (read-string expr))]
    (eval-form form)))

(defn eval-request [expr]
  (try
    (eval-string expr)
    (catch TimeoutException _
      {:error true :message "Execution Timed Out!"})
    (catch Exception e
      {:error true :message (str (root-cause e))})))

(defn eval-json [req]
  (let [expr (-> req :params :expr)
        _ (println ">" expr)
        {:keys [expr result error message] :as res} (eval-request expr)
        ;;_ (println "%" res)
        data (if error
               res
               (let [[out res] result]
                 {:expr (pr-str expr)
                  :result (str out (pr-str res))}))]
    (if (nil? error)
      (println ";" (:result data))
      (println ";" (:message data)))
    {:body data}))  ;; ring middleware fixes json
