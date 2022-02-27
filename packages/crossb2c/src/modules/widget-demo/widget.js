(function () {
    if (typeof window === 'undefined') {
        console.warn('Sbl: Виджет Сберлогистики не поддерживает SSR')
        return;
    }

    if (this === null) {
        console.warn('Sbl: Объект this не определен')
        return
    }

    if (!window.sbl) {
        window.sbl = {}
    }


    window.sbl.createWidget = function (options) {
        // check options
        function process() {

            var containerId = options ? options.containerId : null
            var containerRef = document.getElementById(containerId)

            if (containerRef === null) {
                console.error('Sbl: Не найден контейнер для ренедеринга ссылки')
                return
            }

            var anchor = document.createElement('a');

            anchor.innerHTML = "Передать данные";
            anchor.href = "/itp/confirm-offer"
            anchor.target = "_blank"
            anchor.classList.add("sbl-link")

            if (!options.disableStyles) {
                anchor.style.cssText = 'background-color:yellow;font-size:12px;padding:4px;';
            }

            containerRef.appendChild(anchor)

            document.addEventListener("visibilitychange", (event) => {
                if (document.visibilityState == "visible") {
                    console.log("tab is active")
                    anchor.innerHTML = "переданы";
                } else {
                    console.log("tab is inactive")
                }
            });

            return {
                setPhoneNumber: function (phoneNumber) {

                },

                onSuccess: function () {
                    // передать от нас данные?
                },

                onError: function () {

                }
            }
        }

        return process(options)
    }
}())