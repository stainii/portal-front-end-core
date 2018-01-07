import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import MainComponent from "./components/MainComponent/MainComponent";
import ModuleService from "./services/ModuleService";
import GlobalServiceFactory from "./factories/GlobalServiceFactory";


const loadApp = (modules) => {
    ReactDOM.render(
        <BrowserRouter>
            <MainComponent modules={modules} />
        </BrowserRouter>,
        document.getElementById("main")
    );
};

const findModules = () => {
    return new ModuleService().findModules()
};


//load applications with its modules
findModules()
    .then(loadApp)
    .catch(function (err) {
        console.log("Something went wrong: ", err);
    });

//expose global services
new GlobalServiceFactory().createGlobalServices(window);