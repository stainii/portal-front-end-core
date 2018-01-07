import React, {PropTypes} from "react";

class ModuleFrameComponent extends React.Component {

    render() {
        return (
            <div className="moduleFrameComponent">
                <iframe src={this.props.moduleUrl}></iframe>
            </div>
        );
    };

}

ModuleFrameComponent.propTypes = {
    moduleUrl: PropTypes.string.isRequired
};

export default ModuleFrameComponent;