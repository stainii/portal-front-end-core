import React, {PropTypes} from "react";
import {NavLink, Route} from 'react-router-dom'
import ModuleFrameComponent from "../ModuleFrameComponent/ModuleFrameComponent";

const MainComponent = (props) => {

    return (
        <div className={"mainComponent"}>
            <nav className="menu">
                <h1>Hallo!</h1>

                <ul>
                    {props.modules.map(module => {
                        if (module.openByDefault) {
                            return <li key={module.name + "-link"}>
                                <NavLink
                                    activeClassName="active"
                                    exact
                                    to={"/"}>
                                    {module.name}
                                </NavLink>
                            </li>
                        } else {
                            return <li key={module.name + "-link"}>
                                <NavLink
                                    activeClassName="active"
                                    to={"/" + module.name}>
                                    {module.name}
                                </NavLink>
                            </li>
                        }
                    })}

                </ul>
            </nav>

            <div className="content">
                {props.modules.map(module => {
                    if (module.openByDefault) {
                        return <Route key={module.name + "-route"}
                                      path={"/"}
                                      exact
                                      render={() => <ModuleFrameComponent moduleUrl={module.url}/>}
                        />
                    } else {
                        return <Route key={module.name + "-route"}
                                      path={"/" + module.name}
                                      render={() => <ModuleFrameComponent moduleUrl={module.url}/>}
                        />
                    }
                })}
            </div>
        </div>
    );
};

MainComponent.propTypes = {
    modules: PropTypes.array.isRequired
};

export default MainComponent;