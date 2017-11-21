import React from "react";
import NotificationListComponent from "../NotificationListComponent/NotificationListComponent";
import {NavLink, Route} from 'react-router-dom'
import ModuleFrameComponent from "../ModuleFrameComponent/ModuleFrameComponent";

const MainComponent = (props) => {

    return (
        <div className={"mainComponent"}>
            <nav className="menu">
                <h1>Hallo!</h1>

                <ul>
                    <li>
                        <NavLink key={"notifications-link"}
                                 to={"/"}
                                 exact={true}>
                            Notifications
                        </NavLink>
                    </li>

                    {props.modules.map(module => {
                        return <li key={module.name + "-link"}>
                            <NavLink
                                activeClassName="active"
                                to={"/" + module.name}>
                                {module.name} - {module.url}
                            </NavLink>
                        </li>
                    })}

                </ul>
            </nav>

            <div className="content">
                <Route exact path={"/"} component={NotificationListComponent}/>
                {props.modules.map(module => {
                    return <Route key={module.name + "-route"}
                                  path={"/" + module.name}
                                  render={() => <ModuleFrameComponent moduleUrl={module.url} />}
                            />
                })}
            </div>
        </div>
    );
};

export default MainComponent;