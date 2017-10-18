import React from "react";
import _ from "lodash";
import NotificationListComponent from "../NotificationListComponent/NotificationListComponent";

const MainComponent = (props) => {

    /*const children = () => {
        return (
            _.map(props.children, function (child, index) {
                return React.createElement(child.name, _.merge(child.props, {key: index}));
            })
        );
    };*/

    const modulesIcons = () => {
        return (
            _.map(props.modules, function (module, index) {
                console.log(module);
                return module.name;
            })
        );
    };

    return (
        <div className={"mainComponent"}>
            <div className="menu">
                <h1>Hallo!</h1>
                {modulesIcons().forEach((child) => {
                    <p>{child}</p>
                })}
            </div>
            <NotificationListComponent />
        </div>
    );
};

export default MainComponent;