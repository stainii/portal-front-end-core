import React from "react";

class NotificationListComponent extends React.Component {

    constructor() {
        super();
        const self = this;

        this.state = { notifications: [ {title: "title", text: "text", link: "link", icon: "icon" }] };

        window.events.on("notification", (title, text, link, icon) => {
            const copyOfCurrentNotifications = this.state.notifications.slice();
            copyOfCurrentNotifications.push({title: title, text: text, link: link, icon: icon });
            self.setState({notifications: copyOfCurrentNotifications});
        });
    };

    render() {
        const self = this;
        return (
            <div className={"notificationList"}>
                <div className="noNotifications">
                    <img src="static/imgs/no_notifications.png" />
                    <p>Relax! Nothing else to do.</p>

                    {
                        self.state.notifications.map((notification) => {
                            return <p key={notification.title}>
                                abc
                                <a href={notification.link}>{ notification.title }, { notification.text }, { notification.icon }</a>
                            </p>
                        })
                    }
                </div>
            </div>
        );
    };
}

export default NotificationListComponent;