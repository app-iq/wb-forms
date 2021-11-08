import React from "react";
import {Defaults, formDefaults} from "./FormDefaults";

export const DefaultsContext = React.createContext<Defaults>(formDefaults);
export const DefaultsProvider = DefaultsContext.Provider;
