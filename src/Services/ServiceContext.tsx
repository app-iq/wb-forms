import React from "react";
import {ServiceFactory} from "./Services";

export const ServiceContext = React.createContext<ServiceFactory | undefined>(undefined);
