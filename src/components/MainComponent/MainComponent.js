import React from "react";
import _ from "lodash";

const MainComponent = (props) => {
    const children = () => {
        return (
            _.map(props.children, function (child, index) {
                return React.createElement(child.name, _.merge(child.props, {key: index}));
            })
        );
    };

    return (
        <div className="mainComponent">
            <h1>Main</h1>
            {children()}
        </div>
    );
}

export default MainComponent;