import React from "react";
import _ from "lodash";
import NotificationListComponent from "../NotificationListComponent/NotificationListComponent";
import {NavLink, Route} from 'react-router-dom'

const MainComponent = (props) => {

    const modules = () => {
        return _.map(props.modules, function (module, index) {
            return module;
        });
    };


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

                        {props.modules.map(module => {
                            return <li key={module.name + "-link"}>
                                <NavLink
                                    activeClassName="active"
                                    to={"/" + module.name}>
                                    {module.name}
                                </NavLink>
                            </li>
                        })}
                    </li>
                </ul>
            </nav>

            <div className="content">
                <Route exact path={"/"} component={NotificationListComponent}/>
                {modules().map(module => {
                    return <Route key={module.name + "-route"}
                                  path={"/" + module.name}
                                  component={module.component.name} />
                })}
            </div>
        </div>
    );
};

export default MainComponent;