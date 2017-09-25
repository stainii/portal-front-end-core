import React from "react";
import ReactDOM from "react-dom";
import MainComponent from "./components/MainComponent/MainComponent";
import ModuleService from "./services/ModuleService";


const loadApp = function (children) {
    ReactDOM.render(
        React.createElement(MainComponent, {children: children}),
        document.getElementById('main')
    );
};

//start initialisation
new ModuleService().loadRemoteModules()
    .then(loadApp)
    .catch(function (err) {
        console.log("Something went wrong: " + err);
    });

