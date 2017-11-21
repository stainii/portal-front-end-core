import React from "react";

class IFrameComponent extends React.Component {

    render() {
        return (
            <div className="moduleFrameComponent">
                <iframe src={this.props.moduleUrl}></iframe>
            </div>
        );
    };

}

export default IFrameComponent;