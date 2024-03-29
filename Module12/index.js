const client = (() => {
    let serviceWorkerRegObj = undefined;
    let notificationbutton= document.getElementById("btn-notify");

    const showNotificationButton =() => {
        notificationbutton.style.display = "block";
        notificationbutton.addEventListener("click", showNotification);
    }

    const showNotification = () => {
        //console.log("button clicked");
        const simpleTextNotification = reg => reg.showNotification("First Notification")

        const customizeNotification = reg => {
            const options = {
                body: 'Spring Semester is Completed',
                icon: "./img/notification-flat.png",
            actions:[
                {actions: "search", title: "search ppu"},
                {actions: "close", title: "Nevermind"}, 
           ],
           data: {
                notificationTime : Date.now(),
                githubuser: "JuanBarrera0305"
           }
           //options.actions = actions;
            }
            reg.showNotification('Second Notification', options)
        }
        navigator.serviceWorker.getRegistration()
        .then(registration => customizeNotification(registration));
        
    }

    const checkNotificationSupport = () => {
        if(!('Notification' in window)){
            return Promise. reject("This browser doesn't support notifications");
        }
        console.log("The browser supports Notification");
        return Promise.resolve("ok.");
        }

        const registerServiceWorker = () => {
            if(!('serviceWorker') in navigator){
                return Promise.reject("Service worker is not available yet");
            }

    return navigator.serviceWorker.register('service-worker')
        .then(regObj => {
            console.log("Service worker is registered successfully");
            serviceWorkerRebObj = regObj;
            showNotificationButton()
        })
    }

    const requestNotificationPermission= () => {
        return Notification.requestPermission(status => {
            console.log("Notifications Permission Status:", status);
        })
    }

    const sendNotification = () => {
        if (Notification.permission === "granted") {
            return sericeWorkerRegObj.showNotification(notificationMessage.title, notificationOptions);
        } else if (Notification.permission !== "denied") {
            requestNotificationPermission ().then(permission => {
                if (permission === "granted") {
                    return serviceWorkerRegObj.showNotification(notficationMessage.title, notificationOptions);
                }
            });
        }
     }
    
     //Add event Listener to the notification button
     notificationbutton.addEventListener("click", sendNotification);

     //How the constructors are called
     checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermission)
        .catch(err => console.error(err))

    })();