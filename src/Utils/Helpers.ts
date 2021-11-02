import {ReactElement} from "react";

export const toChildrenArray = (children : ReactElement[] | ReactElement) => Array.isArray(children) ? children : [children];